import React from 'react';
import moment from 'moment'

const Session = (props) => {
    const {
        sessionLength,
        incrementSessionLength,
        decrementSessionLength,
        isStarted,
    } = props;
    const sessionLengthInMinutes = moment.duration(sessionLength,'s').asMinutes()
    return (
        <div>
        <p id="session-label" >Session</p>
        <p id="session-length">{sessionLengthInMinutes}</p>
        <button  id="session-decrement" onClick={decrementSessionLength} disabled={isStarted}>-</button>
        <button  id="session-increment" onClick={incrementSessionLength} disabled={isStarted}>+</button>
        </div>
        )
}

export default Session;