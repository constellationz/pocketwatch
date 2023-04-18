import { Modal, Button } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { TaskContext } from '../contexts/TaskContext';
import Task from "./Task";
import AddForm from "./AddForm";

const TaskList = () => {

    const { tasks } = useContext(TaskContext);

    return (
        <>
            <div>
                <AddForm />
                <table>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <Task
                                    task={task}
                                />
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskList;