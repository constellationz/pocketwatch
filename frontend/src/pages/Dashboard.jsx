// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";
import Search from "../components/Search";

function Dashboard() {
  let currentTask = {
    name: "Task 1",
    timeElapsed: "00:00:00",
  };

  return (
    <div>
      <Timer time={currentTask.timeElapsed} />
      <Search taskName={currentTask.name} />
    </div>
  );
}

export default Dashboard;
