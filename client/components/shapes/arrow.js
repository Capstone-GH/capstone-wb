import React from 'react'
import {Arrow} from 'react-konva'

const Arrw = ({shapeProps, isSelected, onSelect, onChange}) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  return (
    <React.Fragment>
      <Arrow
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        pointerLength={20}
        pointerWidth={20}
        points={shapeProps.points}
        fill="black"
        stroke="black"
        strokeWidth={shapeProps.strokeWidth}
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          })
        }}
      />
    </React.Fragment>
  )
}

export default Arrw
