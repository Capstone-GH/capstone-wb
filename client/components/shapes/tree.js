import React from 'react'
import {Rect, Transformer} from 'react-konva'

const Tree = ({shapeProps, isSelected, onSelect, onChange}) => {
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
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY
          })
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  )
}

export default Tree
