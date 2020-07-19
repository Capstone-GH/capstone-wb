import React from 'react'
import {Rect, Transformer} from 'react-konva'
import store from '../../store/index'
const Rectangle = ({shapeProps, isSelected, onSelect, onChange}) => {
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

  let activeTool = store.getState().toolbar.activeTool

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={activeTool === 'rectangle' || activeTool === 'move'}
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

export default Rectangle
