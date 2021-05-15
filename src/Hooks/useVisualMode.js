import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    setMode(next);
    //replace
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), next]);
      //push
    } else {
      setHistory((prev) => [...prev, next]);
    }
  };

  //pop
  const back = () => {
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
  return { mode, transition, back };
}
