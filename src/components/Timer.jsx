import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Timer() {
  const { hours, minutes, seconds, measurements } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const [isRunning, setIsRunning] = useState(false);

  const handleIncrease = (type) => {
    if (type === "hours") dispatch({ type: "INCREASE_HOURS" });
    if (type === "minutes") dispatch({ type: "INCREASE_MINUTES" });
    if (type === "seconds") dispatch({ type: "INCREASE_SECONDS" });
  };

  const handleDecrease = (type) => {
    if (type === "hours") dispatch({ type: "DECREASE_HOURS" });
    if (type === "minutes") dispatch({ type: "DECREASE_MINUTES" });
    if (type === "seconds") dispatch({ type: "DECREASE_SECONDS" });
  };

  const handleSaveMeasurement = () => {
    dispatch({ type: "ADD_MEASUREMENT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_TIMER" });
    setIsRunning(false); 
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev); 
  };

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        dispatch({ type: "DECREASE_SECONDS" });

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
          setIsRunning(false);
          alert("Time's up!");
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval); 
  }, [isRunning, dispatch, hours, minutes, seconds]);

  return (
    <div className="timer">
      <div className="time-display">
        <div className="time-block">
          <button className="time-button" onClick={() => handleIncrease("hours")}>
            +
          </button>
          <span className="time-value">{hours.toString().padStart(2, "0")}</span>
          <button className="time-button" onClick={() => handleDecrease("hours")}>
            -
          </button>
        </div>

        <div className="time-block">
          <button className="time-button" onClick={() => handleIncrease("minutes")}>
            +
          </button>
          <span className="time-value">{minutes.toString().padStart(2, "0")}</span>
          <button className="time-button" onClick={() => handleDecrease("minutes")}>
            -
          </button>
        </div>

        <div className="time-block">
          <button className="time-button" onClick={() => handleIncrease("seconds")}>
            +
          </button>
          <span className="time-value">{seconds.toString().padStart(2, "0")}</span>
          <button className="time-button" onClick={() => handleDecrease("seconds")}>
            -
          </button>
        </div>
      </div>

      <button className="action-button" onClick={handleStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button className="action-button" onClick={handleSaveMeasurement}>
        Save
      </button>
      <button className="action-button" onClick={handleReset}>
        Reset
      </button>

      {/* Measurement History */}
      <div>
        <h3>Measurement History</h3>
        {measurements.length > 0 ? (
          measurements.map((m, index) => (
            <div key={index}>{m}</div>
          ))
        ) : (
          <p>No measurements saved.</p>
        )}
      </div>
    </div>
  );
}

export default Timer;
