// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";
import CurrentTask from "../components/CurrentTask";
import Search from "../components/Search";
import Task from "../components/Task";

function Dashboard() {
  let currentTask = {
    name: "Task 1",
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    timeElapsed: "12:34:56",
    location: ""
  };

  let unfocusedTask = {
    name: "Task 2",
    startTime: "",
    endTime: "",
    timeElapsed: "00:00:00",
    location: ""
  };

  return (
    <div>
      <Timer time={currentTask.timeElapsed} />
      <CurrentTask props={currentTask}/>
      <Search taskName={currentTask.name} />
      <Task task={currentTask} />
      <Task task={unfocusedTask} />
    </div>
  );
}

export default Dashboard;
