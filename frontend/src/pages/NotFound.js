import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found - Pocketwatch";
  });

  return (
    <div>
      <h1>404. Well this is awkward...</h1>
      <p>Sorry, we can't find the page you're looking for.</p>
      <Link to={"/"}>Back to the Homepage!</Link>
    </div>
  );
}
 
export default NotFound;