import React, {useState} from "react";

const Answer = ({ questions, getQuestion }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    // state for round

    const postScore = () => {
        // sends answer and userid
    }

    const showAnswer = () => {
        setTimeout(() => {
          getQuestion()
          console.log('Another question')
        }, 3000);
        console.log(questions[0].correctAnswer)
        return <div className="App">{questions[0].correctAnswer}</div>
    }
    
    const handleAnswerOptionClick = (answer) => {
        if (answer === questions[0].correctAnswer) {
          postScore()
        }
        // button changes colour?
  
        setTimeout(() => {
          console.log('Show answer') // call function
          showAnswer()
        }, 3000);
  
        //postScore
        // question is just coloured, waiting for the timer to go off to show correct answer and request new data
        setCurrentQuestion(currentQuestion + 1)
        //getQuestion()
  
        // if check the number of current questions against total in the round to get the leaderboard
    };

    // answer component will be rendered based on question type
    if (questions[0].type === "MultiChoice") { // if multiple choice or true false
        return (
            <div className='answer-section'>
                {questions[0].answers.map((answer) => (
                <button onClick={() => handleAnswerOptionClick(answer)} key={answer}>{answer}</button>
                ))}
            </div>
         )
    }

    else { // estimation, writtenQ
        return (<></>)
    }
}

  export default Answer;