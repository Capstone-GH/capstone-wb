import React from 'react'
import {Line} from 'react-konva'

const Lin = ({shapeProps, isSelected, onSelect}) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  return (
    <React.Fragment>
      <Line
        onClick={onSelect}
        ref={shapeRef}
        stroke={shapeProps.color}
        strokeWidth={5}
        points={shapeProps.points}
        globalCompositeOperation={shapeProps.globalCompositeOperation}
        strokeWidth={shapeProps.strokeWidth}
      />
    </React.Fragment>
  )
}

export default Lin
