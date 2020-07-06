import React from 'react'
import {Stage, Layer, Circle} from 'react-konva'

export default function Whiteboard() {
  const handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    })
  }
  const handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    })
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={100}
          y={100}
          width={100}
          height={100}
          fill="yellow"
          shadowBlur={5}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </Layer>
    </Stage>
  )
}
