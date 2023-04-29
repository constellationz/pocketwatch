
const Logout = () => {
  // Log user out
  localStorage.removeItem("token");

  // Redirect to homepage
  window.location.replace("/login");
};

export default Logout;
