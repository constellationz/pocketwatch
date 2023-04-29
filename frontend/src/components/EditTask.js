import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//need to get PM prblem solved
function EditTask({ task, updateTask }) {

  //setting default value of start time for modal
  var defaultStart = "";
  var getStartTime = new Date(task.startTime);
  var SH = getStartTime.getHours();
  var SM = getStartTime.getMinutes();
  var sS = getStartTime.getSeconds();
  var year = getStartTime.getFullYear();
  var month = getStartTime.getMonth();
  var day = getStartTime.getDate();

  if (SH > 12) {
    SH = SH - 12;
    defaultStart = String(SH).padStart(2, '0') + ":" + String(SM).padStart(2, '0') + ":" + String(sS).padStart(2, '0') + " PM";
  }
  else {
    defaultStart = String(SH).padStart(2, '0') + ":" + String(SM).padStart(2, '0') + ":" + String(sS).padStart(2, '0') + " AM";
  }

  //setting default value of end time for modal
  var defaultEnd = "";
  var getEndTime = new Date(task.endTime);
  var EH = getEndTime.getHours();
  var EM = getEndTime.getMinutes();
  var ES = getEndTime.getSeconds();
  if (EH > 12) {
    EH = EH - 12;
    defaultEnd = String(EH).padStart(2, '0') + ":" + String(EM).padStart(2, '0') + ":" + String(ES).padStart(2, '0') + " PM";
  }
  else {
    defaultEnd = String(EH).padStart(2, '0') + ":" + String(EM).padStart(2, '0') + ":" + String(ES).padStart(2, '0') + " AM";
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
  const getEditStartTime = unformattedStartTime.split(' ');
  const formattedStartTime = getEditStartTime[0].split(':');

  const [unformattedEndTime, setUnformattedEndTime] = useState(defaultEnd)
  const getEditEndTime = unformattedEndTime.split(' ');
  const formattedEndTime = getEditEndTime[0].split(':');

  //splitting the user input into HH, MM, SS -> error thats showing AM when I edit 
  var startTimeHH = formattedStartTime[0];
  if (getEditStartTime[1] === 'PM'){
    startTimeHH = parseInt(startTimeHH) + 12;
  }
  var startTimeMM = formattedStartTime[1];
  var startTimeSS = formattedStartTime[2];
  var endTimeHH = formattedEndTime[0];
  if (getEditEndTime[1] === 'PM'){
    endTimeHH = parseInt(endTimeHH) + 12;
  }
  var endTimeMM = formattedEndTime[1];
  var endTimeSS = formattedEndTime[2];

  //formatting start time to be sent to the db
  var startTimeDecoded = new Date(year, month, day, startTimeHH, startTimeMM, startTimeSS)
  var startTime = startTimeDecoded.getTime();

  //formatting end time to be sent to the db
  var endTimeDecoded = new Date(year, month, day, endTimeHH, endTimeMM, endTimeSS);
  var endTime = endTimeDecoded.getTime();

  //getting time elapsed and putting it in '00:00:00' format 
  if (getEditStartTime[2] === 'PM') {
    startTimeHH = parseInt(formattedStartTime[0]) + 12;
  }
  else if ((getEditStartTime[2] === 'AM') && (startTimeHH === '12')) {
    startTimeHH = parseInt(formattedStartTime[0]) - 12;
  }

  if (getEditEndTime[2] === 'PM') {
    endTimeHH = parseInt(formattedEndTime[0]) + 12;
  }
  else if ((getEditEndTime[2] === 'AM') && (endTimeHH === '12')) {
    endTimeHH = parseInt(formattedEndTime[0]) - 12;
  }
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

  if (SS < 0) {
    SS = SS * -1;
    console.log(SS)
  }
  HH = String(HH).padStart(2, '0');
  MM = String(MM).padStart(2, '0');
  SS = String(SS).padStart(2, '0');
  var timeElapsed = temp1.concat(HH, ":", MM, ":", SS);

  const updatedTask = { name, startTime, endTime };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(id, updatedTask);
    handleClose();
  }

  const cancelEditSubmit = (e) => {
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
            <label htmlFor="start-time">Start Time</label>
            <input onChange={(event) => setUnformattedStartTime(event.target.value)} className="form-control" id="start-time" defaultValue={defaultStart} placeholder={"Start Time - HH:MM:SS"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
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
