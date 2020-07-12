import React from 'react'
import {connect} from 'react-redux'
import {fetchBoards} from '../store/user'
import {Link} from 'react-router-dom'
import {Card, Button, CardColumns} from 'react-bootstrap'

export class SavedBoards extends React.Component {
  componentDidMount() {
    this.props.fetchBoards()
  }

  render() {
    let {savedBoards} = this.props || []

    return (
      <div className="container py-5">
        <h1>My Boards</h1>
        <CardColumns>
          {savedBoards && savedBoards.length
            ? savedBoards.map(board => {
                return (
                  <Card
                    style={{width: '18rem'}}
                    key="boardId"
                    className="bg-light text-black"
                    border="info"
                  >
                    <Card.Img src="scrib.png" alt="Card image" />
                    <Card.Title>{board.name}</Card.Title>
                    <Button variant="outline-danger">
                      {' '}
                      <Link to={`/project/${board._id}`} key={board._id}>
                        Let's go here
                      </Link>
                    </Button>
                  </Card>
                )
              })
            : 'No saved boards'}
        </CardColumns>
      </div>
    )
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
