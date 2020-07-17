import React from 'react'
import Login from './login-form'
import Signup from './signup-form'

export default function AuthModal(props) {
  const {
    closeLoginModal,
    source,
    whiteboardData,
    codeEditorData,
    projectName
  } = props
  const [formType, setFormType] = React.useState('login')

  const toggleFormType = () => {
    formType === 'login' ? setFormType('signup') : setFormType('login')
  }

  return formType === 'login' ? (
    <Login
      toggleFormType={toggleFormType}
      source={source}
      closeLoginModal={closeLoginModal}
      formType={formType}
      whiteboardData={whiteboardData}
      codeEditorData={codeEditorData}
      projectName={projectName}
    />
  ) : (
    <Signup
      toggleFormType={toggleFormType}
      source={source}
      closeLoginModal={closeLoginModal}
      formType={formType}
      whiteboardData={whiteboardData}
      codeEditorData={codeEditorData}
      projectName={projectName}
    />
  )
}
