import React, { useState, useEffect } from 'react'

const Timer = ({ timer, handleFilterAnswer , resetFilterAnswer}) => {
  const [counter, setCounter] = useState(timer)
  const [isTimeout, setIsTimeout] = useState(false)

  useEffect(() => 
  {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (counter === 0)
  {
    if (isTimeout === false) {
      handleFilterAnswer()
      setTimeout(() => {
        resetFilterAnswer()
        setCounter(timer)
        setIsTimeout(false)
      }, 5000);
      setIsTimeout(true)
    }
    return (
      <div className="App">
      <div></div>
      </div>
    )
  }
  else
  {
    return (
        <div className="App">
        <div>Time Left: {counter}</div>
        </div>
      )
  }
}

export default Timer;