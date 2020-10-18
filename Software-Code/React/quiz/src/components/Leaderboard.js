import React, { useState } from 'react'
import axios from 'axios'

const Leaderboard = ({ userID }) => {
    const [leaderboard, setLeaderboard] = useState([])
    const [isLoadingLeaderboard, setLoadingLeaderboard] = useState(true)

    const getLeaderboard = () => {
        console.log('Getting Leaderboard')
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/getLeaderBoard', { params: { userID } })
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

    // not returning rank, should be properly formatted
    return (
        <div>
            <h1>LEADERBOARD</h1>
            {leaderboard.map(user => {return (<div key={user.displayName} className="rank"> {user.displayName} Score: {user.score} Highest Streak: {user.highestStreak}</div>)})}
        </div>
    )
}

export default Leaderboard;
