import { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const UserAlert = ( {buttonText, alertText} ) => {
  const [alertState, setAlertState] = useState(false);

  if(alertState) {
    return (
      <div>
        <Alert variant="success" onClose={() => setAlertState(false)} dismissible>
          {alertText}
        </Alert>

        <Button className="btn btn-block form-button" id="pocketwatch" onClick={() => setAlertState(true)}>
          {buttonText}
        </Button>
      </div>
    );
  }

  return(
    <Button className="btn btn-block form-button" id="pocketwatch" onClick={() => setAlertState(true)}>
      {buttonText}
    </Button>
  );
};

export default UserAlert;
