import React, {useState} from 'react'
import CSS from 'csstype';
import {FastCommentsCommentWidget} from "fastcomments-react";

const wrapperStyles : CSS.Properties = {
  padding: '5px'
}

const buttonStyles : CSS.Properties = {
  marginRight: '5px'
}

const PaginatedApp = () => {
  const [pageNumber, setPageNumber] = useState(0);

  function updatePageAndURL (number: number) {
    window.location.hash = getHashFromNumber(number);
    setPageNumber(number);
  }

  function getHashFromNumber (number: number) {
    return '#page-' + number;
  }

  if (!window.location.hash) {
    updatePageAndURL(0);
  }

  return (
    <div style={wrapperStyles}>
      <div>Page: {pageNumber}</div>
      <button style={buttonStyles} onClick={() => updatePageAndURL(pageNumber - 1)}>Prev</button>

      <button style={buttonStyles} onClick={() => updatePageAndURL(pageNumber + 1)}>Next</button>

      {/* We update "urlId" because this is the identifier for the page. It can be a URL, or some kind of id. */}
      {/* We update "url" so that links to the comment thread work. */}
      {/* Note that we're using a real tenant id here, so that we can demo the pagination. */}
      <FastCommentsCommentWidget tenantId="demo" urlId={window.location.href} url={window.location.href}/>
    </div>
  )
}

export default PaginatedApp
