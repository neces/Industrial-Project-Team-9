import React from 'react';

const Question = ({ questions, currentQuestion, totalQuestions }) => {
    
    /* 
      Always returns the progress of the quiz and the current question
    */
    return (
        <div>
            <div className='progress'>{currentQuestion}/{totalQuestions}</div>
            <div>{questions.question}</div>
        </div>
    )
  }

  export default Question