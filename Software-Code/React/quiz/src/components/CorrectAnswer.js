import React, { useState } from "react";

const CorrectAnswer = ({ correctAnswer }) => {
      const [isTimeout, setIsTimeout] = useState(false)

      if (isTimeout === false) {
            setTimeout(() => {
            correct()
            setIsTimeout(false)
            }, 5000);
            setIsTimeout(true)
      }

      const correct = () => {
            return (
                  <div className="App">
                  <div>The correct answer is: {correctAnswer}</div>
                  </div>
            )
      }

      return (<div></div>)
}

  export default CorrectAnswer;

