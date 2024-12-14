import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { stopwatchLaps } = useSelector((state) => state.stopwatch);
  const dispatch = useDispatch();

  const intervalRef = useRef(null); 

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    dispatch({ type: "RESET_STOPWATCH" });
    clearInterval(intervalRef.current);
  };

  const handleLap = () => {
    dispatch({ type: "ADD_LAP", payload: time });
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="stopwatch">
      <h1>{time}s</h1>
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={handleLap} disabled={!isRunning}>
        Lap
      </button>
      <button onClick={handleReset} disabled={isRunning}>
        Reset
      </button>
      <div>
        <h3>Laps</h3>
        {stopwatchLaps.length > 0 ? (
          stopwatchLaps.map((lap, index) => (
            <div key={index}>
              Lap {index + 1}: {lap}s
            </div>
          ))
        ) : (
          <p>No laps recorded.</p>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
