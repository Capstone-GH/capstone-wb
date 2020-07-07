//action type
export const GET_LINE = 'GET_LINE'
//action creator
export const getLine = points => ({
  type: GET_LINE,
  points
})
//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_LINE:
      return [...state, action.points]
    default:
      return state
  }
}
