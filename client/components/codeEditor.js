/* eslint-disable no-alert */
import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'ace-builds'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

export default class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.refName = React.createRef()
    this.state = {
      newValue: ''
    }
    this.onChange = this.onChange.bind(this)
    console.log(props)
    console.log(this.refName)
    console.log(this.refName.current)
  }

  onChange(newValue) {
    this.setState({newValue: newValue})
    console.log(newValue)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <AceEditor
          placeholder="Let's get coding"
          mode="javascript"
          theme="monokai"
          fontSize={14}
          setOptions={{useWorker: false}}
          onChange={this.onChange}
          ref={this.refName}
          value={this.state.newValue}
          // width={window.innerWidth}
          // height={window.innerHeight}
        />
      </div>
    )
  }
}
