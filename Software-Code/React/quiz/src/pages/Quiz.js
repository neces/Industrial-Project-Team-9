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

    const getQuestion = () => {
      console.log('Getting Question')
      setFilterAnswer(false)
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/getQuestion', { params: { userID: cookies.get('userID') } })
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setQuestions(response.data)
        console.log(currentQuestion)
        setLoadingQuestion(false)
      })
      .catch(error => {
        console.log('There was an error!', error)
        if (error.response.status === 404) {
          setShowLeaderboard(true)
        }
      })
      setLoadingQuestion(false);
    }

    const getTimer = () => {
      console.log('Getting Timer')
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/gameSessionStatus', { params: { userID: cookies.get('userID') } })
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setTimer(response.data.timePerQuestion)
        setTotalQuestions(response.data.numberOfQuestions)
        setLoadingTimer(false)
      })
      .catch(error => {
        console.log('There was an error!', error)
      })
    }

    /*
      To submit answer, so that backend can calculate the score and point to the next question
    */
    const sendAnswer = (answer) => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/submitAnswer', { params: {
        userID:cookies.get('userID'),
        answer
      }})
      .then(response => {
        console.log("Answer sent")
        getCorrectAnswer()
        setIsSelected(true)
        setIsSendAnswer(true)
        setFilterAnswer(true)
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
    }

    /*
      To get the current question's correct answer, so user can only know the correct answer after time out to avoid cheating
    */
    const getCorrectAnswer = ()=>{
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/getCorrectAnswer', { params: { userID: cookies.get('userID')} })
      .then(response => {
        console.log('getCorrectAnswer')
        setCorrectAnswer(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error!', error)
      })
    }

    if (isLoadingQuestion) {
      console.log('loading questions')
      getQuestion()
      return <div className="App"></div>
    }

    if (isLoadingTimer) {
      console.log('loading timer')
      getTimer()
      return <div className="App"></div>
    }

    /*
      When time is out, initialize all the related variables. 
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

    /*
      Is used for Timer component to control isTimeOut variable which is a property of Answer component.
      isTimeOut is not the same as isTimeout, the former one is to justify whether the quiz time is out so that the correct answer can be appeared.
    */
    const handleIsTimeOut = () =>{
      setIsTimeOut(true)
      console.log("Time is out")
      }

    const resetTimeIsOut = () =>{
      setIsTimeOut(false)
      setIsSelected(false)
      setCurrentQuestion(currentQuestion + 1)
      console.log("resetisTimeOut",isTimeOut)
    }

  return (
    <div>
      <div className='timer'>
        <Timer
          timer={timer} 
          handleIsTimeOut={()=>handleIsTimeOut()}
          resetTimeIsOut={()=>resetTimeIsOut()} /></div>
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
        {showLeaderboard ? <Redirect to="/leaderboard" /> : null}
      </div>
      <Leave userID={cookies.get('userID')} isLeaderboard={false} />
    </div>
  )
}

export default Quiz;