import Konva from 'konva'
import store from '../store/index'
import {Line} from './line'
import Rectangle from './shapes/rectangle'
import React from 'react'
import {Rect, Stage, Layer} from 'react-konva'

export const Redraw = (layer, selectedId, selectShape, mode = 'brush') => {
  let allCanvasData = store.getState().canvasData.whiteboardData || []
  // let allLines = allCanvasData.filter(data => data.type === 'line')

  allCanvasData.forEach(shape => {
    switch (shape.type) {
      case 'line': {
        let newLine = new Konva.Line({
          stroke: shape.color,
          strokeWidth: mode === 'brush' ? 5 : 20,
          globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
          points: shape.points
        })
        layer.add(newLine)
        layer.batchDraw()
        break
      }
      case 'rect': {
        console.log('rect')
        let rect1 = new Konva.Rect({
          x: 20,
          y: 20,
          width: 100,
          height: 50,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true
        })
        layer.add(rect1)
        layer.batchDraw()
        break
      }
      default: {
        console.log('hello')
      }
    }
  })
}
