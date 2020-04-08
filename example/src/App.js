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
          src="https://cdn.bambuser.net/broadcasts/996dfc93-280d-4825-8a81-37215c5e0605?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1586342546&da_static=1&da_ttl=0&da_signature=e063b19dfe841143d0d0237fbee3c030cc69b916909012c46229131720f2618c"
          broadcastId="123"
          autoplay
          onEnded={() => console.log('Ended')}
        />
    )
  }
}
