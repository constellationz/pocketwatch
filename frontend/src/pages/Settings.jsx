// Settings.jsx
// Settings page

import Button from 'react-bootstrap/Button';

function Settings() {
  return (
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-8">
          <h1>Settings</h1>
          <div className="form-group">
            <label for="email">Current Email</label>
            <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={""}
                placeholder="Email"
                disabled
            />
          </div>
          <Button className="btn btn-block form-button" id="pocketwatch">
            Re-verify Email
          </Button>
          <Button className="btn btn-block form-button" id="pocketwatch">
            Update Email
          </Button>
          <Button className="btn btn-block form-button" id="pocketwatch">
            Update Password
          </Button>
          <Button className="btn btn-block form-button" id="pocketwatch">
            Forgot Password
          </Button>
          <Button className="btn btn-block form-button" id="pocketwatch">
            Logout
          </Button>
        </div>
      </div>

      // <Form>
      //   <Form.Group className="mb-2" controlId="username">
      //     <Form.Label>Username</Form.Label>
      //     <Form.Control placeholder="Username"></Form.Control>
      //   </Form.Group>

      //   <Form.Group className="mb-2" controlId="email">
      //     <Form.Label>Email</Form.Label>
      //     <Form.Control type="Email" placeholder="Email"></Form.Control>
      //   </Form.Group>

      //   <Form.Group className="mb-2" controlId="current-password">
      //     <Form.Label>Current Password</Form.Label>
      //     <Form.Control type="password" placeholder="Current Password"></Form.Control>
      //   </Form.Group>

      //   <Form.Group className="mb-2" controlId="new-password">
      //     <Form.Label>New Password</Form.Label>
      //     <Form.Control type="password" placeholder="New Password"></Form.Control>
      //   </Form.Group>

      //   <Form.Group className="mb-5" controlId="new-password-confirm">
      //     <Form.Label>Confirm New Password</Form.Label>
      //     <Form.Control type="password" placeholder="Confirm New Password"></Form.Control>
      //   </Form.Group>

      //   <Button className="mb-5" type="submit" variant="dark">Save Changes</Button>
      // </Form>
  );
}

export default Settings;
