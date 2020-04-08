/* eslint no-constant-condition: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BambuserPlayer from './BambuserPlayer'

class NgagerBambuserPlayer extends PureComponent {
  constructor(props) {
    super(props)
    // this.handleOnReceived = this.handleOnReceived.bind(this)
    this.styles = {
      container: Object.assign({ width: '100%', height: '100% ', display: 'flex', alignItems: 'center', justifyContent: 'center' }, props.style)
    }
  }

  componentDidMount() {
    const { broadcastId, src, autoplay } = this.props
    const player = BambuserPlayer.create(this.player, src, {
      noFullscreen: true // Do not allow fullscreen
    })
    player.addEventListener('ended', function() {
      // console.log('player ended')
      this.props.onEnded(broadcastId)
    })
    player.controls = true

    // player.autoplay = aut
    // player.currentTime = 1
    if (autoplay) {
      player.play()
    }
  }

  render() {
    // const { host, path } = this.props.viewer
    // console.log(this.props.resourceUri)
    return (
      <div
        className={this.props.className}
        style={this.styles.container}
        ref={el => {
          this.player = el || this.player
        }}
      >
        Loading...
      </div>
    )
  }
}

NgagerBambuserPlayer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  autoplay: PropTypes.bool,
  onEnded: PropTypes.func,
  broadcastId: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
  // poster: PropTypes.string,
}

NgagerBambuserPlayer.defaultProps = {
  className: '',
  style: {},
  poster: null,
  autoplay: false,
  onEnded: () => null
}

export default NgagerBambuserPlayer
