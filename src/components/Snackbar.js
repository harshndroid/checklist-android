import React from 'react';
import '../styles/snackbar.css';

const Snackbar2 = ({ showSnackbar, setShowSnackbar, list, setList }) => {
  if (!showSnackbar) return null;
  return (
    <div
      className="snackbar"
      onClick={() => {
        console.log('undo this task', list, window.list);
        setShowSnackbar(false);
        setList((oldArray) => [
          ...oldArray,
          {
            key: window.list.key,
            value: window.list.value,
            isDone: window.list.isDone,
          },
        ]);
      }}
    >
      Undo
    </div>
  );
};

export default Snackbar2;
