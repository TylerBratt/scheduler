import { useState } from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (next, replace = false) => {
    //replace
    if (replace) {
      setMode(next)
      history.splice(history.length - 1, 1, next)
      //push
    } else {
      setMode(next)
      setHistory([...history, next])
    }
  };
  
  //pop
  const back = () => {
    if (history.length === 1) {
      setMode(history[0])
    } else {
      history.pop()
      setMode(history[history.length - 1])
    }
  };
  return { mode, transition, back};
}