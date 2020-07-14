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
  }

  render() {
    console.log('rendering codeEditor', this.props)
    return (
      <div id="code-editor-container" className="side">
        <AceEditor
          placeholder="Let's get coding"
          mode="javascript"
          theme="monokai"
          fontSize={14}
          setOptions={{useWorker: false}}
          onChange={this.props.onChange}
          // onChange={this.onChange}
          ref={this.refName}
          // value={this.state.newValue}
          value={this.props.codeEditorData}
          width="100%"
          height="100%"
        />
      </div>
    )
  }
}
