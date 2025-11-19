import useTimer from "../hooks/useTimer";

function WorkoutTracker() {
  const { seconds, start, stop, reset } = useTimer();

  return (
    <div>
      <h2>Workout Timer: {seconds}s</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default WorkoutTracker;
