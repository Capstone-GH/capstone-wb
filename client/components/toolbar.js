import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import CreateIcon from '@material-ui/icons/Create'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ClearIcon from '@material-ui/icons/Clear'
import Crop169Icon from '@material-ui/icons/Crop169'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import store from '../store/index'
import {setActiveTool} from '../store/toolbar'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Tooltip from '@material-ui/core/Tooltip'

export default function WhiteboardToolbar(props) {
  const [selected, setSelected] = React.useState('')
  const [penColor, setPenColor] = React.useState('black')
  const [open, setOpen] = React.useState(false)
  const [menuAnchor, setMenuAnchor] = React.useState(null)

  const {drawLine, circle, rectangle, erase, arrow} = props

  const handleMenuOpen = e => {
    e.preventDefault()
    setOpen(true)
  }

  const handleMenuClose = () => {
    setOpen(false)
    setMenuAnchor(null)
  }

  return (
    <React.Fragment>
      <Drawer variant="permanent">
        <List>
          <Tooltip title="Right-Click for colors">
            <ListItem className="tool-item">
              <IconButton
                aria-label="Right-click"
                className="tool-button"
                aria-label="pen"
                onClick={() => {
                  setSelected('pen')
                  store.dispatch(setActiveTool('pen'))
                  drawLine(penColor)
                  handleMenuClose()
                }}
                onContextMenu={e => {
                  setSelected('pen')
                  store.dispatch(setActiveTool('pen'))
                  setMenuAnchor(e.currentTarget)
                  handleMenuOpen(e)
                }}
              >
                {selected === 'pen' ? (
                  <CreateIcon style={{color: penColor}} />
                ) : (
                  <CreateIcon style={{color: 'rgba(0, 0, 0, 0.54)'}} />
                )}
              </IconButton>
              <Menu
                keepMounted
                open={open && selected === 'pen'}
                onClose={handleMenuClose}
                anchorEl={menuAnchor}
              >
                <MenuItem
                  onClick={() => {
                    setPenColor('black')
                    handleMenuClose()
                    drawLine('black')
                  }}
                >
                  Black
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPenColor('red')
                    handleMenuClose()
                    drawLine('red')
                  }}
                >
                  Red
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPenColor('blue')
                    handleMenuClose()
                    drawLine('blue')
                  }}
                >
                  Blue
                </MenuItem>
              </Menu>
            </ListItem>
          </Tooltip>

          <ListItem className="tool-item">
            <IconButton
              onClick={() => {
                setSelected('circle')
                store.dispatch(setActiveTool('circle'))
                circle()
              }}
            >
              <RadioButtonUncheckedIcon />
            </IconButton>
          </ListItem>

          <ListItem className="tool-item">
            <IconButton
              onClick={() => {
                setSelected('rectangle')
                store.dispatch(setActiveTool('rectangle'))
                rectangle()
              }}
            >
              <Crop169Icon />
            </IconButton>
          </ListItem>

          <ListItem className="tool-item">
            <IconButton
              onClick={() => {
                // setSelected('rectangle')
                // store.dispatch(setActiveTool('rectangle'))
                arrow()
              }}
            >
              <ArrowRightAltIcon />
            </IconButton>
          </ListItem>

          <Tooltip title="Erase">
            <ListItem className="tool-item">
              <IconButton
                aria-label="Erase"
                onClick={() => {
                  setSelected('eraser')
                  store.dispatch(setActiveTool('eraser'))
                  erase()
                }}
              >
                <ClearIcon />
              </IconButton>
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    </React.Fragment>
  )
}
