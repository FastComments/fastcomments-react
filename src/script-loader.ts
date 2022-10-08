type PromiseResolver = (value: void | PromiseLike<void>) => void;
type PromiseRejection = (value: void | PromiseLike<void>) => void;
type PromiseHandler = [PromiseResolver, PromiseRejection];

/**
 * Load a script and only add it to the DOM once.
 */
export class ScriptLoader {
  scriptLoadingStarted = false;
  scriptLoadPromiseHandlers: PromiseHandler[];

  async insertScript(src: string, id: string, parentElement: Element) {
    if (!this.scriptLoadingStarted) {
      this.scriptLoadPromiseHandlers = [];
      this.scriptLoadingStarted = true;
      return new Promise((resolve, reject) => {
        const script = window.document.createElement('script');
        script.async = true;
        script.src = src;
        script.id = id;
        parentElement.appendChild(script);

        this.scriptLoadPromiseHandlers.push([resolve, reject]);
        script.addEventListener('load', () => {
          this.scriptLoadPromiseHandlers.forEach((handler) => handler[0]());
          this.scriptLoadPromiseHandlers = []; // free memory
        });
        script.addEventListener('error', () => {
          this.scriptLoadPromiseHandlers.forEach((handler) => handler[1]());
          this.scriptLoadPromiseHandlers = []; // free memory
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.scriptLoadPromiseHandlers.push([resolve, reject]);
      });
    }
  }
}
