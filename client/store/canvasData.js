import axios from 'axios'

//default state
let defaultState = {
  projectId: null,
  linePoints: []
}

//action type
export const GET_LINE = 'GET_LINE'
const SET_PROJECTID = 'SET_PROJECTID'
const SET_RELOADEDBOARD = 'SET_RELOADEDBOARD'
//action creator
export const getLine = points => ({
  type: GET_LINE,
  points
})

export const setId = projectId => ({
  type: SET_PROJECTID,
  projectId
})

export const setReloadedBoard = (projectId, whiteboardData, name) => ({
  type: SET_RELOADEDBOARD,
  projectId,
  whiteboardData,
  name
})

export const saveBoard = (projectId, linePoints) => {
  if (projectId) {
    return async dispatch => {
      try {
        const {data} = await axios.put(`/api/projects/${projectId}`, {
          linePoints: linePoints
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
        dispatch(setId(data._id))
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
      dispatch(setReloadedBoard(data._id, data.whiteboardData, data.name))
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
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_LINE:
      return {
        ...state,
        linePoints: [...state.linePoints, action.points]
      }
    case SET_PROJECTID:
      return {
        ...state,
        projectId: action.projectId
      }
    case SET_RELOADEDBOARD:
      return {
        projectId: action.projectId,
        linePoints: action.whiteboardData,
        name: action.name
      }
    default:
      return state
  }
}
