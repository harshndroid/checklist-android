import React, { useEffect, useState } from 'react';
import '../App.css';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';
import Styles from '../styles/ToDoListStyles';

const ToDoListContainer = () => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [task, setTask] = useState('');
  const [list, setList] = useState(() => {
    const savedPlans = JSON.parse(window.localStorage.getItem('plans') || '[]');
    if (savedPlans.length > 0) return savedPlans;
    else return [];
  });

  useEffect(() => {
    const plans = JSON.parse(window.localStorage.getItem('plans') || '[]');
    console.log('========list change', { list, plans });
    if (list.length > 0) {
      if (plans.length === 0) {
        const firstPlan = list[0];
        window.localStorage.setItem('plans', JSON.stringify(firstPlan));
      } else {
        window.localStorage.setItem('plans', JSON.stringify(list));
      }
    } else {
      window.localStorage.removeItem('plans');
    }
  }, [list]);

  const deleteTask = (id) => {
    const newPlans = list.filter((ele) => ele.key !== id);
    setList(newPlans);
  };
  const doneTask = (id) => {
    setList(
      list.map((ele) => {
        if (ele.key === id) {
          return { ...ele, isDone: !ele.isDone };
        }
        return ele;
      })
    );
  };

  return (
    <div style={Styles.container}>
      <div className="faj" style={Styles.curveBackground}>
        <input
          onFocus={() => setFocus(true)}
          style={Styles.inputBox}
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Write your plan..."
        />
        <HiPlus
          size={20}
          className="faj"
          style={hover ? { ...Styles.btn, opacity: 0.8 } : Styles.btn}
          onClick={
            !task
              ? () => {
                  alert('Enter a plan!');
                }
              : () => {
                  const key = Math.random() * 1000;
                  setList((oldArray) => [
                    ...oldArray,
                    { key, value: task, isDone: false },
                  ]);
                  setTask('');
                }
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      <div style={Styles.myPlansText}>My Plans</div>
      <div style={{ marginTop: 150 }} />
      <div style={{ overflow: 'auto', height: '70vh' }}>
        {list.map((obj) => (
          <div className="faj" key={obj.key}>
            <div
              style={
                obj.isDone
                  ? {
                      ...Styles.taskCard,
                      textDecoration: 'line-through',
                      textDecorationColor: '#00000066',
                      opacity: 0.5,
                    }
                  : Styles.taskCard
              }
            >
              {obj.value}
            </div>
            <FaCheckCircle
              // className={obj.isDone ? 'loaderAnim' : null}
              style={{ marginLeft: 10, transition: '0.5s', cursor: 'pointer' }}
              size={25}
              color={obj.isDone ? '#9fcc8a' : '#82a2c4'}
              onClick={() => doneTask(obj.key)}
            />
            <FaTrash
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => deleteTask(obj.key)}
              size={23}
              color="#d68d8d"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoListContainer;
