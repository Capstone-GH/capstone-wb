import React from 'react'

import {Navigation} from './components'
import Routes from './routes'
import Chatbox from './components/chatBox'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes />
      <Chatbox />
    </div>
  )
}

export default App
