import Konva from 'konva'
import store from '../store/index'
import {Line} from './line'

export const Redraw = (layer, mode = 'brush') => {
  let allLines = store.getState().linePoints
  console.log(allLines)

  allLines.forEach(line => {
    let newLine = new Konva.Line({
      stroke: mode === 'brush' ? 'yellow' : 'white',
      strokeWidth: mode === 'brush' ? 5 : 20,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: line
    })
    layer.add(newLine)
  })
  layer.batchDraw()
}
