import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {

    const [tasks, setTasks] = useState([]);

    const addTask = (name, startTime, endTime) => {
        setTasks([
            ...tasks,{
            id: uuidv4(),
            name,
            startTime,
            endTime
        }]);
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map((task) => task.id === id ? updatedTask : task))
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider; 