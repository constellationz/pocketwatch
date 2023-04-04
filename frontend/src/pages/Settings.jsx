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
  );
}

export default Settings;
