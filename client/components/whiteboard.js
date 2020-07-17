import React, {useEffect, useState} from 'react'
import {Line} from './line'
import {Stage, Layer, Text} from 'react-konva'
import {Redraw} from './redrawutils'
import WhiteboardToolbar from './toolbar'
import {makeStyles} from '@material-ui/core/styles'
import Circle from './shapes/circle'
import Rectangle from './shapes/rectangle'
import Lin from './shapes/line'
import Txt from './shapes/text'
import socket from '../socket'
import {addTextNode} from './textNode'
import {Tooltip} from '@material-ui/core'
const {v4: uuidv4} = require('uuid')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function Whiteboard(props) {
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  const classes = useStyles()
  const [circles, setCircles] = useState([])
  const [texts, setTexts] = useState([])
  const [shapes, setShapes] = useState([])
  const [selectedId, selectShape] = useState(null)
  const [rectangles, setRectangles] = useState([])

  const {
    getLine,
    getCirc,
    getText,
    getRect,
    whiteboardData,
    getUpdatedShapes,
    width,
    projectId
  } = props

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      id: `rect${rectangles.length + 1}`,
      stroke: 'black'
    }
    getRect(rect)
    socket.emit('new-rect-from-client', rect, projectId)
    const rects = rectangles.concat([rect])
    setRectangles(rects)
    const shs = shapes.concat([`rect${rectangles.length + 1}`])
    setShapes(shs)
  }

  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      id: `circ${circles.length + 1}`,
      stroke: 'black'
    }
    getCirc(circ)
    socket.emit('new-circ-from-client', circ, projectId)
    const circs = circles.concat([circ])
    setCircles(circs)
    const shs = shapes.concat([`circ${circles.length + 1}`])
    setShapes(shs)
  }

  const drawText = () => {
    const id = uuidv4()
    const text = {
      text: 'Type here',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
      id: id
    }
    getText(text)
    socket.emit('new-text-from-client', text, projectId)
    const txts = texts.concat([text])
    setTexts(txts)
    const shs = shapes.concat([id])
    setShapes(shs)
  }

  const drawLine = (color = 'black') => {
    Line(stageEl.current.getStage(), layerEl.current, color)
  }

  const erase = () => {
    console.log('erasing')
    Line(stageEl.current.getStage(), layerEl.current, 'white', 'eraser')
  }

  const redrawLine = () => {
    Redraw(layerEl.current)
  }

  const clearBoard = () => {
    layerEl.current.destroyChildren()
  }

  useEffect(
    () => {
      fitStageIntoParentContainer()
    },
    [width]
  )

  let stageWidth = 1000
  let stageHeight = 1000

  function fitStageIntoParentContainer() {
    const stage = stageEl.current.getStage()

    // now we need to fit stage into parent
    let containerWidth = width

    // to do this we need to scale the stage
    const scale = containerWidth / stageWidth

    stage.width(stageWidth * scale)
    stage.draw()
  }

  return (
    <div id="whiteboard-container">
      <WhiteboardToolbar
        drawLine={drawLine}
        circle={addCircle}
        rectangle={addRectangle}
        erase={erase}
        drawText={drawText}
      />
      <Stage height={stageHeight} width={stageWidth} ref={stageEl}>
        <Layer ref={layerEl}>
          {whiteboardData.map((shape, i) => {
            switch (shape.type) {
              case 'circ':
                return (
                  <Circle
                    key={i}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      selectShape(shape.id)
                    }}
                    onChange={newAttrs => {
                      const shapesArr = whiteboardData.slice()
                      shapesArr[i] = newAttrs
                      setShapes(shapesArr)
                      getUpdatedShapes(shapesArr)
                      socket.emit(
                        'new-updateShape-from-client',
                        shapesArr,
                        projectId
                      )
                    }}
                  />
                )
              case 'rect':
                return (
                  <Rectangle
                    key={i}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      selectShape(shape.id)
                    }}
                    onChange={newAttrs => {
                      const shapesArr = whiteboardData.slice()
                      shapesArr[i] = newAttrs
                      setShapes(shapesArr)
                      getUpdatedShapes(shapesArr)
                      socket.emit(
                        'new-updateShape-from-client',
                        shapesArr,
                        projectId
                      )
                    }}
                  />
                )
              case 'text':
                return (
                  <Txt
                    key={i}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      selectShape(shape.id)
                    }}
                    onChange={newAttrs => {
                      const shapesArr = whiteboardData.slice()
                      shapesArr[i] = newAttrs
                      setShapes(shapesArr)
                      getUpdatedShapes(shapesArr)
                      socket.emit(
                        'new-updateShape-from-client',
                        shapesArr,
                        projectId
                      )
                    }}
                    onTextEdit={(txtRef, transformerRef) => {
                      txtRef.current.hide()
                      transformerRef.current.hide()
                      txtRef.current.parent.draw()
                      let textPosition = txtRef.current.absolutePosition()
                      let stageBox = txtRef.current.parent.parent
                        .container()
                        .getBoundingClientRect()
                      let areaPosition = {
                        x: stageBox.left + textPosition.x,
                        y: stageBox.top + textPosition.y
                      }
                      let textarea = document.createElement('textarea')
                      document.body.appendChild(textarea)
                      textarea.value = txtRef.current.text()
                      textarea.style.position = 'absolute'
                      textarea.style.top = areaPosition.y + 'px'
                      textarea.style.left = areaPosition.x + 'px'
                      textarea.style.width =
                        txtRef.current.width() -
                        txtRef.current.padding() * 2 +
                        'px'
                      textarea.style.height =
                        txtRef.current.height() -
                        txtRef.current.padding() * 2 +
                        5 +
                        'px'
                      textarea.style.fontSize = txtRef.current.fontSize() + 'px'
                      textarea.style.border = 'none'
                      textarea.style.padding = '0px'
                      textarea.style.margin = '0px'
                      textarea.style.overflow = 'hidden'
                      textarea.style.background = 'none'
                      textarea.style.outline = 'none'
                      textarea.style.resize = 'none'
                      textarea.style.lineHeight = txtRef.current.lineHeight()
                      textarea.style.fontFamily = txtRef.current.fontFamily()
                      textarea.style.transformOrigin = 'left top'
                      textarea.style.textAlign = txtRef.current.align()
                      textarea.style.color = txtRef.current.fill()
                      let rotation = txtRef.current.rotation()
                      let transform = ''
                      if (rotation) {
                        transform += 'rotateZ(' + rotation + 'deg)'
                      }
                      let px = 0
                      transform += 'translateY(-' + px + 'px)'
                      textarea.style.transform = transform
                      textarea.style.height = 'auto'
                      textarea.style.height = textarea.scrollHeight + 3 + 'px'
                      textarea.focus()
                      function removeTextarea() {
                        textarea.parentNode.removeChild(textarea)
                        window.removeEventListener('click', handleOutsideClick)
                        txtRef.current.show()
                        transformerRef.current.show()
                        transformerRef.current.forceUpdate()
                        txtRef.current.parent.parent.draw()
                      }
                      function setTextareaWidth(newWidth) {
                        if (!newWidth) {
                          // set width for placeholder
                          newWidth =
                            txtRef.current.placeholder.length *
                            textNode.fontSize()
                        }
                        textarea.style.width = newWidth + 'px'
                      }

                      textarea.addEventListener('keydown', function(e) {
                        // hide on enter
                        // but don't hide on shift + enter
                        if (e.keyCode === 13 && !e.shiftKey) {
                          console.log(textarea.value)
                          txtRef.current.text(textarea.value)
                          const shapesArr = whiteboardData.slice()
                          shapesArr[i] = {...shapesArr[i], text: textarea.value}
                          setShapes(shapesArr)
                          getUpdatedShapes(shapesArr)
                          socket.emit(
                            'new-updateShape-from-client',
                            shapesArr,
                            projectId
                          )
                          removeTextarea()
                        }
                        // on esc do not set value back to node
                        if (e.keyCode === 27) {
                          removeTextarea()
                        }
                      })
                      function handleOutsideClick(e) {
                        if (e.target !== textarea) {
                          txtRef.current.text(textarea.value)
                          const shapesArr = whiteboardData.slice()
                          shapesArr[i] = {...shapesArr[i], text: textarea.value}
                          setShapes(shapesArr)
                          getUpdatedShapes(shapesArr)
                          socket.emit(
                            'new-updateShape-from-client',
                            shapesArr,
                            projectId
                          )
                          removeTextarea()
                        }
                      }
                      setTimeout(() => {
                        window.addEventListener('click', handleOutsideClick)
                      })
                    }}
                  />
                )
              case 'line':
                return (
                  <Lin
                    key={i}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      selectShape(shape.id)
                    }}
                    onChange={newAttrs => {
                      const shapesArr = whiteboardData.slice()
                      shapesArr[i] = newAttrs
                      setShapes(shapesArr)
                      getUpdatedShapes(shapesArr)
                      socket.emit(
                        'new-updateShape-from-client',
                        shapesArr,
                        projectId
                      )
                    }}
                  />
                )
              default:
                console.log('N/A')
            }
          })}
        </Layer>
      </Stage>
    </div>
  )
}
