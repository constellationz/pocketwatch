// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";
import CurrentTask from "../components/CurrentTask";
import Search from "../components/Search";
import TaskList from "../components/TaskList";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/CurrentTime";
import Button from "react-bootstrap/esm/Button";
var moment = require('moment'); // require 

function Dashboard() {
  useEffect(() => {
    document.title = "Pocketwatch";
  });

  let token = localStorage.getItem('token');

  // check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // for current task
  const [currentTask, setCurrentTask] = useState({});

  //for timer
  const [timerHours, setHours] = useState(0);
  const [timerMinutes, setMinutes] = useState(0);
  const [timerSeconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const renders = useRef(0);
  const timerId = useRef();

  var startTime = 0;
  var endTime = 0;

  const startTimer = () => {
    setTimerOn(true);
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
    setTimerOn(false);
    pauseTimer();
    renders.current = 0;
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  //turning time into format to send to database
  const formatTime = () => {
    var time = new Date();
    var currentTime = time.getTime();
    var secondsPast = ((parseInt(timerHours) * 60 * 60) + (parseInt(timerMinutes) * 60) + parseInt(timerSeconds)) * 1000;
    endTime = currentTime;
    startTime = currentTime - secondsPast;
  }

  // format the timer when a task is selected
  const formatCurrentTaskTime = (currentTask) => {
    let startTime = currentTask.startTime;
    let endTime = currentTask.endTime;
    let deltaTime = endTime - startTime;

    setSeconds(Math.floor( (deltaTime / 1000) % 60 ));
    setMinutes(Math.floor( (deltaTime / 1000 / 60) % 60 ));
    setHours(Math.floor( (deltaTime / 1000 / 3600) % 24));
  }

  // reset a selected task to default values
  const resetTask = () => {
    setName("");
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  //current task & task list functions 
  const [name, setName] = useState("");

  const [tasks, setTasks] = useState([]);

  const onInputChange = (event) => {
    setName(event.target.value)
  };

  const addTask = (name) => {

    fetch("/api/tasks", {
      method: "POST",
      crossDomain: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        startTime: startTime,
        endTime: endTime
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        const id = res._id;
        const date = (res.createdAt.split(/[-T]+/));
        setTasks([
          ...tasks, {
            id,
            name,
            month: date[1],
            day: date[2],
            startTime: startTime,
            endTime: endTime
          }]);
          console.log(tasks);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formatTime();
    stopTimer();
    addTask(name);
  };

  //edit task functions
  const updateTask = (id, updatedTask) => {

    const newName = updatedTask.name;
    const newStartTime = updatedTask.startTime;
    const newEndTime = updatedTask.endTime;

    console.log("new start time: " + newStartTime)
    console.log("new end time: " + newEndTime);

    setTasks(tasks.map((task) => {
      if(task.id === id) {
        let temp = Object.assign({}, task);
        temp.name = newName;
        temp.startTime = newStartTime;
        temp.endTime = newEndTime;
        temp.month = task.month;
        temp.day = task.day;
        return temp;
      } else {
        return task;
      }
    }));

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
        name: newName,
        startTime: newStartTime,
        endTime: newEndTime
      }),
    })
      .then((res) => {
        return res.json();
      })

  };

  //delete task functions
  const deleteTask = (id) => {

    console.log("id in delete task: " + id);
    //try fetching object id from getID ? 
    setTasks(tasks.filter(task => task.id !== id))

    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      crossDomain: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
  };

  //load task functions & searchbar
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchTasks = () => {

      fetch(`/api/tasks/search`, {
        method: "POST",
        crossDomain: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          search: search
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setTasks([]);
          const length = res.length;
          for (var i = 0; i < length; i++) {
            const id = res[i]._id;
            const name = res[i].name;
            const date = (res[i].createdAt.split(/[-T]+/));
            const startTime = res[i].startTime;
            const endTime = res[i].endTime;

            setTasks(tasks => [
              ...tasks, {
                id,
                name,
                month: date[1],
                day: date[2],
                startTime: startTime,
                endTime: endTime
              }]);
          }
        })
    }
    fetchTasks()
  }, [search]);

  return (
    isLoggedIn &&
    <div className="form pb-1">
      <Timer
        timerHours={timerHours}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds} />
      <CurrentTask
        taskName={name}
        onInputChange={onInputChange}
        handleSubmit={handleSubmit}
        startTimer={startTimer}
        timerOn={timerOn}
        resetTask={resetTask}
      />
      <Search
        setSearch={setSearch} />
      <TaskList
        tasks={tasks}
        currentTask={currentTask => {
          setCurrentTask(currentTask)
          setName(currentTask.name);
          formatCurrentTaskTime(currentTask);
        }}
        deleteTask={deleteTask}
        updateTask={updateTask} />
    </div>
  );
}

export default Dashboard;
