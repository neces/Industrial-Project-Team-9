import React, { useState, useEffect } from 'react'

const Timer = ({ timer, handleIsTimeOut, resetTimeIsOut }) => {
  const [counter, setCounter] = useState(timer)
  const [isTimeout, setIsTimeout] = useState(false)

    /* 
      Applies effect to the counter variable to count down
      Outcome: the counter variable will count down every second until it reahes 0 from the designated time
    */
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  /* 
      Checks if counter had reached 0
      Outcome: if so, counter will be set to timer and timeout will be handled by the Quiz.js page timeout variable will be set to true,
               nothing will be sent back to the call page
               if not then counter will be passed back to the page which called it
  */
  if (counter === 0) {
    if (isTimeout === false) {
      handleIsTimeOut()
      setTimeout(() => {
        resetTimeIsOut()
        setCounter(timer)
        setIsTimeout(false)
      }, 2000); 
      setIsTimeout(true)
    }

    return (
      <div className="timer">
      <div>&nbsp;</div>
      </div>
    )
  }

  else
  {
    return (
      <div className="timer">
      <div>{counter}</div>
      </div>
    )
  }
}

export default Timer