import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  // Get email address
  useEffect(() => {
    fetch("/api/users/me", {
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
      setEmail(data.email);
    })
    .catch(err => {
      console.log(err);
    });  
  }, []);

  const resetPassword = () => {
    fetch("/api/users/resetPassword", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token,
        newPassword: password
      }),
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res;
    })
    .then(() => {
      setMessage("Password changed");
      setErrorMessage("")
    })
    .catch(error => {
      setMessage("");
      setErrorMessage(JSON.parse(error.message).message);
    });
  };

  return (
    <div className="form">
      <h1>Reset Password</h1>
      <p>Enter a new password for your account registered with {email}</p>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" id="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
        <label htmlFor="password2">Confirm Password</label>
        <input className="form-control" id="password2" type="password" placeholder="Confirm Password" onChange={e => setRepeatPassword(e.target.value)}></input>
      </div>
      {message && <div className="text-success mb-2">{message}</div>}
      {errorMessage && <div className="form-error mb-2">{errorMessage}</div>}
      <Button onClick={resetPassword} className="btn-block form-button" id="pocketwatch">
        Reset password
      </Button>
      <div className="form-group">
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
