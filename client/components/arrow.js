import Konva from 'konva'
import store from '../store'
import {getArrow} from '../store/canvasData'
import {EventEmitter} from 'events'
export const arrow_emits = new EventEmitter()

export const Arr = (stage, layer) => {
  let isPaint = false
  let arrow

  stage.on('contentMousedown', function() {
    let activeTool = store.getState().toolbar.activeTool
    if (activeTool === 'arrow') {
      isPaint = true
      let pos = stage.getPointerPosition()
      arrow = new Konva.Arrow({
        points: [pos.x, pos.y, pos.x, pos.y],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
      })
      layer.add(arrow)
    }
  })

  stage.on('contentMouseup', function() {
    isPaint = false

    let activeTool = store.getState().toolbar.activeTool
    if (activeTool === 'arrow') {
      const arrData = {
        points: arrow.attrs.points
      }
      store.dispatch(getArrow(arrData))
      arrow_emits.emit('new-arrow', arrData)
    }
  })

  stage.on('contentMousemove', function() {
    if (!isPaint) {
      return
    }

    let pos = stage.getPointerPosition()
    let oldPoints = arrow.points()
    arrow.points([oldPoints[0], oldPoints[1], pos.x, pos.y])
    layer.batchDraw()
  })
}
