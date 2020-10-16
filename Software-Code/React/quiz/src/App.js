import React from 'react'
import Main from './Main'

const App = () => {

  return (
    <div>
      <div className='quiz-logo'>
        <img src={require('./assets/Logo.png')} alt='Quiz Logo' width="280"></img>
      </div>
        <Main />
    </div>
  )
}

export default App