import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Timer from '../components/Timer'
import Leaderboard from '../components/Leaderboard'
import Question from '../components/Question'
import Answer from '../components/Answer'

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [showWaiting, setShowWaiting] = useState(true)
  const [gameSession, setGameSession] = useState([])
  const [questions, setQuestions] = useState([])
  let timer = 15 // this is to be changed once variable is ready to be passed through from creation of quiz 

    const getGameSession = () => {
      console.log('getting question')
      axios
      .get('http://localhost:3001/questions') // api call not created yet
      // .get('https://team9app.azurewebsites.net/api/quizzarr/', { params: { userID } })
      .then(response => {
        console.log('promise fulfilled')
        setGameSession(response.data)
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
        console.error('There was an error!', error)
      })
    }

    const getQuestion = () => {
      console.log('getting question')
      axios
      .get('http://localhost:3001/questions') // api/quizzarr/getQuestion?userID=<your uid>
      // .get('https://team9app.azurewebsites.net/api/quizzarr/getQuestion?', { params: { userID } })
      .then(response => {
        console.log('promise fulfilled')
        setQuestions(response.data)
        setLoading(false)
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
        console.error('There was an error!', error)
      })
    }

    // this could be it's own component
    if (showWaiting) {
      getGameSession()
      // until it returns game in progress false, show waiting screen
      // when it returns true, set showWaiting to false and get question
      // returns name, no. questions, no. rounds, time between rounds, time for question
      // returns how many people have joined the session
      // return if the game is in progress
      // console.log(gameSession[0].questions)
      setTimeout(() => {
        setShowWaiting(false)
      }, 3000);
      console.log('waiting')
      return <div className="App">Waiting</div>
    }

    if (isLoading) {
      console.log('loading questions')
      getQuestion()
      return <div className="App">Loading...</div>
    }

    return (
    <div>
      <div className='app'>
            <Question questions={questions} />
            <Answer questions={questions} getQuestion={getQuestion} />
            <Timer timer={timer} />
      </div>
    </div>
    )
}

export default Quiz