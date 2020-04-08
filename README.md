# ngager-bambuserplayer

> PDF Reader component using PDF.js library

[![NPM](https://img.shields.io/npm/v/ngager-bambuserplayer.svg)](https://www.npmjs.com/package/ngager-bambuserplayer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngager-bambuserplayer
```
## Example
https://ngager-group.github.io/ngager-bambuserplayer/

## Usage

```jsx
import React, { PureComponent } from 'react'

import Bambuserplayer from 'ngager-bambuserplayer'

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    console.log('constructor')
  }

  render () {
    return (
        <Bambuserplayer
          src="https://cdn.bambuser.net/broadcasts/701b6318-ebc4-47a9-83ae-45cf80a28bbc?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1586259204&da_static=1&da_ttl=0&da_signature=f2e40ed65b2fee9fbbd286094879e20895f4e0c64fae78d4ee1c40b9ef0e052e"
          broadcastId="123"
          autoplay
        />
    )
  }
}

```

## License

MIT © [ngager-group](https://github.com/ngager-group)
