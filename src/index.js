/* eslint no-constant-condition: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BambuserPlayer from './BambuserPlayer'

class NgagerBambuserPlayer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLive: false,
      currentViewer: 0
    }
    this.handleOnEnded = this.handleOnEnded.bind(this)
  }

  componentDidMount() {
    const { src, autoplay } = this.props
    const player = BambuserPlayer.create(this.player, src, {
      noFullscreen: true // Do not allow fullscreen
    })
    player.addEventListener('ended', this.handleOnEnded)
    player.addEventListener('viewers', () => {
      console.log('player.viewers', player.viewers)
      this.setState({ currentViewer: player.viewers.current })
    })
    // console.log(player.isLive)
    player.controls = true

    // player.autoplay = aut
    // player.currentTime = 1
    if (autoplay) {
      player.play()
    }

    // this.setState({ isLive: player.isLive })
    this.setState({ isLoading: false, isLive: player.isLive, currentViewer: player.viewers.current })
  }

  handleOnEnded() {
    this.props.onEnded(this.props.broadcastId)
  }

  render() {
    // const { host, path } = this.props.viewer
    // console.log(this.props.resourceUri)
    return (
      <Container
        className={this.props.className}
        style={this.props.style}
      >
        {this.state.isLoading && <span>Loading...</span>}
        <div className='player' ref={el => { this.player = el || this.player }} />
        <div className='header'>
          {this.state.isLive && <span className='live'>LIVE</span>}
          {this.state.currentViewer > 0 && (
            <div className='viewer'>
              <i className='fa fa-eye' aria-hidden='true' />
              <span>{this.state.currentViewer}</span>
            </div>
          )}
        </div>
      </Container>
    )
  }
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
position: relative;

> div.player {
  width: 100%;
  height: 100%;
}

> div.header {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;

  > span.live {
    background-color: red;
    color: #fff;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
  }

  .viewer {
    margin-left: 10px;
    color: #ffffff;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background-color: #222222;

    .fa {
      font-size: 20px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
}
`

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
