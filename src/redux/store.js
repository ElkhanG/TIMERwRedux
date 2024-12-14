import { createStore, combineReducers } from "redux";

const initialTimerState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  measurements: [],
};

const timerReducer = (state = initialTimerState, action) => {
  switch (action.type) {
    case "INCREASE_HOURS":
      return { ...state, hours: state.hours + 1 };
    case "DECREASE_HOURS":
      return { ...state, hours: state.hours > 0 ? state.hours - 1 : 0 };
    case "INCREASE_MINUTES":
      return { ...state, minutes: state.minutes + 1 };
    case "DECREASE_MINUTES":
      return { ...state, minutes: state.minutes > 0 ? state.minutes - 1 : 0 };
    case "INCREASE_SECONDS":
      return { ...state, seconds: state.seconds + 1 };
    case "DECREASE_SECONDS":
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 };
      } else if (state.minutes > 0) {
        return {
          ...state,
          minutes: state.minutes - 1,
          seconds: 59,
        };
      } else if (state.hours > 0) {
        return {
          ...state,
          hours: state.hours - 1,
          minutes: 59,
          seconds: 59,
        };
      } else {
        return state; 
      }
    case "ADD_MEASUREMENT":
      return {
        ...state,
        measurements: [
          ...state.measurements,
          `${state.hours.toString().padStart(2, "0")}:${state.minutes
            .toString()
            .padStart(2, "0")}:${state.seconds.toString().padStart(2, "0")}`,
        ],
      };
    case "RESET_TIMER":
      return { ...state, hours: 0, minutes: 0, seconds: 0 };
    default:
      return state;
  }
};

const initialStopwatchState = {
  stopwatchLaps: [],
};

const stopwatchReducer = (state = initialStopwatchState, action) => {
  switch (action.type) {
    case "ADD_LAP":
      return {
        ...state,
        stopwatchLaps: [...state.stopwatchLaps, action.payload],
      };
    case "RESET_STOPWATCH":
      return { ...state, stopwatchLaps: [] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  timer: timerReducer,
  stopwatch: stopwatchReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
