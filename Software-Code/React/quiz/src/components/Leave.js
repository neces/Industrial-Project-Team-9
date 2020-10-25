import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Leave = ({ userID, isLeaderboard }) => {
    const [left, setLeft] = useState(false)

    //Function which allows the user to leave the session successfully
    //takes in an event parameter which is populated when the user clicks 
    const leaveSession = (event) => {
        event.preventDefault();

        //Checks to see if the current page is the leaderboard if not
        //The api will be called to get the ability for the user to leave the sesssion
        //if successful the user will have left the session
        //if unsuccessful an error will be returned to the console
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

      //this will set the global variable left to true
      setLeft(true)
      }

      //Function which is similar to leaveSession however this will be automatically run if isLeaderboard is true
      const leaveSessionAuto = () => {

        //Checks to see if the current page is the leaderboard if not
        //The api will be called to get the ability for the user to leave the sesssion
        //if successful the user will have left the session
        //if unsuccessful an error will be returned to the console
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

      //Function to check if the user leaving is the host and will end the session if so
      //will only be called on the leaderboard page
      const checkIfHost = () => {

        //Checks to see if the current user is the host
        //if so the session will end
        //if not then the session will not end
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

      //if the variable left is true
    if (left === true) {
        return (
          //redirect the user to the homepage of the app
            <Redirect to="/"/>
        )
    }

      
      //checks to see if the isLeaderboard variable passed through is true
      if(isLeaderboard === true)
      {
        //if so the session will be automatically left through the leaveSessionAuto function
        //A button will be displayed on the screen allowing the user to return to the homepage if they wish
        leaveSessionAuto()

        return (
        
          <div>
          <button className='button-leave' onClick={leaveSession}>RETURN TO HOMEPAGE</button>
          </div>
              )
      }
      else
      {
        //if not a button will be displayed on the screen allowing the user to return to the homepage if they wish which will also leave the session if the user is not on the leaderboard page
        return (
        
          <div>
          <button className='button-leave' onClick={leaveSession}>LEAVE SESSION</button>
          </div>
              )
      }
      
}

  export default Leave;