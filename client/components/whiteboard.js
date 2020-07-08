import React from 'react'
import {Line} from './line'
import {Stage, Layer} from 'react-konva'
import {connect} from 'react-redux'
import {getLine} from '../store/linePoints'
import {Redraw} from './redrawutils'

function Whiteboard(props) {
  const stageEl = React.createRef()
  const layerEl = React.createRef()

  const drawLine = () => {
    let points = Line(stageEl.current.getStage(), layerEl.current)
    console.log(points)
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
      <button type="submit" onClick={() => console.log(props.linePoints)}>
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
    linePoints: state.linePoints
  }
}

const mapDispatch = dispatch => {
  return {
    getLine: points => dispatch(getLine(points))
  }
}

export default connect(mapState, mapDispatch)(Whiteboard)
