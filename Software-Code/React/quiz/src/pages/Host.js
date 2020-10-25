import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Host = () => {
  const [ displayName, setDisplayName ] = useState('')
  const [ quizName, setQuizName ] = useState('')
  const [ numberOfRounds, setNumberOfRounds ] = useState('1')
  const [ numberOfQuestionsPerRound, setNumberOfQuestionsPerRound ] = useState('')
  const [ timeBetweenRounds, setTimeBetweenRounds ] = useState('0')
  const [ timePerQuestion, setTimePerQuestion ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const [ created, setCreated ] = useState(false)
  const cookies = new Cookies()

  const handleDisplayNameChange = (event) => {
    console.log(event.target.value)
    setDisplayName(event.target.value)
  }

  const handleQuizNameChange = (event) => {
   console.log(event.target.value)
   setQuizName(event.target.value)
  }

//   const handleNoRoundsChange = (event) => {
//         console.log(event.target.value)
//         setNumberOfRounds(event.target.value)
// }

const handleNoQuestionsChange = (event) => {
        console.log(event.target.value)
        setNumberOfQuestionsPerRound(event.target.value)
}

// const handleTimeRoundsChange = (event) => {
//         console.log(event.target.value)
//         setTimeBetweenRounds(event.target.value)
// }

const handleTimeQuestionsChange = (event) => {
        console.log(event.target.value)
        setTimePerQuestion(event.target.value)
}
       
  const sendUserDetails = (event) => {
    event.preventDefault();
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/newUser', { params: { displayName }})
    .then(response => {
      console.log(response.data);
      cookies.set('userID', response.data, { path: '/' });
      setSubmitted(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    })

    // if (numberOfRounds === '') {
    //     setNumberOfRounds('3')
    // }
    if (numberOfQuestionsPerRound === '') {
        setNumberOfQuestionsPerRound('10')
    }
    // if (timeBetweenRounds === '') {
    //     setTimeBetweenRounds('5')
    // }
    if (timePerQuestion === '') {
        setTimePerQuestion('15')
  }
}

const createSession = () => {
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/newSession', { params: {
        hostUId: cookies.get('userID'),
        quizName,
        numberOfRounds,
        numberOfQuestionsPerRound,
        timeBetweenRounds,
        timePerQuestion
    }})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    })
  }

  if (submitted === true && created === false) {
        createSession()
        setCreated(true)
  }

  return (
    <div>
      <div className='host-text'>
        <div>HOST A QUIZ</div>
        <div>We will select all the questions for you</div>
      </div>
      <form onSubmit={sendUserDetails}>
        <div className='host-form'>
          <label for='host-name'>Host Nickname</label>
          <input required id='host-name' value={displayName} onChange={handleDisplayNameChange} />

          <label for='quiz-name'>Quiz Name</label>
          <input required id='quiz-name' value={quizName} onChange={handleQuizNameChange} />

          {/* <label for='rounds-number'>Rounds</label>
          <input id='rounds-number' title="Select the number of rounds between 1 and 15." pattern="[1-9][0-5]?" value={numberOfRounds} placeholder='3' onChange={handleNoRoundsChange} /> */}

          <label for='questions-number'>Number of Questions</label>
          <input id='questions-number' title='Select the number of questions per round between 1 and 50.' pattern='[1-9]|[0-4][0-9]|[5][0]' value={numberOfQuestionsPerRound} placeholder='10' onChange={handleNoQuestionsChange} />

          {/* <label for='rounds-time'>Time between Rounds (minutes)</label>
          <input id='rounds-time' title="Select the time between rounds between 1 and 30 minutes." pattern="[1-9]|[0-2][0-9]|[3][0]" value={timeBetweenRounds} placeholder='5' onChange={handleTimeRoundsChange} /> */}

          <label for='questions-time'>Time per Question (seconds)</label>
          <input id='questions-time' title='Select time per question between 5 and 100 seconds.' pattern='[5-9]|[0-9][0-9]|[1][0][0]' value={timePerQuestion} placeholder='15' onChange={handleTimeQuestionsChange} />

          <button className='host-button' type='submit'>HOST</button>
        </div>
      </form>
      <div>
          <Link to='/'><button className='button-leave'>RETURN TO HOMEPAGE</button></Link>
      </div>
      { submitted ? <Redirect to='/hosting'/> : null }
    </div>
  )
}

export default Host