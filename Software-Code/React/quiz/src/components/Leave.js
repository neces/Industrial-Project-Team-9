import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Leave = ({ userID, isLeaderboard }) => {
    const [left, setLeft] = useState(false)

    const leaveSession = (event) => {
        event.preventDefault();
        setLeft(true)
      }

      const leaveSessionAuto = () => {
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/leaveSession', { params: {
          userID,
        }})
        .then(response => {
          console.log('Session Left');
          checkIfHost()
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
        leaveSessionAuto()
        
        return (
        
          <div>
          <button className='button-leave' onClick={leaveSession}>RETURN TO HOMEPAGE</button>
          </div>
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