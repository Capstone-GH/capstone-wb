import React, {useEffect, useState} from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {Redraw} from './redrawutils'
import WhiteboardToolbar from './toolbar'
import {makeStyles} from '@material-ui/core/styles'
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
  const containerEl = React.createRef()
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
      id: `rect${rectangles.length + 1}`,
      stroke: 'black'
    }
    props.getRect(rect)
    // const rects = rectangles.concat([rect])
    // setRectangles(rects)
    // const shs = shapes.concat([`rect${rectangles.length + 1}`])
    // setShapes(shs)
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
    const circs = circles.concat([circ])
    setCircles(circs)
    const shs = shapes.concat([`circ${circles.length + 1}`])
    setShapes(shs)
  }

  const drawLine = (color = 'black') => {
    Line(stageEl.current.getStage(), layerEl.current, color)
  }

  const redrawLine = () => {
    Redraw(layerEl.current, selectedId, selectShape)
  }

  const clearBoard = () => {
    layerEl.current.destroyChildren()
  }

  useEffect(
    () => {
      fitStageIntoParentContainer()
      console.log('fitting stage')
    },
    [width]
  )

  let stageWidth = 700
  let stageHeight = 700

  function fitStageIntoParentContainer() {
    const stage = stageEl.current.getStage()
    var container = containerEl.current

    // now we need to fit stage into parent
    var containerWidth = width
    // var containerHeight = container.offsetHeight
    // to do this we need to scale the stage
    var scale = containerWidth / stageWidth
    // var heightScale = containerHeight / stageHeight

    stage.width(stageWidth * scale)
    stage.height(stageHeight * scale)
    stage.scale({x: scale, y: scale})
    stage.draw()
  }

  return (
    <div id="whiteboard-container" ref={containerEl}>
      <WhiteboardToolbar
        drawLine={drawLine}
        circle={addCircle}
        rectangle={addRectangle}
      />
      <Stage height={stageHeight} width={stageWidth} ref={stageEl}>
        <Layer ref={layerEl} />
      </Stage>
    </div>
  )
}
