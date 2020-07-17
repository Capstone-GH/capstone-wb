import React from 'react'
// import {Container, Row, Col} from 'react-bootstrap'
import Whiteboard from './whiteboard'
import CodeEditor from './codeEditor'
import {connect} from 'react-redux'
import {
  getLine,
  getCirc,
  getRect,
  saveBoard,
  reloadSavedBoard,
  setNewBoard,
  getCode,
  getName,
  getUpdatedShapes
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
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import Chatbox from './chatBox'

export class Project extends React.Component {
  constructor(props) {
    super(props)
    this.workspaceRef = React.createRef()
    this.whiteboardRef = React.createRef()
    this.state = {
      codeEditorData: ' ',
      name: this.props.name,
      isHandlerDragging: false,
      inProgress: false,
      shareModalOpen: false,
      width: 1000
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
    //  this.props.history.push(`/project/${this.props.projectId}`)
    window.location.href = `/project/${this.props.projectId}`
  }

  onChange(newValue) {
    this.setState({codeEditorData: newValue})
    this.props.getCode(this.state.codeEditorData)
    socket.emit('new-code-from-client', newValue, this.props.projectId)
  }

  async onNameChange(e) {
    this.setState({inProgress: true})
    const newValue = e.target.value
    await this.setState({name: newValue})
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
    return (
      <div>
        {this.props.name || this.state.inProgress ? (
          <div id="project-view">
            <Paper elevation={3} className="project-title-bar">
              <div>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => this.shareProject()}
                >
                  Share
                </Button>
                <IconButton
                  aria-label="save"
                  onClick={async () => {
                    const id = await this.props.saveBoard(
                      this.props.projectId,
                      this.props.whiteboardData,
                      this.props.codeEditorData,
                      this.props.name
                    )
                    this.props.history.push(`/project/${id}`)
                  }}
                  type="button"
                  variant="outlined"
                  color="secondary"
                >
                  <SaveIcon />
                </IconButton>
              </div>
              <TextField
                id="project-title"
                value={this.props.name}
                onChange={this.onNameChange}
                placeholder="Your Project Name"
                color="secondary"
              />
              <Button
                onClick={() => {
                  this.props.setNewBoard()
                  // this.props.history.push( `/project`)
                  window.location.href = '/project'
                }}
                type="button"
              >
                New Project
              </Button>
            </Paper>
            <div
              id="workspace-container"
              ref={this.workspaceRef}
              onMouseMove={e => {
                if (!this.state.isHandlerDragging) {
                  return false
                }
                //Get offset
                let containerOffsetLeft = this.workspaceRef.current.offsetLeft

                //Get x-coord of pointer relative to container
                let pointerRelativeXpos = e.clientX - containerOffsetLeft

                //set min width
                const whiteboardMinWidth = 60

                this.whiteboardRef.current.style.width =
                  Math.max(whiteboardMinWidth, pointerRelativeXpos - 8) + 'px'
                this.whiteboardRef.current.style.flexGrow = 0
                this.setState({
                  width: Math.max(whiteboardMinWidth, pointerRelativeXpos - 80)
                })
              }}
              onMouseUp={() => {
                this.setState({
                  isHandlerDragging: false
                })
              }}
            >
              <div
                ref={this.whiteboardRef}
                id="whiteboard-slider-div"
                className="side"
              >
                <Whiteboard
                  projectId={this.props.projectId}
                  name={this.props.name}
                  whiteboardData={this.props.whiteboardData}
                  getLine={this.props.getLine}
                  getCirc={this.props.getCirc}
                  getRect={this.props.getRect}
                  getUpdatedShapes={this.props.getUpdatedShapes}
                  width={this.state.width}
                />
              </div>
              <div
                id="drag-handler"
                onMouseDown={() => {
                  this.setState({isHandlerDragging: true})
                }}
              />
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
          <CircularProgress />
        )}
        <>
          <Chatbox />
        </>
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
    getLine: (points, color) => dispatch(getLine(points, color)),
    getRect: rect => dispatch(getRect(rect)),
    getCirc: circ => dispatch(getCirc(circ)),
    reloadSavedBoard: projectId => dispatch(reloadSavedBoard(projectId)),
    saveBoard: (projectId, whiteboardData, codeEditorData, name) =>
      dispatch(saveBoard(projectId, whiteboardData, codeEditorData, name)),
    setNewBoard: () => dispatch(setNewBoard()),
    getCode: str => dispatch(getCode(str)),
    getName: str => dispatch(getName(str)),
    getUpdatedShapes: shapes => dispatch(getUpdatedShapes(shapes))
  }
}

export default connect(mapState, mapDispatch)(Project)
