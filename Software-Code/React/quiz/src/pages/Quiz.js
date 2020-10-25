import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Timer from '../components/Timer'
import Question from '../components/Question'
import Answer from '../components/Answer'
import Cookies from 'universal-cookie'
import Leave from '../components/Leave'
 
const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isLoadingQuestion, setLoadingQuestion] = useState(true)
  const [isLoadingTimer, setLoadingTimer] = useState(true)
  const [isTimeout, setIsTimeout] = useState(false)
  const [filterAnswer, setFilterAnswer] = useState(false)
  const [timer, setTimer] = useState('')
  const [questions, setQuestions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const cookies = new Cookies()
  const [isSelected,setIsSelected] = useState(false)
  const [isTimeOut,setIsTimeOut] = useState(false)
  const [isSendAnswer,setIsSendAnswer] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState('')

  /*
    This function fetches the current question from the backend
    Response is stored in questions state, setLoadingQuestions is set to false once we have a question
    If the response is an 404 not found, it means that there are no more questions left and the app can proceed to the leaderboard 
  */
  const getQuestion = () => {
    setFilterAnswer(false)
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/getQuestion', { params: { userID: cookies.get('userID') }})
    .then(response => {
        setQuestions(response.data)
        setLoadingQuestion(false)
    })
    .catch(error => {
      console.log('There was an error!', error)
      if (error.response.status === 404) {
        setShowLeaderboard(true)
      }
    })
    setLoadingQuestion(false)
  }

  /*
    This function fetches the time per question and also the number of total questions from the backend
    Function is called only once per game
    Response is stored in timer and totalQuestions state, setLoadingTimer is set to false once we have the timer
  */
  const getTimer = () => {
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/gameSessionStatus', { params: { userID: cookies.get('userID') }})
    .then(response => {
      setTimer(response.data.timePerQuestion)
      setTotalQuestions(response.data.numberOfQuestions)
      setLoadingTimer(false)
    })
    .catch(error => {
      console.log('There was an error!', error)
    })
  }

  /*
    This function sends the answer to the backend
    When promise is fulfilled it also calls the function to fetch the correct answers and sets variables isSelected, 
    isSendAnswer and filterAnswer to true, which are needed to properly render the buttons for answers
  */
  const sendAnswer = (answer) => {
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/submitAnswer', { params: {
      userID: cookies.get('userID'),
      answer
    }})
    .then(response => {
      getCorrectAnswer()
      setIsSelected(true)
      setIsSendAnswer(true)
      setFilterAnswer(true)
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
  }

  /*
    This function fetches the correct answer from the backend
    Response is stored in correctAnswer state
    Fetching this only after the question has been answered makes it less likely for the user to cheat by intercepting responses
  */
  const getCorrectAnswer = () => {
    axios
    .get('https://team9app.azurewebsites.net/api/quizzarr/getCorrectAnswer', { params: { userID: cookies.get('userID') }})
    .then(response => {
      setCorrectAnswer(response.data)
    })
    .catch(error => {
      console.log('There was an error!', error)
    })
  }

  /*
    It's used for Timer component to control isTimeOut variable which is a property of Answer component.
    'isTimeOut' is not the same as 'isTimeout', the former one is to justify whether the quiz time is out so that the correct answer can be appeared.
  */
  const handleIsTimeOut = () => {
    setIsTimeOut(true)
  }

  const resetTimeIsOut = () => {
    setIsTimeOut(false)
    setIsSelected(false)
    setCurrentQuestion(currentQuestion + 1)
  }

  /*
    While the data about the question is not fetched yet, this will display an empty loading screen
  */
  if (isLoadingQuestion) {
    getQuestion()
    return <div className='app'></div>
  }

  /*
    While the data about the timer is not fetched yet, this will display an empty loading screen
  */
  if (isLoadingTimer) {
    getTimer()
    return <div className='app'></div>
  }

  /*
    When the time is out, this will initialize all the related variables for the next question
  */
  if (isTimeout === false) {
    setTimeout(() => {
      setFilterAnswer(false)
      setIsTimeout(false)
      getQuestion()
      setIsTimeOut(false)
      setIsSendAnswer(false)
      setIsSelected(false)
    }, (timer * 1000 + 2000));
    setIsTimeout(true)
  }

  return (
    <div>
      <div className='timer'>
        <Timer
          timer={timer} 
          handleIsTimeOut={()=>handleIsTimeOut()}
          resetTimeIsOut={()=>resetTimeIsOut()} />
      </div>
      <div className='app'>
        <div className='question'><Question questions={questions} currentQuestion={currentQuestion} totalQuestions={totalQuestions}/></div>
        <Answer
          type = {questions.type}
          answers = {questions.answers}
          correctAnswer={correctAnswer}
          userID = {cookies.get('userID')}
          filterAnswer = {filterAnswer}
          isTimeOut= {isTimeOut}
          isSelected={isSelected}
          isSendAnswer={isSendAnswer}
          sendAnswer={(answer)=>sendAnswer(answer)}
        />
      </div>
      <div>
        {showLeaderboard ? <Redirect to='/leaderboard' /> : null}
      </div>
      <Leave userID={cookies.get('userID')} isLeaderboard={false} />
    </div>
  )
}

export default Quiz