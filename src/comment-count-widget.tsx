import * as React from 'react'
import {isEqual} from 'lodash';
import {FastCommentsCommentCountConfig} from "fastcomments-typescript";

enum LoadStatus {
  Started,
  ScriptLoaded,
  Done,
  Error
}

interface FastCommentsState {
  status: LoadStatus,
  widgetId: string | null
}

interface WidgetInstance {
  destroy: Function,
  update: Function
}

// If we continue to see the same patterns, we can create some simple abstraction to remove a lot of boilerplate here.
export class FastCommentsCommentCountWidget extends React.Component<FastCommentsCommentCountConfig, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;

  constructor(props: FastCommentsCommentCountConfig) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-count-widget-${Math.random()}-${Date.now()}`
    });
    this.lastWidgetInstance = null;
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsCommentCountConfig) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    if (this.state.status === LoadStatus.ScriptLoaded) {
      return this.reset();
    } else {
      return this.loadInstance();
    }
  }

  async insertScript(src: string, id: string, parentElement: Element) {
    return new Promise((resolve, reject) => {
      const script = window.document.createElement('script');
      script.async = true;
      script.src = src;
      script.id = id;
      parentElement.appendChild(script);

      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
    });
  }

  async loadInstance() {
    return new Promise(async (resolve, reject) => {
      switch (this.state.status) {
        case LoadStatus.Started:
          try {
            // @ts-ignore
            if (window && !window.FastCommentsUI) {
              await this.insertScript('https://cdn.fastcomments.com/js/widget-comment-count.min.js', 'fastcomments-count-widget-script', window.document.body);
            }
            this.setState({
              status: LoadStatus.ScriptLoaded
            });
            this.forceUpdate();
            resolve();
          } catch (e) {
            console.error('FastComments Script Load Failure', e);
            this.setState({
              status: LoadStatus.Error
            });
            this.forceUpdate();
            reject();
          }
          break;
        case LoadStatus.ScriptLoaded:
          this.instantiateWidget();
          this.setState({
            status: LoadStatus.Done
          });
          resolve();
          break;
        default:
          resolve();
          break;
      }
    });
  }

  reset() {
    if (this.lastWidgetInstance) {
      this.lastWidgetInstance.update(this.props);
    } else {
      this.instantiateWidget();
    }
  }

  instantiateWidget() {
    if (this.state.widgetId) {
      const element = document.getElementById(this.state.widgetId);
      if (element) {
        // @ts-ignore
        this.lastWidgetInstance = window.FastCommentsCommentCount(element, this.props);
      }
    }
  }

  render() {
    return (<div>
        {this.state.widgetId ? <div
          id={this.state.widgetId}>{this.state.status === LoadStatus.Error ? 'Oh no! The comment count could not be loaded.' : ''}</div> : ''}
      </div>
    )
  }
}
