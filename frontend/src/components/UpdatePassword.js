import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function UpdatePassword() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("token");

  const updatePassword = () => {
    fetch("api/users/updatePassword", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        password,
        newPassword
      })
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res.json();
    })
    .then(data => {
      setErrorMessage("");
      setHasError(false);
      handleClose();

      // log user out
      localStorage.removeItem("token");

      // redirect to login page
      window.location.replace("/login");
    })
    .catch(err => {
      setErrorMessage(JSON.parse(err.message).message);
      setHasError(true);
    });  
  }

  return (
    <>
      <Button className="btn btn-block form-button" id="pocketwatch" variant="dark" onClick={handleShow}>
        Update Password
      </Button>
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="current-password">Current password</label>
            <input className="form-control" id="current-password" type="password" placeholder={"Current password"} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New password</label>
            <input className="form-control" id="new-password" type="password" placeholder={"New password"} onChange={(e) => setNewPassword(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-password-repeat">Repeat new password</label>
            <input className="form-control" id="new-password-repeat" type="password" placeholder={"Repeat new password"} onChange={(e) => setRepeatNewPassword(e.target.value)}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          {errorMessage && hasError && <div className="form-error text-center mb-2">{errorMessage}</div>}
          <ModalButtons successText="Save" dangerText="Discard Changes" successButtonPressed={updatePassword} dangerButtonPressed={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePassword;