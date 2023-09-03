import {createRef, Ref} from 'react'
import CSS from 'csstype';
import {FastCommentsCommentWidget} from "fastcomments-react";

const wrapperStyles: CSS.Properties = {
  padding: '5px'
}

const buttonStyles: CSS.Properties = {
  margin: '5px'
}

const OpenProfileApp = () => {
  const ref: Ref<FastCommentsCommentWidget> = createRef();
  return (
    <div style={wrapperStyles}>
      <button style={buttonStyles} onClick={() => ref.current!.lastWidgetInstance!.openProfile({userId: 'demo'})}>Open Example Profile</button>

      <FastCommentsCommentWidget ref={ref} tenantId="demo" urlId="test"/>
    </div>
  )
}

export default OpenProfileApp
