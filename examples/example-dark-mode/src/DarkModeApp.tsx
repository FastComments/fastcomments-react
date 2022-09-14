import {useState} from 'react'
import {FastCommentsCommentWidget} from "fastcomments-react";

const DarkModeApp = () => {
  const [hasDarkBackground, setHasDarkBackground] = useState(true);
  const [myPageId, _setPageId] = useState('some-page-id');
  return (
    <div style={{ backgroundColor: hasDarkBackground ? 'black' : 'white' }}>
      <button onClick={() => setHasDarkBackground(!hasDarkBackground)}>Has dark
        background? {hasDarkBackground ? 'true' : 'false'}</button>
      <FastCommentsCommentWidget tenantId="demo" hasDarkBackground={hasDarkBackground} urlId={myPageId}/>
    </div>
  )
}

export default DarkModeApp
