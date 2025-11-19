import { useState, useEffect, useRef } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const timer = useRef();

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const start = () => {
    timer.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stop = () => clearInterval(timer.current);

  const reset = () => setSeconds(0);

  return { seconds, start, stop, reset };
}
