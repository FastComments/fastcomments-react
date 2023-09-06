import {useState} from 'react'
import {FastCommentsCommentWidget} from 'fastcomments-react';

const App = () => {
  const [myPageId, _setPageId] = useState('some-page-id');

  // top level callbacks shown only. SSO has its own (logoutCallback, loginCallback)

  return <FastCommentsCommentWidget
    tenantId="demo"
    urlId={myPageId}
    onInit={() => console.log('Callback: onInit')}
    onRender={() => console.log('Callback: onRender')}
    onCommentsRendered={(comments) => console.log('Callback: onCommentsRendered', comments)}
    commentCountUpdated={(count) => console.log('Callback: commentCountUpdated', count)}
    onAuthenticationChange={(event, data) => console.log('Callback: onAuthenticationChange', event, data)}
    onReplySuccess={(comment) => console.log('Callback: onReplySuccess', comment)}
    onVoteSuccess={(comment, voteId, direction, status) => console.log('Callback: onVoteSuccess', comment, voteId, direction, status)}
    onImageClicked={(src) => console.log('Callback: onImageClicked', src)}
    onOpenProfile={(userId) => {
      console.log('Callback: onOpenProfile', userId);
      return false;
    }}
  />
}

export default App
