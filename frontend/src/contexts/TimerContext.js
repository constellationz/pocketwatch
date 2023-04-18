import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TimerContext = createContext();

const TimerContext = (props) => {

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
}