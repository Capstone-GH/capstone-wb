import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_USER_BOARDS = 'SET_USER_BOARDS'
const REMOVE_BOARD = 'REMOVE_BOARD'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const setUserBoards = boards => ({type: SET_USER_BOARDS, boards})

export const removeBoard = boardId => ({
  type: REMOVE_BOARD,
  boardId
})

/**
 * THUNK CREATORS
 */
export const fetchBoards = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/projects')
    dispatch(setUserBoards(data))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const deleteBoard = boardId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/projects/${boardId}`)
      dispatch(removeBoard(boardId))
    } catch (error) {
      console.log('Error deleting board', error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case SET_USER_BOARDS:
      return {...state, savedBoards: action.boards}
    case REMOVE_BOARD: {
      let filt = state.savedBoards.filter(board => board._id !== action.boardId)
      return {...state, savedBoards: filt}
    }
    default:
      return state
  }
}
