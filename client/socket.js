import io from 'socket.io-client'
import {
  getLine,
  getCode,
  getRect,
  getCirc,
  getUpdatedShapes
} from './store/canvasData'
import store from './store/index'
import {line_events} from './components/line'
import {getMessage} from './store/chatStore'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('I am now connected to the server!')
})

line_events.on('new-line', line => {
  let id = store.getState().canvasData.projectId
  socket.emit('new-line-from-client', line, id)
})

socket.on('new-line-from-server', line => {
  store.dispatch(getLine(line))
})

socket.on('new-code-from-server', codeEditorData => {
  store.dispatch(getCode(codeEditorData))
})

socket.on('message-from-server', message => {
  store.dispatch(getMessage(message))
})

socket.on('new-rect-from-server', rect => {
  store.dispatch(getRect(rect))
})

socket.on('new-circ-from-server', circ => {
  store.dispatch(getCirc(circ))
})

socket.on('new-updateShape-from-server', shapesArr => {
  store.dispatch(getUpdatedShapes(shapesArr))
})

export default socket
