import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import {connect} from 'react-redux'
import {getMessage} from '../store/chatStore'
import socket from '../socket'

class Chatbox extends Component {
  _onMessageWasSent(message) {
    console.log(message)
    this.props.getMessage(message)
    socket.emit('message-from-client', message, this.props.projectId)
  }

  componentDidMount() {
    let openIcon = document.getElementsByClassName('sc-open-icon')[0]
    if (openIcon) {
      openIcon.src = '/3faa31586ecd265deab04ce24a90048f.png'
    }
    let closedIcon = document.getElementsByClassName('sc-closed-icon')[0]
    if (closedIcon) {
      closedIcon.src = '/4d881dc9874adc7364eb819a01793fa1.svg'
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'Live chat',
            imageUrl:
              'https://img.icons8.com/cotton/64/000000/source-code--v3.png'
            // imageUrl: 'https://img.icons8.com/cotton/64/000000/name--v2.png',
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.props.chatStore}
          showEmoji
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    chatStore: state.chatStore,
    projectId: state.canvasData.projectId
  }
}

const mapDispatch = dispatch => {
  return {
    getMessage: message => dispatch(getMessage(message))
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
