// Settings.jsx
// Settings page

import Button from 'react-bootstrap/Button';
import UserAlert from '../components/UserAlert';
import UpdateEmail from '../components/UpdateEmail';
import UpdatePassword from '../components/UpdatePassword';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Settings() {
  const [userInfo, setUserInfo] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch("api/users/me", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(res => res.json())
    .then(data => {
      setUserInfo(data);
      setDataLoaded(true);
    })
    .catch(err => {
      console.log(err);
    });  
  }, []);

  return (
      dataLoaded && <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-8">
          <h1>Settings</h1>
          <div className="form-group">
            <label htmlFor="email">Current Email</label>
            <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder={userInfo.email}
                disabled
            />
            {!userInfo.emailVerified && <label className="text-danger">Email not verified</label>}
            {userInfo.emailVerified && <label className="text-primary">Email verified</label>}
          </div>
          <UserAlert buttonText={"Re-verify Email"} alertText={"Verification Email Sent"} />
          <UpdateEmail />
          <UpdatePassword />
          <Link to="/forgotpassword">
            <Button className="btn btn-block form-button" id="pocketwatch">
              Forgot Password
            </Button>
          </Link>
          <Link to="/logout">
            <Button className="btn btn-block form-button" id="pocketwatch">
              Logout
            </Button>
          </Link>
        </div>
      </div>
  );
}

export default Settings;
