import io from 'socket.io-client'
import {getLine} from './store/canvasData'
import store from './store/index'
import {line_events} from './components/line'

const socket = io(window.location.origin)
//const drawingName = window.location.origin
socket.on('connect', () => {
  console.log('I am now connected to the server!')
})

line_events.on('new-line', points => {
  let id = store.getState().canvasData.projectId
  socket.emit('new-line-from-client', points, id)
})

socket.on('new-line-from-server', points => {
  store.dispatch(getLine(points))
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
