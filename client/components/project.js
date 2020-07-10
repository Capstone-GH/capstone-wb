import React from 'react'
import Whiteboard from './whiteboard'
import CodeEditor from './codeEditor'
import {connect} from 'react-redux'
import {
  getLine,
  saveBoard,
  reloadSavedBoard,
  setNewBoard,
  getCode
} from '../store/canvasData'

export class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeEditorData: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(newValue) {
    console.log('calling on change')
    this.setState({codeEditorData: newValue})
    this.props.getCode(this.state.codeEditorData)
    console.log(newValue)
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.reloadSavedBoard(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    console.log('going away!')
  }

  render() {
    console.log('rendering project component')
    console.log(this.props)
    console.log(this.state)

    console.log(this.state)
    return (
      <div id="project-board">
        {this.props.projectId ? (
          <div>
            <button
              onClick={() =>
                this.props.saveBoard(
                  this.props.projectId,
                  this.props.linePoints,
                  this.props.codeEditorData
                )
              }
              type="button"
            >
              Save!
            </button>
            <Whiteboard
              projectId={this.props.projectId}
              name={this.props.name}
              linePoints={this.props.linePoints}
            />
            <CodeEditor
              codeEditorData={this.props.codeEditorData}
              onChange={this.onChange}
            />
          </div>
        ) : (
          <h1>...loading</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    linePoints: state.canvasData.linePoints,
    projectId: state.canvasData.projectId,
    name: state.canvasData.name,
    codeEditorData: state.canvasData.codeEditorData
  }
}

const mapDispatch = dispatch => {
  return {
    getLine: points => dispatch(getLine(points)),
    reloadSavedBoard: projectId => dispatch(reloadSavedBoard(projectId)),
    saveBoard: (projectId, linePoints, codeEditorData) =>
      dispatch(saveBoard(projectId, linePoints, codeEditorData)),
    setNewBoard: () => dispatch(setNewBoard()),
    getCode: str => dispatch(getCode(str))
  }
}

export default connect(mapState, mapDispatch)(Project)
