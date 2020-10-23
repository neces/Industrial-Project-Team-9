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

    if (leaderboard.length === 1) {
        return (
            <div>
                <div className='first-place'>
                    <img src={require('../assets/1stPlace.png')} alt='First place' width="300"></img>
                    <div>{leaderboard[0].displayName} / Score <b>{leaderboard[0].score}</b> / Highest Streak <b>{leaderboard[0].highestStreak}</b></div>
                </div>
                {/* <Leave userID={cookies.get('userID')} isLeaderboard={true} /> */}
            </div>
        )
    }

    else if (leaderboard.length === 2) {
        return (
            <div>
                <div className='first-place'>
                    <img src={require('../assets/1stPlace.png')} alt='First place' width="300"></img>
                    <div>{leaderboard[0].displayName} / Score <b>{leaderboard[0].score}</b> / Highest Streak <b>{leaderboard[0].highestStreak}</b></div>
                </div>
                <div className='second-place'>
                     <img src={require('../assets/2ndPlace.png')} alt='Second place' width="300"></img>
                     <div>{leaderboard[1].displayName} / Score <b>{leaderboard[1].score}</b> / Highest Streak <b>{leaderboard[1].highestStreak}</b></div>
                 </div>
                {/* <Leave userID={cookies.get('userID')} isLeaderboard={true} /> */}
            </div>
        )
    }

    else if (leaderboard.length === 3) {
        return (
            <div>
                <div className='first-place'>
                    <img src={require('../assets/1stPlace.png')} alt='First place' width="300"></img>
                    <div>{leaderboard[0].displayName} / Score <b>{leaderboard[0].score}</b> / Highest Streak <b>{leaderboard[0].highestStreak}</b></div>
                </div>
                <div className='second-place'>
                     <img src={require('../assets/2ndPlace.png')} alt='Second place' width="300"></img>
                     <div>{leaderboard[1].displayName} / Score <b>{leaderboard[1].score}</b> / Highest Streak <b>{leaderboard[1].highestStreak}</b></div>
                </div>
                <div className='third-place'>
                    <img src={require('../assets/3rdPlace.png')} alt='Third place' width="300"></img>
                    <div>{leaderboard[2].displayName} / Score <b>{leaderboard[2].score}</b> / Highest Streak <b>{leaderboard[2].highestStreak}</b></div>
                </div>
                {/* <Leave userID={cookies.get('userID')} isLeaderboard={true} /> */}
            </div>
        )
    }

    else {
        return (
            <div>
                <div className='first-place'>
                    <img src={require('../assets/1stPlace.png')} alt='First place' width="300"></img>
                    <div>{leaderboard[0].displayName} / Score <b>{leaderboard[0].score}</b> / Highest Streak <b>{leaderboard[0].highestStreak}</b></div>
                </div>
                <div className='second-place'>
                     <img src={require('../assets/2ndPlace.png')} alt='Second place' width="300"></img>
                     <div>{leaderboard[1].displayName} / Score <b>{leaderboard[1].score}</b> / Highest Streak <b>{leaderboard[1].highestStreak}</b></div>
                </div>
                <div className='third-place'>
                    <img src={require('../assets/3rdPlace.png')} alt='Third place' width="300"></img>
                    <div>{leaderboard[2].displayName} / Score <b>{leaderboard[2].score}</b> / Highest Streak <b>{leaderboard[2].highestStreak}</b></div>
                </div>
                <div className='leaderboard'>
                    <img src={require('../assets/Leaderboard.png')} alt='Leaderboard' width="1000"></img>
                    <div className='leaderboard-text'>{leaderboard.map((user, i) => {return (<div key={i+1} className="rank"> <b>{i+1}.</b> {user.displayName} / Score <b>{user.score}</b> / Highest Streak <b>{user.highestStreak}</b></div>)})}</div>
                </div>
                {/* <Leave userID={cookies.get('userID')} isLeaderboard={true} /> */}
            </div>
        )
    }
}

export default Leaderboard;