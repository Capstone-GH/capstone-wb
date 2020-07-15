import React from 'react'
import {Line} from 'react-konva'

const Lin = ({shapeProps, isSelected, onSelect}) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  React.useEffect(
    () => {
      if (isSelected) {
        trRef.current.setNode(shapeRef.current)
        trRef.current.getLayer().batchDraw()
      }
    },
    [isSelected]
  )
  return (
    <React.Fragment>
      <Line
        onClick={onSelect}
        ref={shapeRef}
        stroke={shapeProps.color}
        strokeWidth={5}
        points={shapeProps.points}
      />
    </React.Fragment>
  )
}

export default Lin