import React from 'react';
import moment from 'moment';
import '../App.css'
const Break = (props) => {
    const {
        breakLength,
        incrementBreakLength,
        decrementBreakLength,
        isStarted,
    } = props;
    const breakLengthInMinutes = moment.duration(breakLength,'s').asMinutes()
    return (
        <div>
        <p id="break-label" >Break</p>  
        
        <p id="break-length">{breakLengthInMinutes}</p>
        
        <button  id="break-decrement" onClick={decrementBreakLength} disabled={isStarted}>-</button>
        <button  id="break-increment" onClick={incrementBreakLength} disabled={isStarted}>+</button>
        </div>
        
        )
}

export default Break;