import {useRef, useState} from 'react'
import {FastCommentsCollabChatWidget} from "fastcomments-react";

const CollabChatApp = () => {
  const contentRef = useRef(null);
  const [myPageId, _setPageId] = useState('https://example.com/some-page-or-id');
  return (
    <div>
      <div ref={contentRef}>This is some text that will have collab chat enabled. Try highlighting a word.</div>
      <FastCommentsCollabChatWidget tenantId="demo" urlId={myPageId} targetRef={contentRef}/>
    </div>
  )
}

export default CollabChatApp
