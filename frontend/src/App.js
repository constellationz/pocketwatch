import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
