import * as React from 'react'
import {isEqual} from 'lodash';
import {FastCommentsCommentCountConfig} from "fastcomments-typescript";
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

// If we continue to see the same patterns, we can create some simple abstraction to remove a lot of boilerplate here.
export class FastCommentsCommentCountWidget extends React.Component<FastCommentsCommentCountConfig, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;
  static widgetLoader: ScriptLoader = new ScriptLoader();

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

  async loadInstance() {
    return new Promise<void>(async (resolve, reject) => {
      switch (this.state.status) {
        case LoadStatus.Started:
          try {
            // @ts-ignore
            if (window && !window.FastCommentsUI) {
              const src = this.props.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/widget-comment-count.min.js' : 'https://cdn.fastcomments.com/js/widget-comment-count.min.js';
              await FastCommentsCommentCountWidget.widgetLoader.insertScript(src, 'fastcomments-count-widget-script', window.document.body);
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
