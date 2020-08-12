import React, {useState} from 'react'
import {FastCommentsCommentWidget} from "fastcomments-react";

const DarkModeApp = () => {
  const [hasDarkBackground, setHasDarkBackground] = useState(false);
  return (
    <div style={{ backgroundColor: hasDarkBackground ? 'black' : 'white' }}>
      <button onClick={() => setHasDarkBackground(!hasDarkBackground)}>Has dark
        background? {hasDarkBackground ? 'true' : 'false'}</button>
      <FastCommentsCommentWidget tenantId="demo" hasDarkBackground={hasDarkBackground}/>
    </div>
  )
}

export default DarkModeApp
