import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Leave = ({ userID, isLeaderboard }) => {
    const [left, setLeft] = useState(false)

    /* 
      Allows User to leave session
      Outcome: when button is clicked the user will leave the session and return to the hompeage.
               will only leave the session if the user is not on the leaderboard page    
    */
    const leaveSession = (event) => {
        event.preventDefault();

        if(isLeaderboard === false)
        {
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/leaveSession', { params: {
          userID,
        }})
        .then(response => {
          console.log('Session Left')
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
      }

      setLeft(true)
      }

      /* 
      Allows User to leave session
      Outcome: the session will automatically be left when on the leaderboard page

    */
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

      /* 
      Checks to se if the user leaviong is the host
      Outcome: if the user is the host then the session will end
               if not then the session will not end   
    */
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

      /* 
      if the variable setLeft is true then
      Outcome: redirects the user to the homepage   
    */
    if (left === true) {
        return (
          //redirect the user to the homepage of the app
            <Redirect to="/"/>
        )
    }

      /* 
      checks to see if the isLeaderboard variable passed through is true
      Outcome: if so then the session will be left automatically
               if not then the session will be left once the user clicks the button
      */

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