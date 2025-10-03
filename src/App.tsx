import React, { useState, useEffect, use} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  const cheerMessages = [
    "You can do it!",
    "Keep going!",
    "Almost there!",
    "Stay focused!",
    "Believe in yourself!",
    "Keep pushing!",
    "You got this!",
    "Stay strong!",
    "Keep up the great work!",
    "Don't give up!"
  ]
  
  const breakMessages = [
    "Take a deep breath.",
    "Stretch your legs.",
    "Grab a healthy snack.",
    "Hydrate yourself.",
    "Relax your mind.",
    "Enjoy the moment.",
    "Take a short walk.",
    "Listen to some music.",
    "Meditate for a few minutes.",
    "Reflect on your progress."
  ]

//random encouragement message
  useEffect(() => {
    let messageInterval : NodeJS.Timeout;

    if(isRunning) {
      messageInterval = setInterval(() => {
        const messages = isBreak ? breakMessages : cheerMessages;
        setEncouragement(messages[0]);
        let index = 1

        messageInterval = setInterval(() => {
          setEncouragement(messages[index]);
          index = (index + 1) % messages.length;
        },4000);
      
      });
    }else{
      setEncouragement("");
    }
    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  //countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => { 
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number):string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  
  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    setIsRunning(false);
  }
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }
  return (
    <>
      <div style={{position: 'relative'}}>
      <div>
        <button className='closeButton'>Close</button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" onClick={ () => switchMode(false)}>Work</button>
          <button className='image-button' onClick={ () => switchMode(true)}>Break</button>
        </div>

        <p className= {`encouragement-text ${isRunning ? "hidden" : ""}`}>
          { encouragement}
        </p>

        <h1 className='home-timer'>{formatTime(timeLeft)}</h1>
        <button className='home-button' onClick={handleClick}>Start</button>
      </div>
      </div>

    </>
  );
}

export default App;
