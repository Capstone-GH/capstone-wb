import Konva from 'konva'
import store from '../store/index'
import {Line} from './line'

export const Redraw = (layer, mode = 'brush') => {
  let allCanvasData = store.getState().canvasData.whiteboardData || []
  console.log(allCanvasData)

  let allLines = allCanvasData.filter(data => data.type === 'line')
  console.log(allLines)

  allLines.forEach(line => {
    let newLine = new Konva.Line({
      stroke: line.color,
      strokeWidth: mode === 'brush' ? 5 : 20,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: line.points
    })
    layer.add(newLine)
  })
  layer.batchDraw()
}
