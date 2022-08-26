import React, {useState} from 'react'
import {FastCommentsCommentCountWidget} from "fastcomments-react";

const CommentCountApp = () => {
  const [myPageId, _setPageId] = useState('https://example.com/some-page-or-id');
  return (
    <FastCommentsCommentCountWidget tenantId="demo" urlId={myPageId} />
  )
}

export default CommentCountApp
