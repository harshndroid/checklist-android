import React, { useState, useEffect } from 'react';
import moment from 'moment';

const TimerText = () => {
  let timer = 40; // in seconds
  let threshold = 10; // in seconds
  let timeElapsed =
    (Date.now() - moment.utc('2021-06-19T17:42:30+05:30').valueOf()) / 1000;
  timer = timer - timeElapsed; //ok
  const [time, setTime] = useState(timer);

  const GetTimerText = ({ secondsLeft }) => {
    let hrs = Math.floor(secondsLeft / 3600);
    let _min = Math.floor(secondsLeft / 60);
    let min;
    if (_min % 60 === 0) min = 0;
    else min = _min;
    let sec = Math.floor(secondsLeft % 60);
    let text = `${hrs.toString().padStart(2, '0')} h : ${min
      .toString()
      .padStart(2, '0')} m : ${sec.toString().padStart(2, '0')} s`;
    return secondsLeft > threshold ? (
      <div>{text}</div>
    ) : (
      <div style={{ color: 'red' }}>{text}</div>
    );
  };
  useEffect(() => {
    let interval = setInterval(() => {
      timer -= 1;
      setTime(timer);
      if (timer <= 0) clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <div>
      {time > 0 ? <GetTimerText secondsLeft={time} /> : '00 h : 00 m : 00 s'}
    </div>
  );
};

export default TimerText;
