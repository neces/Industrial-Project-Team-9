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

    const getQuestion = () => {
      console.log('Getting Question')
      setFilterAnswer(false)
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
        setLoadingTimer(false)
      })
      .catch(error => {
        console.log('There was an error!', error)
        if (error.response.status === 404) {
        }
      })
    }

    const getCorrectAnswer = ()=>{
      console.log('getting Correct Answer')
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/getCorrectAnswer', { params: { userID: cookies.get('userID') } })
      .then(response => {
        console.log('getCorrectAnswer')
        setCorrectAnswer(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error!', error)
        if (error.response.status === 404) {
        }
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

    if (isTimeout === false) {
      setTimeout(() => {
        setFilterAnswer(false)
        getQuestion()
        setIsTimeout(false)
      }, (timer * 1000 + 5000));
      setIsTimeout(true)
    }

    const handleFilterAnswer = () =>{
        console.log("Filter answer is true")
        
        setFilterAnswer(true)
    }

    const resetFilterAnswer = () =>{
      console.log("resetFilterAnswer")
      setFilterAnswer(false)
  }

    const handleIsTimeOut = () =>{
      setIsTimeOut(true)
      setTimeout(()=>{
        getCorrectAnswer()
        handleFilterAnswer()
      },1000)
      console.log("handleisTimeOut",isTimeOut)
    }

    const resetTimeIsOut = () =>{
      setIsTimeOut(false)
      setIsSelected(false)
      console.log("resetisTimeOut",isTimeOut)
    }

    const handleIsSelected = () =>{
      setIsSelected(true)
      console.log("handleisTimeOut",isTimeOut)
    }
    return (
      <div>
        <div className='app'>
              <div className='question'><Question questions={questions} /></div>
              <Answer 
              type = {questions.type}
              answers = {questions.answers}
              correctAnswer = {correctAnswer}
              userID = {cookies.get('userID')}
              filterAnswer = {filterAnswer}
              handleFilterAnswer = {()=>handleFilterAnswer()}
              isTimeOut= {isTimeOut}
              isSelected={isSelected}
              handleIsSelected={()=>{handleIsSelected()}}
              getCorrectAnswer={()=>{getCorrectAnswer()}}
              />
        </div>
        <div className='timer'>
          <Timer 
          timer={timer} 
          resetFilterAnswer={() =>resetFilterAnswer()}
          handleIsTimeOut={()=>handleIsTimeOut()}
          resetTimeIsOut={()=>resetTimeIsOut()}/></div>
        <div>
          { showLeaderboard ? <Redirect to="/leaderboard"/> : null }
        </div>
        <Leave userID={cookies.get('userID')}/>
      </div>
  )
}

export default Quiz;