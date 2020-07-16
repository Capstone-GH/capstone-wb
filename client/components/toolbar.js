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
import {set} from 'mongoose'

export default function WhiteboardToolbar(props) {
  const [selected, setSelected] = React.useState('')
  const [penColor, setPenColor] = React.useState('black')
  const [open, setOpen] = React.useState(false)
  const [menuAnchor, setMenuAnchor] = React.useState(null)

  const {drawLine, circle, rectangle} = props

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
          <ListItem className="tool-item">
            <IconButton
              className="tool-button"
              aria-label="pen"
              onClick={() => {
                drawLine(penColor)
                setSelected('pen')
                handleMenuClose()
              }}
              onContextMenu={e => {
                setSelected('pen')
                setMenuAnchor(e.currentTarget)
                handleMenuOpen(e)
              }}
            >
              {selected === 'pen' ? (
                <CreateIcon style={{color: penColor}} />
              ) : (
                <CreateIcon />
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
            <IconButton onClick={() => console.log('erase')}>
              <ClearIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  )
}
