import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Timer from '../components/Timer'
import Question from '../components/Question'
import Answer from '../components/Answer'
import CorrectAnswer from '../components/CorrectAnswer'
import Cookies from 'universal-cookie'

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isLoadingQuestion, setLoadingQuestion] = useState(true)
  const [isTimeout, setIsTimeout] = useState(false)
  let timer = 15 // get game status and see what time it is
  const [questions, setQuestions] = useState([])
  const cookies = new Cookies()

    const getQuestion = () => {
      console.log('Getting Question')
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/getQuestion', { params: { userID: cookies.get('userID') } })
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setQuestions(response.data)
        setLoadingQuestion(false)
      })
      .catch(error => {
        console.log('There was an error!', error)
        if (error.response.status === 404) {
          setShowLeaderboard(true)
        }
      })
    }

    if (isLoadingQuestion) {
      console.log('loading questions')
      getQuestion()
      return <div className="App"></div>
    }

    if (isTimeout === false) {
      setTimeout(() => {
        getQuestion()
        setIsTimeout(false)
      }, 20000);
      setIsTimeout(true)
    }

    return (
      <div>
        <div className='app'>
              <div className='question'><Question questions={questions} /></div>
              <Answer answers={questions.answers} type={questions.type} userID={cookies.get('userID')} />
              <div className='timer'><Timer timer={timer} /></div>
              <CorrectAnswer correctAnswer={questions.correctAnswer}/>
        </div>
        <div>
          { showLeaderboard ? <Redirect to="/leaderboard"/> : null }
        </div>
      </div>
  )
}

export default Quiz