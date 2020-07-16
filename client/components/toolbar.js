import React from 'react'
import clsx from 'clsx'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CreateIcon from '@material-ui/icons/Create'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ClearIcon from '@material-ui/icons/Clear'
import Crop169Icon from '@material-ui/icons/Crop169'

const drawerWidth = 250

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    position: 'static'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100%',
    position: 'static',
    justifyContent: 'flex-start'
  },
  paper: {
    height: '100%',
    position: 'static',
    justifyContent: 'flex-start'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: '100%',
    position: 'static',
    justifyContent: 'flex-start'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1
    },
    height: '100%',
    position: 'static',
    justifyContent: 'flex-start'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function WhiteboardToolbar(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [penColor, setPenColor] = React.useState('black')

  const {drawLine, circle, rectangle, erase} = props

  const handleDrawerOpen = e => {
    e.preventDefault()
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </div>
        <Divider />
        <div className={classes.toolbar}>
          <List>
            <ListItem className="tool-item">
              <IconButton
                className="tool-button"
                aria-label="pen"
                onClick={() => {
                  drawLine(penColor)
                  setSelected('pen')
                  handleDrawerClose()
                }}
                onContextMenu={handleDrawerOpen}
              >
                {selected === 'pen' ? (
                  <CreateIcon style={{color: penColor}} />
                ) : (
                  <CreateIcon />
                )}
              </IconButton>
              <ButtonGroup
                variant="text"
                aria-label="color select button group"
              >
                <Button
                  onClick={() => {
                    setPenColor('black')
                  }}
                >
                  Black
                </Button>
                <Button
                  onClick={() => {
                    setPenColor('red')
                  }}
                >
                  Red
                </Button>
                <Button
                  onClick={() => {
                    setPenColor('blue')
                  }}
                >
                  Blue
                </Button>
              </ButtonGroup>
            </ListItem>

            <ListItem className="tool-item">
              <IconButton onClick={() => circle()}>
                <RadioButtonUncheckedIcon />
              </IconButton>
            </ListItem>

            <ListItem className="tool-item">
              <IconButton onClick={() => rectangle()}>
                <Crop169Icon />
              </IconButton>
            </ListItem>

            <ListItem className="tool-item">
              <IconButton onClick={() => erase()}>
                <ClearIcon />
              </IconButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  )
}
