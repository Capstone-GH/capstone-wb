import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {loginAndSave} from '../store/user'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
/**
 * COMPONENT
 */

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export function Login(props) {
  const classes = useStyles()
  let source = 'default'
  if (props.source) {
    source = props.source
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          name="login"
          onSubmit={e => {
            if (source === 'saveLoginModal') {
              console.log(props)
              props.handleSubmitAndSave(
                e,
                props.whiteboardData,
                props.codeEditorData,
                props.projectName
              )

              props.closeLoginModal()
            } else {
              props.handleSubmit(e, source)
            }
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {source === 'saveLoginModal' ? (
            <Button
              type="button"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => props.closeLoginModal()}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
          <Grid container justify="flex-end">
            <Grid item>
              {source === 'saveLoginModal' ? (
                <Button onClick={() => props.toggleFormType()}>
                  Don't have an account? Sign Up
                </Button>
              ) : (
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit: (evt, source) => {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, source))
    },
    handleSubmitAndSave: (evt, whiteboardData, CodeEditorData, projectName) => {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(
        loginAndSave(
          email,
          password,
          formName,
          whiteboardData,
          CodeEditorData,
          projectName
        )
      )
    }
  }
}

export default connect(mapLogin, mapDispatch)(Login)
