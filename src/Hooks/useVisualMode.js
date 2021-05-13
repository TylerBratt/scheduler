import { useState } from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (next, replace = false) => {
    if (replace) {
      setMode(next)
      history.splice(history.length - 1, 1, next)
      // console.log('this is first', history.splice(history.length - 1, 1, next))
    } else {
      setMode(next)
      // console.log([...history], next)
      setHistory([...history, next])
    }
  };
  
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