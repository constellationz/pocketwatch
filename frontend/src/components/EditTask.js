import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditTask({ task, updateTask }) {

  //setting default value of start time for modal
  var defaultStart = task.startTime;
  defaultStart = String(defaultStart).padStart(6, '0');
  var defaultStartTimeHH = defaultStart.substring(0, 2);
  var defaultStartTimeMM = defaultStart.substring(2, 4);
  var defaultStartTimeSS = defaultStart.substring(4);
  if (defaultStartTimeHH > 12) {
    defaultStartTimeHH = parseInt(defaultStartTimeHH) - 12;
    defaultStart = defaultStartTimeHH + ":" + defaultStartTimeMM + ":" + defaultStartTimeSS + " PM";
  }
  else if (defaultStartTimeHH === '00') {
    defaultStartTimeHH = parseInt(defaultStartTimeHH) + 12;
    defaultStart = defaultStartTimeHH + ":" + defaultStartTimeMM + ":" + defaultStartTimeSS + " AM";
  }
  else {
    defaultStart = defaultStartTimeHH + ":" + defaultStartTimeMM + ":" + defaultStartTimeSS + " AM";
  }

  //setting default value of end time for modal
  var defaultEnd = task.endTime;
  var defaultEndTemp = String(defaultEnd).padStart(6, '0');
  var defaultEndTimeHH = defaultEndTemp.substring(0, 2);
  var defaultEndTimeMM = defaultEndTemp.substring(2, 4);
  var defaultEndTimeSS = defaultEndTemp.substring(4);
  defaultEnd = defaultEndTimeHH + ":" + defaultEndTimeMM + ":" + defaultEndTimeSS;
  if (defaultEndTimeHH > 12) {
    defaultEndTimeHH = parseInt(defaultEndTimeHH) - 12;
    defaultEnd = defaultEndTimeHH + ":" + defaultEndTimeMM + ":" + defaultEndTimeSS + " PM";
  }
  else if (defaultEndTimeHH === '00') {
    defaultEndTimeHH = parseInt(defaultEndTimeHH) + 12;
    defaultEnd = defaultEndTimeHH + ":" + defaultEndTimeMM + ":" + defaultEndTimeSS + " AM";
  }
  else {
    defaultEnd = defaultEndTimeHH + ":" + defaultEndTimeMM + ":" + defaultEndTimeSS + " AM";
  }


  //opening and closing the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for editing name
  const [editName, setEditName] = useState(task.name);
  const id = task.id;
  const name = editName;

  //for editing time
  const [unformattedStartTime, setUnformattedStartTime] = useState(defaultStart)
  const getStartTime = unformattedStartTime.split(' ');
  const formattedStartTime = getStartTime[0].split(':');

  const [unformattedEndTime, setUnformattedEndTime] = useState(defaultEnd)
  const getEndTime = unformattedEndTime.split(' ');
  const formattedEndTime = getEndTime[0].split(':');

  //splitting the user input into HH, MM, SS
  var startTimeHH = formattedStartTime[0];
  var startTimeMM = formattedStartTime[1];
  var startTimeSS = formattedStartTime[2];
  var endTimeHH = formattedEndTime[0];
  var endTimeMM = formattedEndTime[1];
  var endTimeSS = formattedEndTime[2];

  if (getStartTime[2] === 'PM') {
    startTimeHH = parseInt(formattedStartTime[0]) + 12;
  }
  else if ((getStartTime[2] === 'AM') && (startTimeHH === '12')) {
    startTimeHH = parseInt(formattedStartTime[0]) - 12;
  }

  if (getEndTime[2] === 'PM') {
    endTimeHH = parseInt(formattedEndTime[0]) + 12;
  }
  else if ((getStartTime[2] === 'AM') && (startTimeHH === '12')) {
    endTimeHH = parseInt(formattedEndTime[0]) - 12;
  }

  //getting time elapsed and putting it in '00:00:00' format 
  let temp1 = "";
  var HH = endTimeHH - startTimeHH
  if (HH < 0) {
    HH = HH * -1;
  }
  var MM = endTimeMM - startTimeMM
  if (MM < 0) {
    MM = MM * -1;
  }
  var SS = endTimeSS - startTimeSS
  console.log(SS)
  if (SS < 0) {
    SS = SS * -1;
    console.log(SS)
  }

  HH = String(HH).padStart(2, '0');
  MM = String(MM).padStart(2, '0');
  console.log(SS)
  SS = String(SS).padStart(2, '0');
  var timeElapsed = temp1.concat(HH, ":", MM, ":", SS);
  console.log()

  //formatting start time to be sent to the db
  let temp2 = "";
  var startTime = temp2.concat(startTimeHH, startTimeMM, startTimeSS);
  startTime = parseInt(startTime);

  //formatting end time to be sent to the db
  let temp3 = "";
  var endTime = temp3.concat(endTimeHH, endTimeMM, endTimeSS);
  endTime = parseInt(endTime);

  const updatedTask = { name, startTime, endTime };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(id, updatedTask);
    handleClose();
  }

  const cancelEditSubmit = (e) =>{
    e.preventDefault();
    handleClose();
  }

  return (
    <>
      <Button className="edit-task-button" variant="dark" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="task-name">Task Name</label>
            <input onChange={(event) => setEditName(event.target.value)} className="form-control" id="task-name" defaultValue={task.name} placeholder={"Task Name"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="task-name">Start Time</label>
            <input onChange={(event) => setUnformattedStartTime(event.target.value)} className="form-control" id="start-time" defaultValue={defaultStart} placeholder={"Start Time - HH:MM:SS"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="task-name">End Time</label>
            <input onChange={(event) => setUnformattedEndTime(event.target.value)} className="form-control" id="end-time" defaultValue={defaultEnd} placeholder={"End Time - HH:MM:SS"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="time-elapsed">Time Elapsed</label>
            <input className="form-control" id="time-elapsed" value={timeElapsed} placeholder={"Time Elapsed"}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <div className="d-flex flex-column">
            <Button onClick={(e) => handleEditSubmit(e)} className="form-button mb-3" id="pocketwatch">Save</Button>
            <Button onClick={(e) => cancelEditSubmit(e)} variant="danger" id="pocketwatch">Discard Changes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;
