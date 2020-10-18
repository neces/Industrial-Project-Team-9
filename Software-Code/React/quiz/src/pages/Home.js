import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Home = () => {
  const [ sessionID, setSessionID ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const cookies = new Cookies()

  // if (cookies.get('userID') != null) {
  //   cookies.remove('userID')
  // }

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
      setSubmitted(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    })
  }

  return (
    <div>
      <div className='ready-graphic'>
        <img src={require('../assets/Ready.png')} alt='Ready for a quiz?' width="500"></img>
      </div>
      <form onSubmit={sendUserDetails}>
        <div className='start-form'>
          <input value={sessionID} placeholder='Quiz ID' onChange={handleSessionIDChange} />
          <input value={displayName} placeholder='Nickname' onChange={handleDisplayNameChange} />
        <button className='start-button' type="submit">START</button>
        </div>
      </form>
      { submitted ? <Redirect to="/waiting"/> : null }
    </div>
  )
}

export default Home