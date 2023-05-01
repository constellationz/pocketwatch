import React from 'react';
import CurrentTime from './CurrentTime';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const Task = ({ task, updateTask, deleteTask, currentTask }) => {
    return (
        <div className="task-container d-flex flex-column rounded mb-5" onClick={() => currentTask(task)}>
            <div className="text-start">
                <h1 className="task-name">{task.name}</h1>
                <CurrentTime task={task} />
                <EditTask task={task} updateTask={updateTask} />
                <DeleteTask task={task} deleteTask={deleteTask} />
            </div>
        </div>
    )
}

export default Task; 