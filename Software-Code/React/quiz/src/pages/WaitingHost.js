import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Leave from '../components/Leave'

const WaitingHost = () => {
    const [isLoadingGame, setLoadingGame] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    const [gameSession, setGameSession] = useState([])
    const cookies = new Cookies()

    /*
      This function fetches the game session status update
      Response is stored in gameSession state, setLoadingGameis set to false once we have a first game session status
    */
    const getGameSession = () => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/gameSessionStatus', { params: { userID: cookies.get('userID') }})
      .then(response => {
        setGameSession(response.data)
        setLoadingGame(false)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
    }
    
    /*
      This function sends an update to start the session to the backend
      Once our game session status shows that the game has started, all the players proceed to the first question
    */
    const startSession = () => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/startSession', { params: { hostUId: cookies.get('userID') }})
      .then(response => {
        console.log('Session started')
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
    }

    /*
      Statement checks if we already have a timeout set and if not, sets it to 1.5 seconds to check for
      games status updates regularly
    */
    if (isTimeout === false) {
      setTimeout(() => {
        getGameSession()
        setIsTimeout(false)
      }, 1500);
      setIsTimeout(true)
    }

    /*
      While the data about the game session status is not fetched yet, this will display an empty loading screen
    */
    if (isLoadingGame) {
      getGameSession()
      return <div className='app'></div>
    }
  
    return (
      <div className='app'>
        <div className='waiting'>
          <div className='quiz-name'>{gameSession.quizName.toUpperCase()}</div>
          <div className='waiting-text'>TO JOIN THIS GAME <br></br>TYPE IN</div>
          <button className='quiz-id-button' disabled>{gameSession.sessionId}</button>
          <div className='waiting-text'></div>
          <div className='waiting-text'>PEOPLE JOINED: {gameSession.numberOfUsers}</div>
        </div>
        <button className='start-button' onClick={startSession}>START</button>
        { gameSession.gameInProgress ? <Redirect to='/quiz'/> : null }
        <Leave userID={cookies.get('userID')}/>
      </div>
    )
}

  export default WaitingHost