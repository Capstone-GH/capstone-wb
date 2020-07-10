import axios from 'axios'
import socket from '../socket'

//default state
const defaultBoard = {
  linePoints: [],
  name: '',
  projectId: null,
  codeEditorData: ''
}

//action type
export const GET_LINE = 'GET_LINE'
export const GET_CODE = 'GET_CODE'
const SET_PROJECTID = 'SET_PROJECTID'
const SET_RELOADEDBOARD = 'SET_RELOADEDBOARD'
const SET_NEW_BOARD = 'SET_NEW_BOARD'

//action creator
export const getLine = points => ({
  type: GET_LINE,
  points
})

export const getCode = str => ({
  type: GET_CODE,
  str
})

export const setId = projectId => ({
  type: SET_PROJECTID,
  projectId
})

export const setReloadedBoard = (
  projectId,
  whiteboardData,
  name,
  codeEditorData
) => ({
  type: SET_RELOADEDBOARD,
  projectId,
  whiteboardData,
  name,
  codeEditorData
})

export const setNewBoard = () => ({
  type: SET_NEW_BOARD
})

export const saveBoard = (projectId, linePoints, codeEditorData) => {
  if (projectId) {
    return async dispatch => {
      try {
        const {data} = await axios.put(`/api/projects/${projectId}`, {
          linePoints: linePoints,
          codeEditorData: codeEditorData
        })
        console.log(data)
      } catch (error) {
        console.errror(error)
      }
    }
  } else {
    return async dispatch => {
      try {
        console.log(linePoints)
        const {data} = await axios.post('/api/projects', {
          linePoints: linePoints
        })
        console.log(data)
        dispatch(setId(data._id))
        // socket.emit('new-line', data._id)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export const reloadSavedBoard = projectId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/projects/${projectId}`)
      dispatch(
        setReloadedBoard(
          data._id,
          data.whiteboardData,
          data.name,
          data.codeEditorData
        )
      )
    } catch (error) {
      console.error(error)
    }
  }
}
//check if there is already a project id
//if there is, were going to send a put request

//if there is not, we're going to send a post request and create a new project

//when we create that new project, we should take its ID number and put that in the redux

//reducer
export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_LINE:
      return {
        ...state,
        linePoints: [...state.linePoints, action.points]
      }
    case GET_CODE:
      return {
        ...state,
        codeEditorData: action.str
      }
    case SET_PROJECTID:
      return {
        ...state,
        projectId: action.projectId
      }
    case SET_RELOADEDBOARD:
      return {
        ...state,
        projectId: action.projectId,
        linePoints: action.whiteboardData,
        name: action.name,
        codeEditorData: action.codeEditorData
      }
    case SET_NEW_BOARD:
      return {
        linePoints: [],
        name: '',
        projectId: null
      }
    default:
      return state
  }
}
