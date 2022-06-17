import * as React from 'react'
import {isEqual, omit} from 'lodash';
import {FastCommentsImageChatWidgetConfig} from "fastcomments-typescript";
import {MutableRefObject} from "react";

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

export interface FastCommentsImageChatWidgetConfigReact extends FastCommentsImageChatWidgetConfig {
  targetRef: MutableRefObject<any>;
}

export class FastCommentsImageChatWidget extends React.Component<FastCommentsImageChatWidgetConfigReact, FastCommentsState> {

  lastWidgetInstance: WidgetInstance | null;

  constructor(props: FastCommentsImageChatWidgetConfigReact) {
    super(props);
    this.state = {
      status: LoadStatus.Started,
      widgetId: null,
    };
  }

  componentDidMount() {
    this.setState({
      status: LoadStatus.Started,
      widgetId: `fastcomments-image-chat-widget-${Math.random()}-${Date.now()}`
    });
    this.lastWidgetInstance = null;
    return this.loadInstance();
  }

  shouldComponentUpdate(nextProps: FastCommentsImageChatWidgetConfigReact) {
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
            if (window && !window.FastCommentsImageChat) {
              const src = this.props.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-image-chat.min.js' : 'https://cdn.fastcomments.com/js/embed-image-chat.min.js';
              await this.insertScript(src, 'fastcomments-image-chat-script', window.document.body);
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
        this.lastWidgetInstance = window.FastCommentsImageChat(element.current, clonedProps);
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
