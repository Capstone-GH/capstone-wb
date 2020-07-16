import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Navigation = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#e1f5fe'}}>
        <Toolbar>
          <Link href="/project">
            <img src="s1.png" />
          </Link>{' '}
          {/* <img src={require('../../public/s1.png')} /> */}
          {isLoggedIn ? (
            <React.Fragment>
              <Typography className={classes.root} variant="h6">
                <Link href="/home">
                  <Button color="secondary">Home</Button>
                </Link>
                <Link href="/project">
                  <Button color="secondary">Project Workspace</Button>
                </Link>
                <Link href="/myprojects">
                  <Button color="secondary">My Projects</Button>
                </Link>
                <Button color="secondary">
                  <a href="#" onClick={handleClick}>
                    Logout{' '}
                  </a>
                </Button>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link href="/project">
                <Button color="secondary">Project Workspace</Button>
              </Link>

              <Link href="/login">
                <Button color="secondary">Login</Button>
              </Link>
              <Link href="/signup">
                <Button color="secondary">Sign Up</Button>
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user._id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
Navigation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
