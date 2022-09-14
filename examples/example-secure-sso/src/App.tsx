import {useEffect, useState} from 'react'
import {FastCommentsCommentWidget} from 'fastcomments-react';
import {FastCommentsSSO} from 'fastcomments-typescript/src/fast-comments-comment-widget-config';

// this contains an object with userDataJSONBase64, which is a base64 version of FastCommentsSSOUserData
async function getLoggedInUserInfo(): Promise<Pick<FastCommentsSSO, 'userDataJSONBase64' | 'verificationHash' | 'timestamp'>> {
  // example service with server-side code here: https://github.com/FastComments/fastcomments-code-examples/tree/master/sso/nodejs
  // start and run this example to make this component work.
  // Replace this with your own API call to get the logged-in user.
  const response = await fetch('http://localhost:3003/sso-user-info', {
    headers: {
      'Accept': 'application/json'
    }
  });
  return await response.json();
}

const App = () => {
  const [sso, setSSO] = useState<FastCommentsSSO>({
    loginURL: 'https://example.com/login',
    logoutURL: 'https://example.com/logout',
    // OR you can do this
    // loginCallback: () => {
    //   useEffect(() => {
    //     console.log('login')
    //   })
    // },
    // logoutCallback: () => {
    //   useEffect(() => {
    //     console.log('logout')
    //   })
    // },
  });
  const [myPageId, _setPageId] = useState('some-page-id');
  useEffect(() => {
    (async function () {
      // you probably want to handle errors here and do something.
      const userInfo = await getLoggedInUserInfo();
      setSSO(existing => ({
        ...existing,
        ...userInfo
      }))
    })();
  }, []);
  return <FastCommentsCommentWidget tenantId="demo" urlId={myPageId} sso={sso}/>
}

export default App
