import React, {useRef, useState} from 'react'
import {FastCommentsImageChatWidget} from "fastcomments-react";

const ImageChatApp = () => {
  const contentRef = useRef(null);
  const [myPageId, _setPageId] = useState('some-page-id');
  return (
    <div>
      <img ref={contentRef} src="https://fastcomments.com/images/image-chat-demo-1.jpg" alt="Demo Image"/>
      <FastCommentsImageChatWidget tenantId="demo" urlId={myPageId} targetRef={contentRef} />
    </div>
  )
}

export default ImageChatApp
