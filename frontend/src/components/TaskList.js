import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";
import CurrentTime from './CurrentTime';

const TaskList = ({ tasks, updateTask, deleteTask }) => {

  return (
    <div className="task-list">
      {tasks
        .sort((a, b) => {
          if ((a.month === b.month) && (a.day === b.day)) {
            return 0;
          }
          if (a.month > b.month) {
            if (a.day > b.day) {
              return -1;
            }
          }
          else {
            return 1;
          }
        })
        .map(task => (
          <div key={task.id} >
            <h1 className="task-name d-flex flex-column rounded text-start border border-white">
              {task.month}/{task.day}
            </h1>
            <div className="task-container d-flex flex-column rounded mb-5">
              <div className="text-start">
                <CurrentTime task={task} />
                <h1 className="task-name">{task.name}</h1>
                <EditTask task={task} updateTask={updateTask} />
                <DeleteTask task={task} deleteTask={deleteTask} />
              </div>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default TaskList;
