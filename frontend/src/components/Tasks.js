import React from 'react';
import Task from './Task'
const Tasks = ({selectedTasks, updateTask, deleteTask, currentTask}) => {
    return selectedTasks.map( (task) => 
      <Task task={task} updateTask={updateTask} deleteTask={deleteTask} currentTask={currentTask}/>
    )
  }

  export default Tasks;