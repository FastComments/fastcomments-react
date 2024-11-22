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

interface WidgetInstance {
  destroy: Function,
  update: Function
}

export interface FastCommentsReviewsSummaryWidgetProps {
  /** Id that represents you as a customer. */
  tenantId: string
  /** Id that represents the page, if you don't want to tie comments to the page url. Could be a URL or an ID (like an article id). */
  urlId?: string
  /** The region your account is in. If your account was created via fastcomments.com, you can leave this undefined. EU customers will want to set it to 'eu'. Does not apply to VanillaJS widget. */
  region?: 'eu';
}

export class FastCommentsReviewsSummaryWidget extends React.Component<FastCommentsReviewsSummaryWidgetProps, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;
  static widgetLoader: ScriptLoader = new ScriptLoader();

  constructor(props: FastCommentsReviewsSummaryWidgetProps) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-rs-widget-${Math.random()}-${Date.now()}`
    });
    this.lastWidgetInstance = null;
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsReviewsSummaryWidgetProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    if (this.state.status === LoadStatus.ScriptLoaded) {
      return this.reset();
    } else {
      return this.loadInstance();
    }
  }

  async loadInstance() {
    return new Promise<void>(async (resolve, reject) => {
      switch (this.state.status) {
        case LoadStatus.Started:
          try {
            // @ts-ignore
            if (window && !window.FastCommentsReviewsSummaryWidget) {
              const src = this.props.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-reviews-summary.min.js' : 'https://cdn.fastcomments.com/js/embed-reviews-summary.min.js';
              await FastCommentsReviewsSummaryWidget.widgetLoader.insertScript(src, 'fastcomments-rs-widget-script', window.document.body);
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
        window.FastCommentsReviewsSummaryWidget(element, {...this.props}, (error, newInstance) => {
          if (error) {
            console.error('FastComments Reviews Summary Load Failure', error);
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
          id={this.state.widgetId}>{this.state.status === LoadStatus.Error ? 'Oh no! The reviews summary could not be loaded.' : ''}</div> : ''}
      </div>
    )
  }
}
