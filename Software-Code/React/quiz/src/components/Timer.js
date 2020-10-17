import React from "react";

const Timer = ({timer}) => 
{
  let [counter, setCounter] = React.useState(timer);

  React.useEffect(() => 
  {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const showAnswer = () => {

  }

  if(counter === 0)
  {
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