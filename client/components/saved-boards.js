import React from 'react'
import {connect} from 'react-redux'
import {fetchBoards} from '../store/user'
import {Link} from 'react-router-dom'

export class SavedBoards extends React.Component {
  componentDidMount() {
    this.props.fetchBoards()
  }

  render() {
    let {savedBoards} = this.props || []

    return savedBoards
      ? savedBoards.map(board => {
          return (
            <Link to={`/whiteboard/${board._id}`} key={board._id}>
              {board.name}
            </Link>
          )
        })
      : 'No saved boards'
  }
}

const mapState = state => {
  return {
    savedBoards: state.user.savedBoards
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards())
  }
}

export default connect(mapState, mapDispatch)(SavedBoards)
