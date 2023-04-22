import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // Log user out
  localStorage.removeItem("token");

  // Redirect to homepage
  useEffect(() => {
    // navigate("/");
  });
};

export default Logout;
