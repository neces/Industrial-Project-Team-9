import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Timer from './components/Timer'
import Leaderboard from './components/Leaderboard'
import Question from './components/Question'
import Answer from './components/Answer'

const App = () => {
  const [isLoading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState([])
  const [questions, setQuestions] = useState([])
  const [scores, setScores] = useState([])

    // send a post request with quizid and nickname beforehand

    const getQuiz = () => {
      // get request for quiz info, name, questions, rounds, times
      // also get user nickname and userID
      // run once at the begging of the quiz
    }

    const getQuestion = () => {
      console.log('getting question')
      axios
      .get('http://localhost:3001/questions')
      .then(response => {
        console.log('promise fulfilled')
        setQuestions(response.data)
        setLoading(false);
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      })
    }

    const getScores = () => {
      // get scores to create a leaderboard
    }

    if (isLoading) {
      getQuiz()
      getQuestion()
      return <div className="App">Loading...</div>;
    }

    return (
    <div>
      <div className='app'>
            <Question questions={questions} />
            <Answer questions={questions} getQuestion={getQuestion} />
      </div>
    </div>
    )
}

export default App