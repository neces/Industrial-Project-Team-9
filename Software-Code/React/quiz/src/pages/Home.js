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
      <div className='app'>
        <form onSubmit={postUserDetails}>
          <div>
            <input value={newQuizID} placeholder='Quiz ID' onChange={handleQuizIDChange}/>
          </div>
          <div>
            <input value={newName} placeholder='Nickname' onChange={handleNameChange}/>
          </div>
          <button type="submit">START</button>
        </form>
      </div>
    </div>
  )
}

export default Home;