import React, { useState } from 'react'

const Home = ({}) => {
  const [ newQuizID, setQuizID ] = useState('')
  const [ newName, setNewName ] = useState('')

  const handleQuizIDChange = (event) => {
    console.log(event.target.value)
    setQuizID(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const postUserDetails = (event) => {
    console.log(newName)
    console.log(newQuizID)
    // new user call
    // join session call
    // store that data
    // redirect to quiz
  }

  // currently the text can't be seen when typing in because the text box is also white
  // for monday, there are no links in the upper right corner
  // add logo and ready for a quiz graphic
  return (

    <div>
      <div className='ready-graphic'>
        <img src={require('../assets/Ready.png')} alt='Ready for a quiz?' width="450"></img>
      </div>
      <form onSubmit={postUserDetails}>
        <div className='start-form'>
          <input value={newQuizID} placeholder='Quiz ID' onChange={handleQuizIDChange} />
          <input value={newName} placeholder='Nickname' onChange={handleNameChange} />
        </div>
        <button type="submit">START</button>
      </form>
    </div>
  )
}

export default Home;