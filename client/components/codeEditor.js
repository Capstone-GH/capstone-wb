import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-terminal'

export default class CodeEditor extends Component {
  render() {
    return (
      <div>
        <AceEditor
          placeholder="Let's get coding"
          mode="javascript"
          theme="monokai"
          fontSize={14}
          // width={window.innerWidth}
          // height={window.innerHeight}
        />
      </div>
    )
  }
}
