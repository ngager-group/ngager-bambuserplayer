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
