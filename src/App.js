import React, {useState, useEffect} from 'react';
import './App.css';
import Timer from './Timer';
import TimerText from './TimerText'
import { FaCheckCircle} from '@react-icons/all-files/fa/FaCheckCircle';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    // const [btnAnimated, setBtnAnimated] = useState(false);
    // const [lengthAnimated, setLengthAnimated] = useState(false);
    const [focus, setFocus] = useState(false);
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);

    const deleteTask = (id) => {
        setList(list.filter(ele => ele.key !== id));
    }
    const doneTask = (id) => {
        setList(list.map(ele => {
            if(ele.key === id){
                return {...ele, isDone: !ele.isDone}
            }
            return ele;
        }))
    }
    // return(
    //     <div style={{margin: 20}}><Timer /></div>
    // );
    return (
        <div style={Styles.container}>
            {/*<div style={Styles.neumorphism} />*/}
            {/*<div style={Styles.spinningLoader} className='loaderAnim' />*/}
            <div className='faj' style={Styles.curveBackground}>
                <input
                    onFocus={()=>setFocus(true)}
                    style={Styles.inputBox}
                    onChange={e => setTask(e.target.value)}
                    value={task}
                    placeholder='write your plan...'
                />
                <HiPlus
                    size={20}
                    className='faj'
                    style={hover ? {...Styles.btn, opacity: 0.8} : Styles.btn}
                    // className={btnAnimated ? 'btnAnim' : null}
                    // onClick={() => {
                    //     setBtnAnimated(true);
                    //     setLengthAnimated(!lengthAnimated);
                    // }}
                    onClick={!task ? () => {} : () => {
                        setList(oldArray => [...oldArray, {key: Math.random()*1000, value: task, isDone: false}]);
                        setTask('');
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
            </div>
            <div style={Styles.myPlansText}>My Plans</div>
            <div style={{marginTop: 150}}/>
            <div style={{overflow:'auto', height:'70vh'}}>
            {list.map(obj =>
                <div className="faj" key={obj.key}>
                    <div style={obj.isDone ? {...Styles.taskCard, textDecoration: 'line-through', textDecorationColor: '#000'} : Styles.taskCard}>{obj.value}</div>
                    <FaCheckCircle
                        className={obj.isDone? 'loaderAnim' : null}
                        style={{marginLeft: 10, transition: '1s', cursor: 'pointer'}}
                        size={25}
                        color={obj.isDone? '#23b06a' : '#82a2c4'}
                        onClick={()=>doneTask(obj.key)}
                    />
                    <FaTrash
                        style={{marginLeft: 10, cursor: 'pointer'}}
                        onClick={()=>deleteTask(obj.key)}
                        size={23}
                        color='#d68d8d'
                    />
                </div>
            )}
            </div>
            {/*<div style={{position:'absolute', left:0}}>
                <div
                    className='faj'
                    style={{...Styles.length, width: lengthAnimated ? '100vw': 10}}
                />
                <FaPen color='grey'/>
            </div>
            */}

            {/*<div style={show?{...Styles.taskCard, transition: 'max-height 2s'}: {...Styles.taskCard, transition: 'max-height 2s'}} onClick={()=>setShow(true)}>
                Show
                {show?<div>Shown<br/>Hidden<br/>Content</div>: null}
            </div>
            <button>OK</button>*/}

        </div>
    );
}

const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'context-menu',
    },
    curveBackground: {
        flexDirection: 'row',
        backgroundImage: 'linear-gradient(to right, #82a2c4, #326ba8)',
        height: 100,
        borderBottomLeftRadius: '75%',
        borderBottomRightRadius: '75%',
        boxShadow: '-4px 4px 5px -3px rgba(0,0,0,0.425)',
        position:'fixed',
        width:'100vw',
    },
    inputBox: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        height: 34,
        paddingLeft: 10,
        boxShadow: '2px 2px 8px -2px rgba(0,0,0,0.425)',
        backgroundColor: '#ededed',
        outlineWidth: 0,
        color: '#8c8989',
        fontFamily: 'cursive',
        cursor: 'context-menu',
    },
    neumorphism: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: 'rgb(219,218,218)',
        boxShadow: '-2px -3px 5px -3px rgba(255, 255, 255, 0.425), 2px 3px 5px -3px rgba(88, 88, 88, 0.425)',
    },
    spinningLoader: {
        height: 50,
        width: 50,
        border: '4px solid white',
        borderRadius: '50%',
        borderTop: '4px solid pink',
        borderBottom: '4px solid pink',
    },
    btn: {
        backgroundColor: '#82a2c4',
        color: '#fff',
        fontWeight: 'bold',
        transition: '0.25s',
        boxShadow: '2px 2px 8px -2px rgba(0,0,0,0.425)',
        borderRadius: '25% 50%',
        cursor: 'pointer',
        marginLeft: 10,
        padding: 8
    },
    length: {
        height: 10,
        borderRadius: 100,
        backgroundColor: 'red',
        color: 'white',
        transition: '5s linear',
    },
    taskCard: {
        margin: 10,
        padding: '5px 20px 5px 20px',
        boxShadow: '1px 1px 5px -2px rgba(0,0,0,0.25)',
        borderRadius: 4,
        // height: 'auto',
        // transition: 'height 0.1s linear',
        color: '#8c8989',
        fontFamily: 'cursive',
        backgroundColor: 'white',
        width: '60%',
    },
    myPlansText: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 120,
        position: 'fixed',
        width: '100vw',
        fontFamily: 'cursive',
        color: '#d68d8d',
        textDecoration: 'underline'
    }
}

export default App;
