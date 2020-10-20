import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Home = () => {
  const [ sessionID, setSessionID ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const [ quizFound, setQuizFound ] = useState(true)
  const cookies = new Cookies()

  const handleSessionIDChange = (event) => {
    console.log(event.target.value)
    setSessionID(event.target.value)
  }

  const handleDisplayNameChange = (event) => {
    console.log(event.target.value)
    setDisplayName(event.target.value)
  }

  const sendUserDetails = (event) => {
    event.preventDefault();
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/newUserAndJoin', { params: {
      displayName,
      sessionID
    }})
    .then(response => {
      console.log(response.data);
      cookies.set('userID', response.data, { path: '/' });
      setQuizFound(response.status)
      setSubmitted(true)
      setQuizFound(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
      setQuizFound(false)
    })
  }

  return (
    <div>
      <div className='ready-graphic'>
        <img src={require('../assets/Ready.png')} alt='Ready for a quiz?' width="500"></img>
      </div>
      { quizFound ? null : <div>Quiz ID not found or nickname already taken</div> }
      <form onSubmit={sendUserDetails}>
        <div className='start-form'>
          <input required title="Quiz ID should be 6 digits." pattern="\d{6}" value={sessionID} placeholder='Quiz ID' onChange={handleSessionIDChange} />
          <input required value={displayName} placeholder='Nickname' onChange={handleDisplayNameChange} />
        <button className='start-button' type="submit">START</button>
        <Link to="/host"><button className='host-home-button'>HOST</button></Link>
        </div>
      </form>
      { submitted ? <Redirect to="/waiting"/> : null }
    </div>
  )
}

export default Home