import React, { useState } from "react"
import axios from 'axios'

const Answer = ({ type, answers, correctAnswer, userID, filterAnswer, handleFilterAnswer }) => {
    const [selected, setSelected] = useState('')
    const [isSelected, setIsSelected] = useState(false)

    const sendAnswer = (answer) => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/submitAnswer', { params: {
        userID,
        answer
      }})
      .then(response => {
        console.log(response.data);
        console.log("Answer sent")
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
    }
    
    // if no answer was selected == if isSelected false after the timer is out, send null answer sendAnswer(null)
    const handleClassNameSelected = ( answer ) => {
<<<<<<< Updated upstream
      if (answer === correctAnswer) return 'button-correct' // this should be commented out
      else if (answer === selected) return 'button-selected'
      else return 'button-normal'
    }

    const handleClassNameCorrect = ( answer ) => {
      if (answer === correctAnswer) return 'button-correct'
      else if (answer === selected) return 'button-selected'
      else return 'button-normal'
=======
        if(answer === selected) return 'button-selected'
        else return 'button-normal'
    }
    const handleClassNameCorrect = ( answer ) => {   
        if (answer === correctAnswer) return 'button-correct'
        if(answer === selected) return 'button-selected'
        else return 'button-normal'
>>>>>>> Stashed changes
    }

    // this now shows both selected and correct at the same time
    const OnFilterAnswer = ( isSelected ) => {   
      if (isSelected === true) { // set selected
        return(
          <div>
            <div className='answer-section'>{answers.map(answer => 
               <button
                 key={answer}
                 className={handleClassNameSelected(answer)}
                 disabled={true}>{answer}</button>)}</div>
              </div>)
      }
      else if (isSelected === false) { // when timer is out, the state filter answer is set to true but it's not getting rerendered
        return(
          <div>
            <div className='answer-section'>{answers.map(answer => 
               <button
                 key={answer}
                 className={handleClassNameCorrect(answer)}
                 disabled={true}>{answer}</button>)}</div>
              </div>)
      }
    }

<<<<<<< Updated upstream
=======
    if(isTimeOut===true&&isSelected===false){
      console.log("Time is out,send null answer")
      sendAnswer("");
    }

>>>>>>> Stashed changes
    const handleAnswerOptionClick = (answer) => {
      setSelected(answer)
      setIsSelected(true)
      sendAnswer(answer)
      handleFilterAnswer() // this is where selected function should be called
      console.log("Click Answer")
  }

  if (type === "MultiChoice") {
    return (
      <div className='answer-section'>
        {filterAnswer ? 
          OnFilterAnswer(isSelected)
           :
        <div className='answer-section'>{answers.map((answer) => (
          <button
          key={answer}
          className="button-normal"
          disabled={false}
          onClick={()=>handleAnswerOptionClick(answer)}>{answer}</button>
        ))}</div>}
    </div>
    )
  }

else if (type === "TrueFalse") {
  return (
    <div className='answer-section'>
        {filterAnswer ? 
          OnFilterAnswer(isSelected)
           :
        <div className='answer-section'>{answers.map((answer) => (
          <button
          key={answer}
          className="button-normal"
          disabled={false}
          onClick={()=>handleAnswerOptionClick(answer)}>{answer}</button>
        ))}</div>}
    </div>
  )
}

  else {
      return (<></>)
  }
}

  export default Answer;