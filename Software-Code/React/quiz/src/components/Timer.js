import React, { useState, useEffect } from 'react'

const Timer = ({ timer, handleIsTimeOut, resetTimeIsOut }) => {
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
        resetTimeIsOut()
        setCounter(timer)
        setIsTimeout(false)
      }, 2000); // this is the time left for showing the correct answer at the end
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

export default Timer;