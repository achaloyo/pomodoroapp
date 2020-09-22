import React from "react";
import Break from "./components/Break";
import Session from "./components/Sessions";
import TimeLeft from "./components/TimeLeft";
import "./App.css";

function App() {
  const audioElement = React.useRef(null);
  const [breakLength, setBreakLength] = React.useState(300);
  const decrementBreakLength = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };
  const incrementBreakLength = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  const [sessionLength, setSessionLength] = React.useState(60 * 25);
  const decrementSessionLength = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };
  const incrementSessionLength = () => {
    const newsessionLength = sessionLength + 60;
    if (newsessionLength <= 60 * 60) {
      setSessionLength(newsessionLength);
    }
  };

  const [currentSession, setCurrentSession] = React.useState("Session");
  const [intervalId, setIntervalId] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(sessionLength);

  //change timeleft

  let tempValue = currentSession === "Session" ? sessionLength : breakLength;

  React.useEffect(() => {
    setTimeLeft(tempValue);
  }, [tempValue]);

  const isStarted = intervalId !== null;
  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          }

          audioElement.current.play();

          if (currentSession === "Session") {
            setCurrentSession("Break");
            return breakLength;
          } else if (currentSession === "Break") {
            setCurrentSession("Session");
            return sessionLength;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleReset = () => {
    audioElement.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSession("Session");
    setSessionLength(60 * 25);
    setBreakLength(300);
    setTimeLeft(60 * 25);
  };

  return (
    <div className="App">
      <div className="control">
        <div className="header">
          <h4 id="head1">25+5 Clock</h4>
        </div>
        <div className="Part1">
          <div className="Part11">
            <Break
              breakLength={breakLength}
              incrementBreakLength={incrementBreakLength}
              decrementBreakLength={decrementBreakLength}
              isStarted={isStarted}
            />
          </div>

          <div className="Part12">
            <Session
              sessionLength={sessionLength}
              incrementSessionLength={incrementSessionLength}
              decrementSessionLength={decrementSessionLength}
              isStarted={isStarted}
            />
          </div>
        </div>
        <div className="Part2">
          <TimeLeft
            handleStartStop={handleStartStop}
            timerLabel={currentSession}
            startStopButton={isStarted ? "Stop" : "Start"}
            timeLeft={timeLeft}
          />
        </div>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
        <audio id="beep" ref={audioElement}>
          <source
            src="https://onlineclock.net/audio/options/default.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}

export default App;
