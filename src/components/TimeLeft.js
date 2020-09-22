import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'

const TimeLeft = (props) => {
    const {
        handleStartStop,
        startStopButton,
        timeLeft,
        timerLabel,
    } = props;
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss',{trim : false} )
    return (
        <div>
            <p id='timer-label'>{timerLabel}</p>
            <p id="time-left">{formattedTimeLeft}</p>
            
            <button id="start-stop" onClick={handleStartStop}>{startStopButton}</button>

        </div>
    )
}

export default TimeLeft;