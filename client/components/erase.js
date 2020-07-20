import Konva from 'konva'
import store from '../store/index'
import {getLine} from '../store/canvasData'
import {EventEmitter} from 'events'
export const erase_events = new EventEmitter()

export const Erase = (stage, layer, color = 'white', mode = 'brush') => {
  let isPaint = false
  let lastLine

  stage.on('mousedown touchstart', function() {
    let activeTool = store.getState().toolbar.activeTool
    if (activeTool === 'eraser') {
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
    } else {
      stage.off('mousedown')
      stage.off('mouseup')
      stage.off('mousemove')
      stage.off('touchstart')
      stage.off('touchend')
      stage.off('touchmove')
    }
  })

  stage.on('mouseup touchend', function() {
    isPaint = false

    let activeTool = store.getState().toolbar.activeTool
    if (activeTool === 'eraser') {
      const lineData = {
        points: lastLine.attrs.points,
        color: lastLine.attrs.stroke,
        globalCompositeOperation: lastLine.attrs.globalCompositeOperation,
        strokeWidth: lastLine.attrs.strokeWidth
      }
      store.dispatch(getLine(lineData))
      erase_events.emit('new-erase', lineData)
    }
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
