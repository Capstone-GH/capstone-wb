import React from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'

export default function Whiteboard() {
  const stageEl = React.createRef()
  const layerEl = React.createRef()

  const drawLine = () => {
    Line(stageEl.current.getStage(), layerEl.current)
  }

  return (
    <div>
      <h1>Whiteboard</h1>
      <button type="button" onClick={drawLine}>
        Pen
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageEl}
      >
        <Layer ref={layerEl} />
      </Stage>
    </div>
  )
}
