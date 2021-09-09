import React, {useRef} from 'react'
import {FastCommentsImageChatWidget} from "fastcomments-react";

const ImageChatApp = () => {
  const contentRef = useRef(null);
  return (
    <div>
      <img ref={contentRef} src="https://fastcomments.com/images/image-chat-demo-1.jpg" alt="Demo Image"/>
      <FastCommentsImageChatWidget tenantId="demo" targetRef={contentRef} />
    </div>
  )
}

export default ImageChatApp
