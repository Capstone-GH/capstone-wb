import axios from 'axios'

//action type
export const GET_LINE = 'GET_LINE'
//action creator
export const getLine = points => ({
  type: GET_LINE,
  points
})
//thunk
export const getLinePoints = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products')
      dispatch(getLine(data))
    } catch (error) {
      console.log('Error', error)
    }
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_LINE:
      return [...state, action.points]
    default:
      return state
  }
}
