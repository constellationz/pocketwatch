// Settings.jsx
// Settings page

import Button from 'react-bootstrap/Button';
import UserAlert from '../components/UserAlert';
import UpdateEmail from '../components/UpdateEmail';
import UpdatePassword from '../components/UpdatePassword';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Settings() {
  const [userInfo, setUserInfo] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  let token = localStorage.getItem("token");

  // check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if(token === null) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // get user settings
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
      isLoggedIn && dataLoaded && <div className="row d-flex justify-content-center">
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
          {!userInfo.emailVerified && <UserAlert buttonText={"Verify Email"} alertText={"Verification Email Sent"} />}
          <UpdateEmail currentEmail={userInfo.email} />
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
