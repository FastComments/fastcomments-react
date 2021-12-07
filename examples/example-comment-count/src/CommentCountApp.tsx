import React from 'react'
import {FastCommentsCommentCountWidget} from "fastcomments-react";

const CommentCountApp = () => {
  return (
    <FastCommentsCommentCountWidget tenantId="demo" urlId="https://example.com/some-page-or-id" />
  )
}

export default CommentCountApp
