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

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'Live chat'
            // imageUrl: 'code.png',
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
