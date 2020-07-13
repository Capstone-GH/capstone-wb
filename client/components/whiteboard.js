import React, {useEffect} from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {Redraw} from './redrawutils'
import WhiteboardToolbar from './toolbar'
// import {Container, Row, Col} from 'react-bootstrap'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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
      <WhiteboardToolbar drawLine={drawLine} />
      <Stage
        // width={window.innerWidth}
        // height={window.innerHeight}
        height={stageHeight}
        width={stageWidth}
        ref={stageEl}
      >
        <Layer ref={layerEl} />
      </Stage>
    </div>
  )
}
