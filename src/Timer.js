import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Timer = () => {
  let topWidth = 2;
  let leftWidth = 6;
  let rightWidth = 6;
  let bottomWidth = 6;
  let initialTopColor = 'red';
  let initialLeftColor = 'blue';
  let initialRightColor = 'black';
  let initialBottomColor = 'lightgreen';
  let initialTimer = 0; // in seconds
  let timer = 150; // in seconds
  let timeElapsed =
    (Date.now() - moment.utc('2021-06-19T18:35:00+05:30').valueOf()) / 1000;
  initialTimer = Math.ceil(timeElapsed);
  const [percent, setPercent] = useState((initialTimer * 100) / timer);
  useEffect(() => {
    let interval = setInterval(() => {
      var p = (initialTimer * 100) / timer;
      initialTimer += 1;
      if (initialTimer > timer) {
        console.log('timer cleared');
        clearInterval(interval);
      }
      setPercent(p);
    }, 1000);
  }, []);
  const LinearProgressBar = ({ value }) => {
    return (
      <div style={{ width: '100vw', height: 4, backgroundColor: 'black' }}>
        <div
          style={{
            width: value,
            height: 4,
            backgroundColor: 'yellow',
            transition: '1s linear',
          }}
        />
      </div>
    );
  };
  const CircularProgressBar = () => {
    let x = false;
    return (
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        <svg
          class="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g class="base-timer__circle">
            <circle
              class="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              style="stroke-width: 7px;stroke-linecap: round;transform: rotate(90deg);transform-origin: center;transition: 1s linear all;fill-rule: nonzero;stroke: currentColor;"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
      </div>
    );
  };
  // return (
  //     percent < 100 ? <LinearProgressBar value={`${percent}%`} /> : <LinearProgressBar value='100%' />
  // );
  return <CircularProgressBar />;
};

export default Timer;
