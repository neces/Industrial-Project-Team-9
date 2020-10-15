import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuestionBox from './components/QuestionBox'
import Question from './components/Question'
import QuizLogo from "./assets/QuizLogo.png"

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([])
  const [questions, setQuestions] = useState([])
  const [personal, setPersonal] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/quiz')
      .then(response => {
        console.log('promise fulfilled')
        setQuiz(response.data)
      })
    axios
      .get('http://localhost:3001/questions')
      .then(response => {
        console.log('promise fulfilled')
        setQuestions(response.data)
      })
    axios
      .get('http://localhost:3001/personal')
      .then(response => {
        console.log('promise fulfilled')
        setPersonal(response.data)
        setLoading(false);
      })
  }, [])
  console.log('render', quiz.length, 'quiz data')
  console.log('render', questions.length, 'questions')
  console.log('render', personal.length, 'both')
  
    const handleAnswerOptionClick = (answer) => {
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
      console.log(answer)
      console.log(questions[currentQuestion].correctAnswer)
    };

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

  return (
    <div>
      <div className="quiz-logo">
        <img src={QuizLogo} alt="Quiz Logo" width="100" height="100"/>
      </div>
      <div className='app'>
        {showScore ? (
          <div className='score-section'>
            You scored {score} out of {questions.length}
          </div>
        ) : (
            <>
              <div className='question-section'>
                <div className='question-text'>{questions[currentQuestion].question}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answers.map((answer) => (
                  <button onClick={() => handleAnswerOptionClick(answer)}>{answer}</button>
                ))}
              </div>
            </>
          )}
      </div>
      <></>
    </div>
    )
}

export default App