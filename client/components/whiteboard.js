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
      clearBoard()
      redrawLine()
      // fitStageIntoParentContainer()
    },
    [props.linePoints]
  )

  let stageWidth = 1000
  let stageHeight = 1000

  function fitStageIntoParentContainer() {
    const stage = stageEl.current.getStage()
    var container = document.querySelector('#whiteboard-container')

    // now we need to fit stage into parent
    var containerWidth = container.offsetWidth
    var containerHeight = container.offsetHeight
    // to do this we need to scale the stage
    var widthScale = containerWidth / stageWidth
    var heightScale = containerHeight / stageHeight

    stage.width(stageWidth * widthScale)
    stage.height(stageHeight * heightScale)
    stage.scale({x: widthScale, y: heightScale})
    stage.draw()
  }

  console.log('rendering whiteboard', props)

  return (
    <div id="whiteboard-container" className="side">
      <WhiteboardToolbar
        drawLine={drawLine}
        circle={addCircle}
        rectangle={addRectangle}
      />
      <Stage
        // width={window.innerWidth}
        // height={window.innerHeight}
        height={stageHeight}
        width={stageWidth}
        ref={stageEl}
      >
        <Layer ref={layerEl}>
          {circles.map((circle, i) => {
            return (
              <Circle
                key={i}
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                  selectShape(circle.id)
                }}
                onChange={newAttrs => {
                  const circs = circles.slice()
                  circs[i] = newAttrs
                  setCircles(circs)
                }}
              />
            )
          })}
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id)
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice()
                  rects[i] = newAttrs
                  setRectangles(rects)
                }}
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}
