import React, { useState } from "react"
import axios from 'axios'

const Answer = ({ type, answers,correctAnswer,filterAnswer,isTimeOut,isSelected,isSendAnswer,sendAnswer}) => {
    const [selected, setSelected] = useState('')

    // if no answer was selected == if isSelected false after the timer is out, send null answer sendAnswer(null)
    // toLowerCase() is to gurantee when the correctAnswer is "FALSE" or "TRUE" and the answer is "false" or "true" 

    const handleClassNameSelected = ( answer ) => {
        if (answer === selected) return 'button-selected'  
        else return 'button-normal'
    }
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

    if(isTimeOut===true&&isSendAnswer===false&&isSelected===false){
        console.log("send null answer")
        sendAnswer("") 

        
    }

    const handleAnswerOptionClick = (answer) => {
      setSelected(answer)
      sendAnswer(answer)// this is where selected function should be called
      console.log("Click Answer")
  }

  if (type === "TrueFalse") {
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

else if (type === "MultiChoice") {
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