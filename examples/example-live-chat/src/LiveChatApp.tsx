import React, {useState} from 'react'
import {FastCommentsLiveChatWidget} from 'fastcomments-react';

const LiveChatApp = () => {
  const [myPageId, _setPageId] = useState('react-demo-live-chat');
  return <FastCommentsLiveChatWidget tenantId="demo" urlId={myPageId} />
}

export default LiveChatApp
