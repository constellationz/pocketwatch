import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // TODO: Log user out

  // Redirect to homepage
  useEffect(() => {
    navigate("/");
  });
};

export default Logout;
