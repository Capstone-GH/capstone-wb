import React, {useEffect, useState} from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {Redraw} from './redrawutils'
import WhiteboardToolbar from './toolbar'
// import {Container, Row, Col} from 'react-bootstrap'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Circle from './shapes/circle'
import Rectangle from './shapes/rectangle'
import Lin from './shapes/line'

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
  const [shapes, setShapes] = useState([])
  const [selectedId, selectShape] = useState(null)
  const [rectangles, setRectangles] = useState([])
  const {
    getLine,
    getCirc,
    getRect,
    whiteboardData,
    getUpdatedShapes,
    width
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
      // fill: "red",
      id: `rect${rectangles.length + 1}`,
      stroke: 'black'
    }
    getRect(rect)
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
      // fill: "red",
      id: `circ${circles.length + 1}`,
      stroke: 'black'
    }
    getCirc(circ)
    const circs = circles.concat([circ])
    setCircles(circs)
    const shs = shapes.concat([`circ${circles.length + 1}`])
    setShapes(shs)

    console.log(circ)
  }

  const drawLine = (color = 'black') => {
    console.log('drawing')
    Line(stageEl.current.getStage(), layerEl.current, color)
  }

  const redrawLine = () => {
    console.log('redraw')
    Redraw(layerEl.current)
  }

  const clearBoard = () => {
    console.log('clearboard')
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

  console.log('rendering whiteboard', props)

  return (
    <div id="whiteboard-container">
      <WhiteboardToolbar
        drawLine={drawLine}
        circle={addCircle}
        rectangle={addRectangle}
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
