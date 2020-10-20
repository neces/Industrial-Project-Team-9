import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Timer from '../components/Timer'
import Question from '../components/Question'
import Answer from '../components/Answer'
import Cookies from 'universal-cookie'

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isLoadingQuestion, setLoadingQuestion] = useState(true)
  const [isTimeout, setIsTimeout] = useState(false)
  const [filterAnswer, setFilterAnswer] = useState(false)
  //const [timer, setTimer] = useState('')
  let timer = 15
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
        setFilterAnswer(false)
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

    if (isLoadingQuestion) {
      console.log('loading questions')
      getQuestion()
      return <div className="App"></div>
    }

    // if timer is empty set the timer - just do it once

    if (isTimeout === false) {
      setFilterAnswer(false)
      setTimeout(() => {
        getQuestion()
        setIsTimeout(false)
      }, 20000);
      setIsTimeout(true)
    }

    const handleFilterAnswer = () =>{
        console.log("Filter answer is true")
        setFilterAnswer(true)
        // force to rerender answer
    }

    return (
      <div>
        <div className='app'>
              <div className='question'><Question questions={questions} /></div>
              <Answer 
              type = {questions.type}
              answers = {questions.answers}
              correctAnswer = {questions.correctAnswer}
              userID = {cookies.get('userID')}
              filterAnswer = {filterAnswer}
              handleFilterAnswer = {()=>handleFilterAnswer()}
              />
              <div className='timer'><Timer timer={timer} handleFilterAnswer={()=>handleFilterAnswer()}/></div>
        </div>
        <div>
          { showLeaderboard ? <Redirect to="/leaderboard"/> : null }
        </div>
      </div>
  )
}

export default Quiz