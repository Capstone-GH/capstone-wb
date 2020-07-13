import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function Navigation() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.root}>
            Scribby
            <Link href="/project" color="inherit">
              Link
            </Link>
            <Link href="/login" color="inherit">
              1
            </Link>
            <Link href="#" color="inherit">
              2
            </Link>
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

// const Navigation = ({handleClick, isLoggedIn}) => (
//   <div>
//     <Navbar collapseOnSelect expand="lg" bg="light" variant="pills">
//       <Navbar.Brand href="/project">
//         <img src="scribby1.png" />
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       <Navbar.Collapse id="responsive-navbar-nav">
//         {isLoggedIn ? (
//           <Nav className="mr-auto">
//             <Nav.Link href="/project">Project Space</Nav.Link>
//             <Nav.Link href="/myprojects">My Projects</Nav.Link>

//             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>

//             <a href="#" onClick={handleClick}>
//               Logout{' '}
//             </a>
//           </Nav>
//         ) : (
//           <Nav>
//             <Nav.Link href="/project">Project Space</Nav.Link>
//             <Nav.Link href="/login">Log In</Nav.Link>
//             <Nav.Link href="/signup">Sign Up</Nav.Link>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   </div>
// )

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

//  <div>
//     <Navbar collapseOnSelect bg="light" expand="lg"  variant="light">
//       <Navbar.Brand href="#home">
//         <img src='logo_transparent.png'
//         width="10%"
//         height="10%"
//         className="d-inline-block align-top"/>
//       </Navbar.Brand>
//          <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
//         {isLoggedIn ? (
//       <Nav >
//             {/* The navbar will show these links after you log in */}
//             <Nav.Item >
//               <Nav.Link href="/home">Home</Nav.Link>
//             </Nav.Item>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//             <Nav.Item >
//               <Nav.Link href="/project">Project Workspace</Nav.Link>
//             </Nav.Item>
//             {/* <Link to="/project">Project Workspace</Link> */}
//             {/* <Link to="/whiteboard">Whiteboard</Link>
//             <Link to="/codeEditor">Code Editor</Link> */}
//              <Nav.Item >
//               <Nav.Link href="/myprojects">Projects</Nav.Link>
//             </Nav.Item>
//             {/* <Link to="/myprojects">My Projects</Link> */}
//        </Nav>
//         ) : (
//           <Nav>
//             {/* The navbar will show these links before you log in */}
//             <Nav.Item>
//               <Nav.Link href="/project">Project Workshop</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link href="/login">Login</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link href="/signup">Sign Up</Nav.Link>
//             </Nav.Item>

//             {/* <Link to="/project">Project Workspace</Link>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link> */}

//             {/* <Link to="/whiteboard">Whiteboard</Link>
//             <Link to="/codeEditor">Code Editor</Link> */}
//          </Nav>
//         )}
//       </Navbar>
//       <hr />
//   </div>
