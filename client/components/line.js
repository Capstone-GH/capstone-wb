import Konva from 'konva'
import store from '../store/index'
import {getLine} from '../store/canvasData'
import {EventEmitter} from 'events'
export const line_events = new EventEmitter()

export const Line = (stage, layer, color = 'black', mode = 'brush') => {
  let isPaint = false
  let lastLine

  stage.on('mousedown touchstart', function() {
    isPaint = true
    let pos = stage.getPointerPosition()
    lastLine = new Konva.Line({
      stroke: color,
      strokeWidth: mode === 'brush' ? 5 : 20,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y]
    })
    layer.add(lastLine)
  })
  stage.on('mouseup touchend', function() {
    isPaint = false
    console.log(lastLine.attrs)
    console.log(lastLine)
    console.log(typeof lastLine.attrs)
    store.dispatch(getLine(lastLine.attrs.points, lastLine.attrs.stroke))
    line_events.emit('new-line', lastLine.attrs.points, lastLine.attrs.stroke)
  })
  stage.on('mousemove touchmove', function() {
    if (!isPaint) {
      return
    }
    const pos = stage.getPointerPosition()
    let newPoints = lastLine.points().concat([pos.x, pos.y])
    lastLine.points(newPoints)
    layer.batchDraw()
  })
}
