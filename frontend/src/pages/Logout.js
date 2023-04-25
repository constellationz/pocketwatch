import { useEffect } from "react";

const Logout = () => {

  // Log user out
  localStorage.removeItem("token");

  // Redirect to homepage
  useEffect(() => {
    window.location.replace("/");
  });
};

export default Logout;
