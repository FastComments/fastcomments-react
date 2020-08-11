import * as React from 'react'
import {isEqual} from 'lodash';

interface FastCommentsConfig {
  text: string,
  widgetId?: string,
}

enum LoadStatus {
  Started,
  Done,
  Error
};

interface FastCommentsState {
  status: LoadStatus,
  widgetId: string
}

export class ExampleComponent extends React.Component<FastCommentsConfig, FastCommentsState> {

  constructor(props: FastCommentsConfig) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: props.widgetId || 'fastcomments-widget-' + new Date()
    };
  }

  componentDidMount() {
    return this.loadInstance();
  }

  shouldComponentUpdate(nextState: FastCommentsConfig) {
    return isEqual(this.state, nextState);
  }

  componentDidUpdate() {
    return this.loadInstance();
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
    switch (this.state.status) {
      case LoadStatus.Started:
        try {
          // @ts-ignore
          if (window && !window.FastCommentsUI) {
            await this.insertScript('https://cdn.fastcomments.com/js/embed.min.js', 'fastcomments-widget-script', window.document.body);
          }
          this.setState({
            status: LoadStatus.Done
          });
          this.forceUpdate();
        } catch (e) {
          console.error('FastComments Script Load Failure', e);
          this.setState({
            status: LoadStatus.Error
          });
          this.forceUpdate();
        }
        break;
      case LoadStatus.Done:
        // @ts-ignore
        window.FastCommentsUI(document.getElementById(this.state.widgetId), {
          tenantId: 'demo'
        });
        break;
    }
  }

  render() {
    return (
      <div id={this.state.widgetId}>{this.state.status === LoadStatus.Error ? 'Oh no! The comments section could not be loaded.' : ''}</div>
    )
  }
}
