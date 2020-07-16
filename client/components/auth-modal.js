import React from 'react'
import Login from './login-form'
import Signup from './signup-form'

export default function AuthModal(props) {
  const {closeLoginModal} = props
  const [formType, setFormType] = React.useState('login')

  const toggleFormType = () => {
    formType === 'login' ? setFormType('signup') : setFormType('login')
  }

  return formType === 'login' ? (
    <Login
      toggleFormType={toggleFormType}
      source="modal"
      closeLoginModal={closeLoginModal}
      formType={formType}
    />
  ) : (
    <Signup
      toggleFormType={toggleFormType}
      source="modal"
      closeLoginModal={closeLoginModal}
      formType={formType}
    />
  )
}
