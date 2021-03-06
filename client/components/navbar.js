import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import Link from '@material-ui/core/Link'
import LandingPage from './landingPage'
import {Link} from 'react-router-dom'

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
          <Link to="/project">
            <img src="/s1.png" />
          </Link>
          {isLoggedIn ? (
            <React.Fragment>
              <Typography className={classes.root} variant="h6">
                <Link to="/home">
                  <Button color="secondary">Home</Button>
                </Link>
                <Link to="/project">
                  <Button color="secondary">Project Workspace</Button>
                </Link>
                <Link to="/myprojects">
                  <Button color="secondary">My Projects</Button>
                </Link>
                <Button color="secondary">
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </Button>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Link href="/landing" color='secondary'>
                <Button>Landing Page</Button>
              </Link> */}
              <Link to="/project">
                <Button color="secondary">Project Workspace</Button>
              </Link>
              <Link to="/login">
                <Button color="secondary">Login</Button>
              </Link>
              <Link to="/signup">
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
