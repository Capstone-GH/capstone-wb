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
            teamName: 'Live chat',
            // imageUrl: "https://img.icons8.com/doodle/48/000000/code-file.png"
            // imageUrl: "https://img.icons8.com/cotton/64/000000/source-code--v3.png"
            // imageUrl: "https://img.icons8.com/cotton/64/000000/groups--v1.png"
            imageUrl: 'https://img.icons8.com/cotton/64/000000/name--v2.png'
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
