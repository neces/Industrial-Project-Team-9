import React, { useState, useEffect } from 'react'

const Timer = ({ timer, resetFilterAnswer, handleIsTimeOut, resetTimeIsOut }) => {
  const [counter, setCounter] = useState(timer)
  const [isTimeout, setIsTimeout] = useState(false)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (counter === 0)
  {
    if (isTimeout === false) {
      handleIsTimeOut()
      setTimeout(() => {
        resetFilterAnswer()
        resetTimeIsOut()
        setCounter(timer)
        setIsTimeout(false)
      }, 5000); // this is the time left for showing the correct answer at the end, could change it to 3000
      setIsTimeout(true)
    }
    return (
      <div className="timer">
      <div></div>
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

export default Timer;