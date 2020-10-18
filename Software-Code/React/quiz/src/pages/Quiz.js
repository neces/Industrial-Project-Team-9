import React, { useState } from 'react'
import axios from 'axios'
import Timer from '../components/Timer'
import Leaderboard from '../components/Leaderboard'
import Question from '../components/Question'
import Answer from '../components/Answer'
import Cookies from 'universal-cookie';

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isLoadingQuestion, setLoadingQuestion] = useState(true)
  const [isTimeout, setIsTimeout] = useState(false)
  let timer = 15 // get game status and see what time it is
  const [questions, setQuestions] = useState([])
  const cookies = new Cookies();

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
        //console.log('There was an error!', error)
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
      <div>
        <div className='app'>
              <Question questions={questions} />
              <Answer answers={questions.answers} type={questions.type} userID={cookies.get('userID')} />
              <Timer timer={timer} correctAnswer={questions.correctAnswer}/>
        </div>
        <div>
          { showLeaderboard ? <Leaderboard userID={cookies.get('userID')}/> : null }
        </div>
      </div>
    </div>
  )
}

export default Quiz