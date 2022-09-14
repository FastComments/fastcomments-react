import * as React from 'react'
import {isEqual} from 'lodash';
import {FastCommentsCommentWidgetConfig} from "fastcomments-typescript";

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

export interface FastCommentsUserActivityFeedWidgetProps extends FastCommentsCommentWidgetConfig {
  /** With SSO, this will be tenantId + ':' + userId. With Simple SSO this will be tenantId + ':' + userEmail. **/
  userId: string;
}

export class FastCommentsUserActivityFeedWidget extends React.Component<FastCommentsUserActivityFeedWidgetProps, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;

  constructor(props: FastCommentsUserActivityFeedWidgetProps) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-widget-${Math.random()}-${Date.now()}`
    });
    this.lastWidgetInstance = null;
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsCommentWidgetConfig) {
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
    return new Promise<void>(async (resolve, reject) => {
      switch (this.state.status) {
        case LoadStatus.Started:
          try {
            // @ts-ignore
            if (window && !window.FastCommentsUserActivity) {
              const src = this.props.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-user-activity.min.js' : 'https://cdn.fastcomments.com/js/embed-user-activity.min.js';
              await this.insertScript(src, 'fastcomments-widget-script', window.document.body);
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
      this.lastWidgetInstance.update({...this.props});
    } else {
      this.instantiateWidget();
    }
  }

  instantiateWidget() {
    if (this.state.widgetId) {
      const element = document.getElementById(this.state.widgetId);
      if (element) {
        // @ts-ignore
        window.FastCommentsUserActivity(element, {...this.props}, (error, newInstance) => {
          if (error) {
            console.error('FastComments User Activity Load Failure', error);
          } else {
            this.lastWidgetInstance = newInstance;
          }
        });
      }
    }
  }

  render() {
    return (<div>
        {this.state.widgetId ? <div
          id={this.state.widgetId}>{this.state.status === LoadStatus.Error ? 'Oh no! The comments section could not be loaded.' : ''}</div> : ''}
      </div>
    )
  }
}
