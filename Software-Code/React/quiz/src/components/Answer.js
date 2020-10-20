import React, { useState, createRef, useRef } from "react"
import axios from 'axios'

const Answer = ({ answers, type, userID }) => {
    const [isAnswerRight, setIsAnswerRight] = useState(false)
    const [answered, setAnswered] = useState(false)
    const buttonRef = createRef();


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
    } // what is this was sending back the correct answer?

    const showAnswer = () => {
      // color the correct answer
      // after the timer is done
    }

    const disableButton = () => {
      buttonRef.current.disabled = true; // this disables the button
     }
    
    const handleAnswerOptionClick = (answer) => {
      // until a new question is called
        if (answered === false) {
          sendAnswer(answer)
          setAnswered(true)
        }
        //disableButton()
        // return (
        //   <div className='answer-section'>
        //     {questions.answers.map((answer) => (
        //     <button disabled key={answer}>{answer}</button>
        //     ))}
        //   </div>
        // )
        // disable all buttons
        // colour the chosen button select buttons whos value is answer and change the color to pink
    }

  if (type === "MultiChoice") {
      return (
        <div className='answer-section'>
          {answers.map((answer) => (
          <button ref={buttonRef} onClick={() => handleAnswerOptionClick(answer)} key={answer}>{answer}</button>
          ))}
        </div>
      )
    }

  else if (type === "TrueFalse") {
    return (
      <div className='answer-section'>
          {answers.map((answer) => (
          <button ref={buttonRef} onClick={() => handleAnswerOptionClick(answer)} key={answer}>{answer}</button>
          ))}
      </div>
    )
  }

    else { // estimation, writtenQ
        return (<></>)
    }
}

  export default Answer;