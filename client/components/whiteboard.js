import React from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {connect} from 'react-redux'
import {getLine, saveBoard} from '../store/canvasData'
import {Redraw} from './redrawutils'

function Whiteboard(props) {
  const stageEl = React.createRef()
  const layerEl = React.createRef()

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
    saveBoard: (projectId, linePoints) =>
      dispatch(saveBoard(projectId, linePoints))
  }
}

export default connect(mapState, mapDispatch)(Whiteboard)
