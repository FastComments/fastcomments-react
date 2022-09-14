import {useState} from 'react'
import {FastCommentsCommentWidget} from 'fastcomments-react';
import { FastCommentsSSOSimple } from 'fastcomments-typescript/src/fast-comments-comment-widget-config';

const App = () => {
  const [simpleSSO, _setSimpleSSO] = useState<FastCommentsSSOSimple>({
    avatar: 'https://staticm.fastcomments.com/1582299581264-69384190_3015192525174365_476457575596949504_o.jpg', // optional
    email: "someone@somewhere.com", // optional
    username: "Someone", // required
    websiteUrl: "https://blog.fastcomments.com" // optional
  });
  const [myPageId, _setPageId] = useState('some-page-id');
  return <FastCommentsCommentWidget tenantId="demo" urlId={myPageId} simpleSSO={simpleSSO} />
}

export default App
