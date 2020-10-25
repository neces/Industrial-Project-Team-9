import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Leave from '../components/Leave'

const Waiting = () => {
    const [isLoadingGame, setLoadingGame] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    const [gameSession, setGameSession] = useState([])
    const cookies = new Cookies()

    const getGameSession = () => {
      axios
      .get('https://team9app.azurewebsites.net/api/quizzarr/gameSessionStatus', { params: { userID: cookies.get('userID') } })
      .then(response => {
        setGameSession(response.data)
        setLoadingGame(false)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
    }

    if (isTimeout === false) {
      setTimeout(() => {
        getGameSession()
        setIsTimeout(false)
      }, 1500);
      setIsTimeout(true)
    }

    if (isLoadingGame) {
        getGameSession()
        return <div className='app'></div>
    }
  
    return (
        <div className='app'>
          <div className='waiting'>
          <div className='quiz-name'>{gameSession.quizName.toUpperCase()}</div>
          <div className='waiting-text'>{gameSession.numberOfQuestions} QUESTIONS<br></br>{gameSession.timePerQuestion} SECONDS TIMER</div>
          <div className='waiting-text'></div>
          </div>
          <div className='loadingio-spinner-ellipsis-8ty8wmpuhyh'><div className='ldio-ctuwgjg8ktk'>
          <div></div><div></div><div></div><div></div><div></div>
          </div></div>
          <div className='waiting-text'>PEOPLE JOINED: {gameSession.numberOfUsers}</div>
          { gameSession.gameInProgress ? <Redirect to='/quiz'/> : null }
          <Leave userID={cookies.get('userID')}/>
        </div>
    )
}

  export default Waiting