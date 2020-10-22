import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Leave from '../components/Leave'

const Leaderboard = ({ }) => {
    const [leaderboard, setLeaderboard] = useState([])
    const [isLoadingLeaderboard, setLoadingLeaderboard] = useState(true)
    const cookies = new Cookies()

    const getLeaderboard = () => {
        console.log('Getting Leaderboard')
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/getLeaderBoard', { params: { userID: cookies.get('userID') } })
        .then(response => {
          console.log('promise fulfilled')
          setLeaderboard(response.data)
          setLoadingLeaderboard(false)
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }

    if (isLoadingLeaderboard) {
        console.log('loading leaderboard')
        getLeaderboard()
        return <div className="app"></div>
    }

    // formatted with podiums
    return (
        <div>
            <div className='leaderboard'>
                <img src={require('../assets/LeaderboardFull.png')} alt='Leaderboard' width="800"></img>
                <div className='leaderboard-text'>{leaderboard.map((user, i) => {return (<div key={i+1} className="rank"> {i+1}. {user.displayName} Score: {user.score} Highest Streak: {user.highestStreak}</div>)})}</div>
            </div>
            <Leave userID={cookies.get('userID')} isLeaderboard={true} />
        </div>
    )
}

export default Leaderboard;