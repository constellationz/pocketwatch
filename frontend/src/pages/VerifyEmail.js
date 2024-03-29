import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  useEffect(() => {
    document.title = "Verify Email - Pocketwatch";
  });

  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    fetch("/api/users/verifyEmail", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res;
    })
    .then(() => {
      setMessage("Email Verified")
      setDataLoaded(true);
    })
    .catch(err => setMessage(JSON.parse(err.message).message));
  }, []);

  return (
    dataLoaded && <div>
      <p className="fs-2 fw-bold p-0 m-0">{message}</p>
      <Link to={"/"}>Back to the Homepage!</Link>
    </div>
  );
}

export default VerifyEmail;
