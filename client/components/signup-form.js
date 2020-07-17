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
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CodeEditor from './codeEditor'

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export function SignUp(props) {
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          name="signup"
          onSubmit={e => {
            if (source === 'saveLoginModal') {
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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
                  Already have an account? Sign In
                </Button>
              ) : (
                <Link href="/login" variant="body2">
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

export default connect(null, mapDispatch)(SignUp)
