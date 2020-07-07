import Konva from 'konva'
import store from '../store/index'
import {getLine} from '../store/linePoints'

export const Line = (stage, layer, mode = 'brush') => {
  let isPaint = false
  let lastLine

  stage.on('mousedown touchstart', function(e) {
    isPaint = true
    let pos = stage.getPointerPosition()
    lastLine = new Konva.Line({
      stroke: mode === 'brush' ? 'blue' : 'white',
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
    store.dispatch(getLine(lastLine.attrs.points))
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
