import React, { useState, useEffect } from 'react'

const Timer = ({ timer, handleIsTimeOut, resetTimeIsOut }) => {
  const [counter, setCounter] = useState(timer)
  const [isTimeout, setIsTimeout] = useState(false)

  //An effect is applied to the counter variable where every second the number will be reduced by one and then returned
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  //if the counter reaches 0 then
  if (counter === 0)
  {
    //check if the variable isTimeout is false then
    if (isTimeout === false) {
      //call function handleIsTimeOut from the Quiz.js page
      //then set the variable isTimeout while
      handleIsTimeOut()
      setTimeout(() => {
        // call function resetTimeIsOut from the Quiz.js page
        //set the counter variable to the value of timer from the variable passed through
        //set the IsTimeout variable to false
        resetTimeIsOut()
        setCounter(timer)
        setIsTimeout(false)
      }, 2000); // this is the time left for showing the correct answer at the end

      //then set the IsTimeout variable to true
      setIsTimeout(true)
    }

    //return nothing to the page call
    return (
      <div className="timer">
      <div>&nbsp;</div>
      </div>
    )
  }
  else
  {
    //if the counter does not reach 0 then
    //return the counter variable to the page call
    return (
        <div className="timer">
        <div>{counter}</div>
        </div>
      )
  }
}

export default Timer;