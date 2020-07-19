import React from 'react'
import {Text, Transformer} from 'react-konva'
import shape from '@material-ui/core/styles/shape'

const Txt = ({shapeProps, isSelected, onSelect, onTextEdit, onChange}) => {
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
      <Text
        onClick={() => {
          if (!isSelected) {
            onSelect()
          } else {
            onTextEdit(shapeRef, trRef)
          }
        }}
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

export default Txt
