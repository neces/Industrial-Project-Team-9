import React, {useState} from "react";
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Waiting = () => {
    const [isLoadingGame, setLoadingGame] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    const [gameSession, setGameSession] = useState([])
    const cookies = new Cookies();

    const getGameSession = () => {
        console.log('Getting Game Status')
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/gameSessionStatus', { params: { userID: cookies.get('userID') } })
        .then(response => {
          console.log('promise fulfilled')
          setGameSession(response.data)
          setLoadingGame(false)
          console.log(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
      }

    if (isTimeout === false) {
      setTimeout(() => {
        getGameSession()
        setIsTimeout(false)
      }, 3000); // set to 1500
      setIsTimeout(true)
    }

    if (isLoadingGame) {
        console.log('Loading game session')
        getGameSession()
        return <div className="app">Loading game session</div>
    }
  
    return (
        <div className='app'>
          <div className='quiz-name'>{gameSession.quizName.toUpperCase()}</div>
          <div>{gameSession.numberOfRounds} ROUND OF {gameSession.numberOfQuestions} QUESTIONS</div>
          <div>WAITING FOR PLAYERS</div>
          <div>PEOPLE JOINED: {gameSession.numberOfUsers}</div>
          <div className="loadingio-spinner-ellipsis-8ty8wmpuhyh"><div className="ldio-ctuwgjg8ktk">
          <div></div><div></div><div></div><div></div><div></div>
          </div></div>
          { gameSession.gameInProgress ? <Redirect to="/quiz"/> : null }
        </div>
    )
}

  export default Waiting