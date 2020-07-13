//action type
export const GET_MESSAGE = 'GET_MESSAGE'

//action creator
export const getMessage = message => ({
  type: GET_MESSAGE,
  message
})

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_MESSAGE:
      return [...state, action.message]
    default:
      return state
  }
}
