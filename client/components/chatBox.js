import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'

export default class Chatbox extends Component {
  constructor() {
    super()
    this.state = {
      messageList: []
    }
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: 'them',
            type: 'text',
            data: {text}
          }
        ]
      })
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'Live chat',
            imageUrl: 'code.png'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    )
  }
}
