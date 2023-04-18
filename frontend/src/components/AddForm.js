import { Form, Button } from "react-bootstrap"
import { TaskContext } from "../contexts/TaskContext"
import { useContext, useState, useRef } from 'react'
import Timer from "./Timer";


const AddForm = () => {

    const [timerHours, setHours] = useState(0);
    const [timerMinutes, setMinutes] = useState(0);
    const [timerSeconds, setSeconds] = useState(0);
    const renders = useRef(0);
    const timerId = useRef();

    const startTimer = () => {
        console.log(renders.current);

        timerId.current = setInterval(() => {
            if ((renders.current === 0) || (renders.current % 59 !== 0)) {
                setSeconds(prev => prev + 1)
                renders.current++
            }
            else {
                setSeconds(prev => prev - (prev - 1))
                if (renders.current % 3600 !== 0) {
                    setMinutes(prev => prev + 1)
                }
                else {
                    setMinutes(prev => prev - prev)
                    if (renders.current % 216000 !== 0) {
                        setHours(prev => prev + 1)
                    }
                }
                renders.current++
            }
        }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(timerId.current);
        timerId.current = 0;
    }

    const stopTimer = () => {
        pauseTimer();
        renders.current = 0;
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }

    const { addTask } = useContext(TaskContext);

    const [name, setName] = useState("");

    const onInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var tempSec = timerSeconds.toString();
        var tempMin = timerMinutes.toString();
        var tempHour = timerHours.toString();
        var time = tempHour + ':' + tempMin + ":" + tempSec
        console.log(time);
        stopTimer();
        addTask(name, 0, time);
    }

    return (
        <>
            <Timer
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds} 
            />

            <div className="row mb-3">
                <div className="d-flex justify-content-center current-task-name">
                    <input
                        type="text"
                        placeholder="Enter a todo..."
                        className="form-control"
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center current-task-buttons">
                    <Button onClick={handleSubmit} variant="dark btn-lg" id="add-task">+</Button>
                    <Button onClick={startTimer} variant="dark" id="media-control">Play</Button>
                </div>
            </div>
        </>
    )
}

export default AddForm;