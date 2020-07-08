import axios from 'axios'

//default state
let defaultState = {
  projectId: null,
  linePoints: []
}

//action type
export const GET_LINE = 'GET_LINE'
const SET_PROJECTID = 'SET_PROJECTID'
//action creator
export const getLine = points => ({
  type: GET_LINE,
  points
})

export const setId = projectId => ({
  type: SET_PROJECTID,
  projectId
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
    default:
      return state
  }
}
