import React, { useState } from 'react'

const Answer = ({ type, answers, correctAnswer, filterAnswer, isTimeOut, isSelected, isSendAnswer, sendAnswer }) => {
    const [selected, setSelected] = useState('')

    
    /*
      To filter the button which is selected
      Outcome: only the clicked button will turn to the className called "button-selected", 
               others will still be called "button-normal".
    */
    const handleClassNameSelected = ( answer ) => {
        if (answer === selected) return 'button-selected'  
        else return 'button-normal'
    }

    /*
      To filter the buttons which are correct and selected
      Outcome: only the correct button will turn to the className called "button-correct". 
               if the content in selected button is the same as correctAnswer, that will change from "button-selected" to "button-current",
               else it will still be called "button-selected", while the one whose content is the same as correctAnswer will be called "button-correct",
               others will still be called "button-normal".
    */
    const handleClassNameCorrect = ( answer ) => {   
        if (answer === correctAnswer.toString()) return 'button-correct'
        if (answer === selected) return 'button-selected'
        else return 'button-normal'
    }

    /*
      To filter the buttons
      Outcome: If time isn't out, only the selected button will be filtered and all buttons will be DISABLE,
               else if time is out, the correct answer will also be filtered. 
               So that the correct answer will be appeared when time is out and OnClick function on buttons can only called once.
    */
    const OnFilterAnswer = () => {   
      //When Time isn't out, those below
      if (isTimeOut === false) { 
        return (
          <div>
            <div className='answer-section'>{answers.map(answer => 
               <button
                 key={answer}
                 className={handleClassNameSelected(answer)}
                 disabled={true}>{answer}</button>)}
              </div>
          </div>
        )
      }

      else if (isTimeOut===true) { 
        return (
          <div>
            <div className='answer-section'>{answers.map(answer => 
               <button
                 key={answer}
                 className={handleClassNameCorrect(answer)}
                 disabled={true}>{answer}</button>)}
              </div>
          </div>
        )
      }
    }

    /*
      When buttons are able to click and user click one button, called this function
      Outcome: Send answer and set selected answer with this button's content
    */
    const handleAnswerOptionClick = (answer) => {
      setSelected(answer)
      sendAnswer(answer)
    }

    /*
      To send null answer and then push the pointer in question array to the next question
      Outcome: Send null answer if user didn't click and time is out
    */
    if (isTimeOut === true && isSendAnswer === false && isSelected === false) {
        sendAnswer('')      
    }

    /*
      We want to design different render style for different type of question
    */
    if (type === 'TrueFalse') {
      return (
        <div className='answer-section'>
          {filterAnswer ? 
            OnFilterAnswer()
            :
          <div className='answer-section'>{answers.map((answer) => (
            <button
            key={answer}
            className='button-normal'
            disabled={false}
            onClick={()=>handleAnswerOptionClick(answer)}>{answer}</button>
          ))}</div>}
        </div>
      )
    }

    else if (type === 'MultiChoice') {
      return (
        <div className='answer-section'>
          {filterAnswer ? 
            OnFilterAnswer()
            :
          <div className='answer-section'>{answers.map((answer) => (
            <button
            key={answer}
            className='button-normal'
            disabled={false}
            onClick={()=>handleAnswerOptionClick(answer)}>{answer}</button>
          ))}</div>}
        </div>
      )
    }
  }

  export default Answer