import React from "react";

const Question = ({ questions, currentQuestion, totalQuestions }) => {
    return (
        <div>
            <div className='progress'>{currentQuestion}/{totalQuestions}</div>
            <div>{questions.question}</div>
        </div>
    )
  }

  export default Question;