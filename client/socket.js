import io from 'socket.io-client'
import {getLine, getCode} from './store/canvasData'
import store from './store/index'
import {line_events} from './components/line'
import {getMessage} from './store/chatStore'

const socket = io(window.location.origin)
//const drawingName = window.location.origin
socket.on('connect', () => {
  console.log('I am now connected to the server!')
})

line_events.on('new-line', (points, color) => {
  let id = store.getState().canvasData.projectId
  socket.emit('new-line-from-client', points, color, id)
})

socket.on('new-line-from-server', (points, color) => {
  store.dispatch(getLine(points, color))
})

// line_events.on('new-code', (codeEditorData) => {
//   let id = store.getState().canvasData.projectId
//   socket.emit('new-code-from-client', codeEditorData, id)
// })

socket.on('new-code-from-server', codeEditorData => {
  store.dispatch(getCode(codeEditorData))
})

socket.on('message-from-server', message => {
  store.dispatch(getMessage(message))
})

// clientSocket.on('connect', () => {
//   console.log('Connected to server!')
//   clientSocket.emit('join-drawing', drawingName)
// })

// clientSocket.on('replay-drawing', (instructions) => {
//   instructions.forEach((instruction) => Line(...instruction, false))
// })

// clientSocket.on('draw-from-server', (stage, layer, mode) => {
//   draw(stage, layer, mode, false)
// })

// Line.on('draw', (stage, layer, mode) => {
//   clientSocket.emit('draw-from-client', drawingName, stage, layer, mode)
// })

// socket.on('connect', () => {
//   console.log('Connected!')
// })

export default socket
