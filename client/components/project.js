import React from 'react'
// import {Container, Row, Col} from 'react-bootstrap'
import Whiteboard from './whiteboard'
import CodeEditor from './codeEditor'
import {connect} from 'react-redux'
import {
  getLine,
  saveBoard,
  reloadSavedBoard,
  setNewBoard,
  getCode,
  getName
} from '../store/canvasData'
import socket from '../socket'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeEditorData: ' ',
      name: this.props.name,
      isHandlerDragging: false,
      inProgress: false,
      shareModalOpen: false
    }
    this.onChange = this.onChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.shareProject = this.shareProject.bind(this)
    this.openShareModal = this.openShareModal.bind(this)
    this.closeShareModal = this.closeShareModal.bind(this)
  }

  openShareModal() {
    this.setState({shareModalOpen: true})
  }

  closeShareModal() {
    this.setState({shareModalOpen: false})
    window.location.href = `/project/${this.props.projectId}`
  }

  onChange(newValue) {
    console.log('calling on change')
    this.setState({codeEditorData: newValue})
    this.props.getCode(this.state.codeEditorData)
    socket.emit('new-code-from-client', newValue, this.props.projectId)
  }

  async onNameChange(e) {
    this.setState({inProgress: true})
    console.log(e.target.value)
    const newValue = e.target.value
    console.log('calling onNameChange')
    await this.setState({name: newValue})
    console.log(this.state)
    this.props.getName(this.state.name)
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.reloadSavedBoard(this.props.match.params.id)
    } else {
      this.props.setNewBoard()
    }
  }

  async shareProject() {
    const id = await this.props.saveBoard(
      this.props.projectId,
      this.props.whiteboardData,
      this.props.codeEditorData,
      this.props.name
    )
    socket.emit('joinRoom', id)
    this.openShareModal()
  }

  render() {
    console.log('rendering project component')
    console.log('props', this.props)
    console.log(this.state)

    console.log(this.state)
    return (
      <div>
        {this.props.name || this.state.inProgress ? (
          <div id="project-view">
            <input
              id="project-title"
              type="text"
              value={this.props.name}
              onChange={this.onNameChange}
              placeholder="Your Project Name"
              className="display-4"
            />
            <button
              onClick={async () => {
                const id = await this.props.saveBoard(
                  this.props.projectId,
                  this.props.whiteboardData,
                  this.props.codeEditorData,
                  this.props.name
                )
                window.location.href = `/project/${id}`
              }}
              type="button"
            >
              Save!
            </button>
            <button
              onClick={() => {
                this.props.setNewBoard()
                window.location.href = '/project'
              }}
              type="button"
            >
              New Project!
            </button>
            <Button type="button" onClick={() => this.shareProject()}>
              Share
            </Button>
            <div id="workspace-container">
              <Whiteboard
                projectId={this.props.projectId}
                name={this.props.name}
                whiteboardData={this.props.whiteboardData}
              />
              <div id="drag-handler" />
              <CodeEditor
                projectId={this.props.projectId}
                name={this.props.name}
                codeEditorData={this.props.codeEditorData}
                onChange={this.onChange}
              />
            </div>
            <Dialog
              open={this.state.shareModalOpen}
              onClose={this.closeShareModal}
              aria-labelledby="share-link-title"
              aria-describedby="share-link-area"
            >
              <DialogTitle id="share-link-title">
                Share the link below to invite collaborators:
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="share-link-area">
                  <input
                    type="text"
                    id="share-link"
                    value={`https://scribby-dev.herokuapp.com/project/${
                      this.props.projectId
                    }`}
                    readOnly={true}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeShareModal} color="primary">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const copyText = document.getElementById('share-link')
                    copyText.select()
                    document.execCommand('copy')
                  }}
                  color="primary"
                  autoFocus
                >
                  Copy to Clipboard
                </Button>
              </DialogActions>
            </Dialog>
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
    whiteboardData: state.canvasData.whiteboardData,
    projectId: state.canvasData.projectId,
    name: state.canvasData.name,
    codeEditorData: state.canvasData.codeEditorData
  }
}

const mapDispatch = dispatch => {
  return {
    getLine: points => dispatch(getLine(points)),
    reloadSavedBoard: projectId => dispatch(reloadSavedBoard(projectId)),
    saveBoard: (projectId, whiteboardData, codeEditorData, name) =>
      dispatch(saveBoard(projectId, whiteboardData, codeEditorData, name)),
    setNewBoard: () => dispatch(setNewBoard()),
    getCode: str => dispatch(getCode(str)),
    getName: str => dispatch(getName(str))
  }
}

export default connect(mapState, mapDispatch)(Project)
