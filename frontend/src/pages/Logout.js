
const Logout = () => {
  // Log user out
  localStorage.removeItem("token");

  // Redirect to homepage
  window.location.replace("/");
};

export default Logout;
