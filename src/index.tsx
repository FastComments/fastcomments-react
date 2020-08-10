import * as React from 'react'
//import { isEqual } from 'lodash';
import styles from './styles.module.css'

interface Props {
  text: string
}

export class ExampleComponent extends React.Component<Props, {}> {

  /*
  componentDidMount() {
    this.loadInstance();
  }

  shouldComponentUpdate(nextState: Props) {
    if (this.state === nextState)
      return false;
    return isEqual(this.state, nextState);
  }

  componentDidUpdate() {
    this.cleanInstance();
    this.loadInstance();
  }

  loadInstance() {
    insertScript('https://cdn.fastcomments.com/js/embed.min.js', 'test', window.document.body);
  }

  cleanInstance() {
    // TODO
  }
  */

  render() {
    return <div className={styles.test}>Example test Component: {this.props.text}</div>
  }
}

/*
function insertScript(src : string, id : string, parentElement : Element) {
  const script = window.document.createElement('script');
  script.async = true;
  script.src = src;
  script.id = id;
  parentElement.appendChild(script);

  return script;
}
*/
