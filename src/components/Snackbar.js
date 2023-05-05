import React, { useEffect } from 'react';
import '../styles/snackbar.css';

const Snackbar = ({ show, snackText, timeOver, setTimerOver }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setTimerOver(true);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, timeOver]);
  if (show && !timeOver) return <div className="snackbar">{snackText}</div>;
  else return null;
};

export default Snackbar;
