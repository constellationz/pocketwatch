// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";

function Dashboard() {
  let currentTask = {
    name: "Task 1",
    timeElapsed: "00:00:00",
  };

  return (
    <div>
      <Timer time={currentTask.timeElapsed} />
    </div>
  );
}

export default Dashboard;
