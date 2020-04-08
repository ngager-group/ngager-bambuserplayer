import React, { PureComponent } from 'react'

import Bambuserplayer from 'ngager-bambuserplayer'

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    console.log('constructor')
  }
  // resourceUri: "https://cdn.bambuser.net/broadcasts/614f2ce7-a2c4-4049-8d6c-290720342cb7?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1586347328&da_static=1&da_ttl=0&da_signature=dd3cff472434ed732958d26194af64e73500d2a5b6d7fbd21c259bc238ccb09d"

  render () {
    return (
        <Bambuserplayer
          src="https://cdn.bambuser.net/broadcasts/614f2ce7-a2c4-4049-8d6c-290720342cb7?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1586347328&da_static=1&da_ttl=0&da_signature=dd3cff472434ed732958d26194af64e73500d2a5b6d7fbd21c259bc238ccb09d"
          broadcastId="123"
          autoplay
          onEnded={() => console.log('Ended')}
        />
    )
  }
}
