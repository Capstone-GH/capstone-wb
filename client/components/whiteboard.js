import React, {useEffect} from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {connect} from 'react-redux'
import {
  getLine,
  saveBoard,
  reloadSavedBoard,
  setNewBoard
} from '../store/canvasData'
import {Redraw} from './redrawutils'

function Whiteboard(props) {
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  console.log(props.match.params.id)
  const drawLine = () => {
    Line(stageEl.current.getStage(), layerEl.current)
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
      async function fetchData() {
        await props.reloadSavedBoard(props.match.params.id)
      }
      if (props.match.params.id) {
        fetchData()
      } else {
        console.log('hello')
        // props.setNewBoard()
      }
    },
    [props.match.params.id]
  )

  useEffect(
    () => {
      clearBoard()
      redrawLine()
    },
    [props.projectId]
  )

  return (
    <div>
      <h1>Whiteboard: {props.name}</h1>
      <button type="button" onClick={drawLine}>
        Pen
      </button>
      <button type="button" onClick={redrawLine}>
        Redraw
      </button>
      <button
        type="submit"
        onClick={() =>
          props.saveBoard(
            props.projectId,
            props.linePoints,
            props.codeEditorData
          )
        }
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
  console.log(state)
  return {
    linePoints: state.canvasData.linePoints,
    projectId: state.canvasData.projectId,
    name: state.canvasData.name,
    codeEditorData: state.canvasData.codeEditorData
  }
}

const mapDispatch = dispatch => {
  return {
    getLine: points => dispatch(getLine(points)),
    reloadSavedBoard: projectId => dispatch(reloadSavedBoard(projectId)),
    saveBoard: (projectId, linePoints, codeEditorData) =>
      dispatch(saveBoard(projectId, linePoints, codeEditorData)),
    setNewBoard: () => dispatch(setNewBoard())
  }
}

export default connect(mapState, mapDispatch)(Whiteboard)
