import * as React from 'react'
import {isEqual, omit} from 'lodash';
import {FastCommentsCollabChatWidgetConfig} from "fastcomments-typescript";
import {MutableRefObject} from "react";
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

export interface FastCommentsCollabChatWidgetConfigReact extends FastCommentsCollabChatWidgetConfig {
  targetRef: MutableRefObject<any>;
}

export class FastCommentsCollabChatWidget extends React.Component<FastCommentsCollabChatWidgetConfigReact, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;
  static widgetLoader: ScriptLoader = new ScriptLoader();

  constructor(props: FastCommentsCollabChatWidgetConfigReact) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-collab-chat-widget-${Math.random()}-${Date.now()}`
    });
    this.lastWidgetInstance = null;
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsCollabChatWidgetConfigReact) {
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
            if (window && !window.FastCommentsCollabChat) {
              const src = this.props.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-collab-chat.min.js' : 'https://cdn.fastcomments.com/js/embed-collab-chat.min.js';
              await FastCommentsCollabChatWidget.widgetLoader.insertScript(src, 'fastcomments-collab-chat-script', window.document.body);
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
      const element = this.props.targetRef;
      if (element && element.current) {
        const clonedProps = {
          ...omit(this.props, 'targetRef')
        };
        // @ts-ignore
        this.lastWidgetInstance = window.FastCommentsCollabChat(element.current, clonedProps);
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
