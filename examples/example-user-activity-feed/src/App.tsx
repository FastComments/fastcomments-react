import {FastCommentsUserActivityFeedWidget} from "fastcomments-react";

const App = () => {
  const appUserId = 'someone@somewhere.com'; // This is a SimpleSSO user. With SecureSSO, this will be the id you specify.
  const tenantId = 'demo';
  const fastCommentsUserId = `${tenantId}:${appUserId}`;
  // most use cases require readonly=true, but you may want to allow other users to comment in the feed.
  return <FastCommentsUserActivityFeedWidget tenantId="demo" userId={fastCommentsUserId} readonly={true}/>
}

export default App
