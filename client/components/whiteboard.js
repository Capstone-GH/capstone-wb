import React, {useEffect} from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {connect} from 'react-redux'
import {getLine, saveBoard, reloadSavedBoard} from '../store/canvasData'
import {Redraw} from './redrawutils'

function Whiteboard(props) {
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  console.log(props.match.params.id)
  useEffect(() => {
    async function fetchData() {
      if (props.match.params.id) {
        await props.reloadSavedBoard(props.match.params.id)
        redrawLine()
      }
    }
    fetchData()
  }, [])
  const drawLine = () => {
    Line(stageEl.current.getStage(), layerEl.current)
  }

  const redrawLine = () => {
    Redraw(layerEl.current)
  }

  return (
    <div>
      <h1>Whiteboard</h1>
      <button type="button" onClick={drawLine}>
        Pen
      </button>
      <button type="button" onClick={redrawLine}>
        Redraw
      </button>
      <button
        type="submit"
        onClick={() => props.saveBoard(props.projectId, props.linePoints)}
      >
        Save
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageEl}
      >
        <Layer ref={layerEl} />
      </Stage>
    </div>
  )
}

const mapState = state => {
  return {
    linePoints: state.canvasData.linePoints,
    projectId: state.canvasData.projectId
  }
}

const mapDispatch = dispatch => {
  return {
    getLine: points => dispatch(getLine(points)),
    reloadSavedBoard: projectId => dispatch(reloadSavedBoard(projectId)),
    saveBoard: (projectId, linePoints) =>
      dispatch(saveBoard(projectId, linePoints))
  }
}

export default connect(mapState, mapDispatch)(Whiteboard)
