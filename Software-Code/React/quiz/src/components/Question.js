import React from "react";
import "bootstrap/dist/css/bootstrap.css"

const Question = ({ questions, currentQuestion, totalQuestions }) => {
    return (
        <div>
            {/* <div className='progress'>{totalQuestions}</div> */}
            <div>{currentQuestion}/{totalQuestions}</div>
            <div>{questions.question}</div>
        </div>
    )
  }

  export default Question;