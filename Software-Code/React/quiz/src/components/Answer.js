import React, { useState } from "react"
import axios from 'axios'

const Answer = ({ answers, type, userID }) => {
    const [isAnswerRight, setIsAnswerRight] = useState(false)

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

    const showAnswer = () => {
      // color the correct answer
      // after the timer is done
    }
    
    const handleAnswerOptionClick = (answer) => {
        sendAnswer(answer)
        // return (
        //   <div className='answer-section'>
        //     {questions.answers.map((answer) => (
        //     <button disabled key={answer}>{answer}</button>
        //     ))}
        //   </div>
        // )
        // disable buttons
        // colour the chosen button
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