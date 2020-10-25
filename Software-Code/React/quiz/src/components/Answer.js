import React, { useState } from 'react'

const Answer = ({ type, answers, correctAnswer, filterAnswer, isTimeOut, isSelected, isSendAnswer, sendAnswer }) => {
    const [selected, setSelected] = useState('')

    
    /*
      Function to colour the button that is selected
      Outcome: Only the selected button's style will change to className 'button-selected', others style will stay 'button-normal'
    */
    const handleClassNameSelected = ( answer ) => {
        if (answer === selected) return 'button-selected'  
        else return 'button-normal'
    }

    /*
      Function to colour the button that is selected and also button that has the correct answer
      Outcome: Button with the correct answer will change style className 'button-correct'
               if the previously selected button is the same as correctAnswer the button will change style to 'button-correct', otherwise it will stay the same
               Other buttons that are selected or correct will remain as before
    */
    const handleClassNameCorrect = ( answer ) => {   
        if (answer === correctAnswer.toString()) return 'button-correct'
        if (answer === selected) return 'button-selected'
        else return 'button-normal'
    }

    /*
      Function to filter the answer buttons
      Outcome: Before the timer is out, when clicked the button will return as selected and all of them will be disabled
                After the timer is out, the correct answer will also be shown, until the next question is fetched
    */
    const OnFilterAnswer = () => {   
      // When the timer is ongoing, return just selected asnwers when clicked
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

      // When the timer is out, reveal the correct answer
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
      When buttons are enabled this function is called onClick
      Outcome: Send answer to the backend and set button as selected
    */
    const handleAnswerOptionClick = (answer) => {
      setSelected(answer)
      sendAnswer(answer)
    }

    /*
      Send null answer to the backend when the timer is out, as the backend will only move
      to the next question when everyone has answered
      Outcome: Send null answer if the user didn't select an answer before the time ran out
    */
    if (isTimeOut === true && isSendAnswer === false && isSelected === false) {
        sendAnswer('')      
    }

    /*
      Answers component is rendered differently based on the type of question posed
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