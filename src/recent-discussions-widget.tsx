import * as React from 'react'
import {isEqual} from 'lodash';
import {ScriptLoader} from "./script-loader";

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

export interface FastCommentsRecentDiscussionsWidgetProps {
  tenantId: string;
  count?: number;
  hasDarkBackground?: boolean;
  translations?: Record<string, string>;
  region?: 'eu' | string;
  apiHost?: string;
}

export class FastCommentsRecentDiscussionsWidget extends React.Component<FastCommentsRecentDiscussionsWidgetProps, FastCommentsState> {

  static widgetLoader: ScriptLoader = new ScriptLoader();

  constructor(props: FastCommentsRecentDiscussionsWidgetProps) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-recent-discussions-${Math.random()}-${Date.now()}`
    });
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsRecentDiscussionsWidgetProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    if (this.state.status === LoadStatus.ScriptLoaded || this.state.status === LoadStatus.Done) {
      this.instantiateWidget();
      return;
    }
    return this.loadInstance();
  }

  async loadInstance() {
    return new Promise<void>(async (resolve, reject) => {
      switch (this.state.status) {
        case LoadStatus.Started:
          try {
            if (window && !(window as unknown as {FastCommentsRecentDiscussionsV2?: Function}).FastCommentsRecentDiscussionsV2) {
              const src = this.props.region === 'eu'
                ? 'https://cdn-eu.fastcomments.com/js/widget-recent-discussions-v2.min.js'
                : 'https://cdn.fastcomments.com/js/widget-recent-discussions-v2.min.js';
              await FastCommentsRecentDiscussionsWidget.widgetLoader.insertScript(src, 'fastcomments-recent-discussions-v2-script', window.document.body);
            }
            this.setState({status: LoadStatus.ScriptLoaded});
            this.forceUpdate();
            resolve();
          } catch (e) {
            console.error('FastComments Script Load Failure', e);
            this.setState({status: LoadStatus.Error});
            this.forceUpdate();
            reject();
          }
          break;
        case LoadStatus.ScriptLoaded:
          this.instantiateWidget();
          this.setState({status: LoadStatus.Done});
          resolve();
          break;
        default:
          resolve();
          break;
      }
    });
  }

  instantiateWidget() {
    if (this.state.widgetId) {
      const element = document.getElementById(this.state.widgetId);
      const fn = (window as unknown as {FastCommentsRecentDiscussionsV2?: (el: HTMLElement, cfg: FastCommentsRecentDiscussionsWidgetProps) => void}).FastCommentsRecentDiscussionsV2;
      if (element && fn) {
        fn(element, {...this.props});
      }
    }
  }

  render() {
    return (<div>
        {this.state.widgetId ? <div
          id={this.state.widgetId}>{this.state.status === LoadStatus.Error ? 'Oh no! The recent discussions could not be loaded.' : ''}</div> : ''}
      </div>
    )
  }
}
