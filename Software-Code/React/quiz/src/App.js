import React from 'react'
import Main from './Main'

const App = () => {

  return (
    <div>
      <div className='app'>
        <div className='quiz-logo'>
          <img src={require('./assets/Logo.png')} alt='Quiz Logo' width="400"></img>
        </div>
        <Main />
      </div>
    </div>
  )
}

export default App