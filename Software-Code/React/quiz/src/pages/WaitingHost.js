import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const WaitingHost = () => {
    const [isLoadingGame, setLoadingGame] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    const [gameSession, setGameSession] = useState([])
    const cookies = new Cookies()

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
    
      const startSession = () => {
        console.log('Starting Session')
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/startSession', { params: { hostUId: cookies.get('userID') } })
        .then(response => {
          console.log('promise fulfilled')
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
  
    // number of questions per round
    return (
        <div className='app'>
          <div className='waiting'>
          <div className='quiz-name'>{gameSession.quizName.toUpperCase()}</div>
          <div className='waiting-text'>{gameSession.numberOfRounds} ROUND OF {gameSession.numberOfQuestionPerRound} QUESTIONS</div>
          <div className='waiting-text'></div>
          <div className='waiting-text'>PEOPLE JOINED: {gameSession.numberOfUsers}</div>
          </div>
          <div className="loadingio-spinner-ellipsis-8ty8wmpuhyh"><div className="ldio-ctuwgjg8ktk">
          <div></div><div></div><div></div><div></div><div></div>
          </div></div>
          <button onClick={startSession}>START</button>
          { gameSession.gameInProgress ? <Redirect to="/quiz"/> : null }
        </div>
    )
}

  export default WaitingHost