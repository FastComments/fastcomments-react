import {useState} from 'react'
import {FastCommentsCommentWidget} from 'fastcomments-react';

const App = () => {
  const [myPageId, _setPageId] = useState('some-page-id');
  return <FastCommentsCommentWidget tenantId="demo" region="eu" urlId={myPageId} />
}

export default App
