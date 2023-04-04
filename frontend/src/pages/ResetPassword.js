import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="form">
      <h1>Reset Password</h1>
      <p>Enter a new password for your account registered with LoremIpsum@email.com</p>
      
      <div className="form-group">
        <label for="password">Password</label>
        <input className="form-control" id="password" type="password" placeholder="Password"></input>
        <label for="password2">Confirm Password</label>
        <input className="form-control" id="password2" type="password" placeholder="Confirm Password"></input>
      </div>
      <Button className="btn-block form-button" id="pocketwatch">
        Send reset link
      </Button>
      <div className="form-group">
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;