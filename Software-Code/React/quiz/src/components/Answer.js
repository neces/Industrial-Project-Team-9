import React, { useState } from "react"
import axios from 'axios'

const Answer = ({ type, answers, correctAnswer, userID, filterAnswer, handleFilterAnswer,isTimeOut }) => {
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
        if(answer === selected) return 'button-selected'
        else return 'button-normal'

    const handleClassNameCorrect = ( answer ) => {   
        if (answer === correctAnswer) return 'button-correct'
        if(answer === selected) return 'button-selected'
        else return 'button-normal'
    }

    // this now shows both selected and correct at the same time
    const OnFilterAnswer = () => {   
      if(isTimeOut===false) { 
        return(
          <div>
            <div className='answer-section'>{answers.map(answer => 
               <button
                 key={answer}
                 className={handleClassNameSelected(answer)}
                 disabled={true}>{answer}</button>)}</div>
          </div>
        )
      }
      else if (isTimeOut===true) { 
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

    if(filterAnswer===true&&isSelected===false){
      console.log("Time is out,send null answer")
      // sendAnswer("");
    }

    const handleAnswerOptionClick = (answer) => {
      setSelected(answer)
      setIsSelected(true)
      sendAnswer(answer)
      handleFilterAnswer() // this is where selected function should be called
      console.log("Click Answer")
      console.log(isTimeOut)
  }

  if (type === "MultiChoice") {
    return (
      <div className='answer-section'>
        {filterAnswer ? 
          OnFilterAnswer()
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
          OnFilterAnswer()
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