//action type
const SET_TOOL = 'SET_TOOL'

//action creator
export const setActiveTool = tool => ({
  type: SET_TOOL,
  tool
})

export default function(state = {}, action) {
  switch (action.type) {
    case SET_TOOL:
      return {activeTool: action.tool}
    default:
      return state
  }
}
