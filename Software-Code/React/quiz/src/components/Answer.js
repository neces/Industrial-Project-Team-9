import React, { useState } from "react"
import axios from 'axios'

const Answer = ({ answers, type, userID }) => {
    const [isAnswerRight, setIsAnswerRight] = useState(false)
    const [answered, setAnswered] = useState(false)

    const sendAnswer = (answer) => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/submitAnswer', { params: {
        userID,
        answer
      }})
      .then(response => {
        console.log(response.data);
        setIsAnswerRight(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
    }
    
    const handleAnswerOptionClick = (answer) => {
        sendAnswer(answer)
    }

  if (type === "MultiChoice") {
      return (
        <div className='answer-section'>
          {answers.map((answer) => (
          <button onClick={() => handleAnswerOptionClick(answer)} key={answer}>{answer}</button>
          ))}
        </div>
      )
    }

  else if (type === "TrueFalse") {
    return (
      <div className='answer-section'>
          {answers.map((answer) => (
          <button onClick={() => handleAnswerOptionClick(answer)} key={answer}>{answer}</button>
          ))}
      </div>
    )
  }

    else { // estimation, writtenQ
        return (<></>)
    }
}

  export default Answer;