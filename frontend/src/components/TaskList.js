import React, { useState } from 'react';
import Tasks from './Tasks';

//for the div on click function make initialize show in this compononent and make a function that takes handleshow, handleclose and passes the 
//result of that function to it to Editask 

const TaskList = ({ tasks, currentTask, updateTask, deleteTask }) => {

  const dayMap = new Map()
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i]
    console.log(task.name)
    let key = task.day + "/" + task.month
    if (!dayMap.has(key)) {
      dayMap.set(key, [task])
    }
    else {
      dayMap.get(key).push(task)
    }
  }
  let days = Array.from(dayMap.values())

  // reverse the tasks in each categorized date
  days.forEach(key => {
    key.reverse();
  });

  console.log(days);

  return (
    <div className="task-list">
      {days
        .map(tasks => (
          <div>
            <h1 className="task-name d-flex flex-column rounded text-start border border-white">
              {tasks[0].month}/{tasks[0].day}
            </h1>
            <hr class="mb-10"/>
            <Tasks selectedTasks={tasks} updateTask={updateTask} deleteTask={deleteTask} currentTask={currentTask}/>
          </div>
        )).reverse()
        }
    </div>
  );
}

export default TaskList;
