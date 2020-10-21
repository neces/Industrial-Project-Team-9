import React, {useState} from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Leave = ({ userID }) => {
    const [left, setLeft] = useState(false)

    const leaveSession = (event) => {
        event.preventDefault();
        axios
        .get('https://team9app.azurewebsites.net/api/quizzarr/leaveSession', { params: {
          userID,
        }})
        .then(response => {
          console.log(response.data);
          setLeft(true)
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

    return (
        <div>
        <button className='button-leave' onClick={leaveSession}>LEAVE SESSION</button>
        </div>
    )
}

  export default Leave;