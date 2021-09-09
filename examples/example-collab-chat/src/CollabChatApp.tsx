import React, {useRef} from 'react'
import {FastCommentsCollabChatWidget} from "fastcomments-react";

const CollabChatApp = () => {
  const contentRef = useRef(null);
  return (
    <div>
      <div ref={contentRef}>This is some text that will have collab chat enabled.</div>
      <FastCommentsCollabChatWidget tenantId="demo" targetRef={contentRef}/>
    </div>
  )
}

export default CollabChatApp
