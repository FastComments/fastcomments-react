# fastcomments-react

> A React library for FastComments, a fast and developer friendly comment system.

[![NPM](https://img.shields.io/npm/v/fastcomments-react.svg)](https://www.npmjs.com/package/fastcomments-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

### NPM

```bash
npm install --save fastcomments-react
```

### Yarn

```bash
yarn add fastcomments-react
```

## Usage

### The Main Widget Component

The FastCommentsCommentWidget component contains the live FastComments comment widget.

Replace "demo" below with your "tenantId" - available [here](https://fastcomments.com/auth/my-account/get-acct-code) in the FastComments admin area.

The widget supports a lot of options - see FastCommentsCommentWidgetConfig in src/index.tsx.

```tsx
import React, { Component } from 'react'

import {FastCommentsCommentWidget} from 'fastcomments-react'

class Example extends Component {
  render() {
    return <FastCommentsCommentWidget tenantId="demo" />
  }
}
```

### Updating The Current Page (For SPAs)
To update the page/article the comment thread is tied to you must update the configuration parameters "urlId" and "url".
See the example and explanation [here](https://github.com/FastComments/fastcomments-react/blob/master/example/src/PaginatedApp.tsx).

### The Comment Count Widget

The FastCommentsCommentCountWidget component contains the live FastComments comment count widget.

Replace "demo" below with your "tenantId" - available [here](https://fastcomments.com/auth/my-account/get-acct-code) in the FastComments admin area.

See FastCommentsCommentCountConfig in src/index.tsx for the supported configuration options.

```tsx
import React, { Component } from 'react'

import {FastCommentsCommentCountWidget} from 'fastcomments-react'

class Example extends Component {
  render() {
    return <FastCommentsCommentCountWidget tenantId="demo" />
  }
}
```

## Contributing
Please checkout our [contribution guidelines](CONTRIBUTING.md) before starting on a change. Remember to communicate first!

## License

MIT © [winrid](https://github.com/winrid)
