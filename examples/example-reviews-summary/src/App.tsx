import {useState} from 'react'
import {FastCommentsReviewsSummaryWidget} from 'fastcomments-react';

const App = () => {
  const [myPageId, _setPageId] = useState('demo-page-id');
  return <FastCommentsReviewsSummaryWidget tenantId="demo" urlId={myPageId} />
}

export default App
