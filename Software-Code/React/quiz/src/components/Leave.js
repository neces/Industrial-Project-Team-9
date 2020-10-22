import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Leave = ({ userID, isLeaderboard }) => {
    const [left, setLeft] = useState(false)

    const leaveSession = (event) => {
        event.preventDefault();
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/leaveSession', { params: {
          userID,
        }})
        .then(response => {
          console.log(response.data);
          checkIfHost()
          setLeft(true)
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
      }

      const leaveSessionAuto = () => {
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/leaveSession', { params: {
          userID,
        }})
        .then(response => {
          console.log(response.data);
          checkIfHost()
          setLeft(true)
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
      }
      const checkIfHost = () => {
        axios
        .call('https://team9app.azurewebsites.net/api/quizzarr/admin/endSession', { params: {
         userID,
        }})
        .then(response => {
          console.log(response.data);
          setLeft(true)
          console.log('Session Deleted')
        })
        .catch(error => {
          console.error('There was an error!', error);
        })

      }

    if (left === true) {
        return (
            <Redirect to="/"/>
        )
    }

    if(isLeaderboard === true)
    {
      setTimeout(() => {
        leaveSessionAuto()
      }, 10000);
      return(
        <div>Session will end in 10 seconds</div>
      )
    }
    else
    {
      return (
        <div>
        <button className='button-leave' onClick={leaveSession}>LEAVE SESSION</button>
        </div>
            )
    }
    
}

  export default Leave;