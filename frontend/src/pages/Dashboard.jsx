// Dashboard.jsx
// Main timer/dashboard page
import React from "react";
import TaskList from "../components/TaskList";
import TaskContextProvider from "../contexts/TaskContext";

function Dashboard() {

  return (
    <div>
      <TaskContextProvider>
        <TaskList />
      </TaskContextProvider>
    </div>
  );
}

export default Dashboard;
