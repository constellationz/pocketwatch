// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";
import CurrentTask from "../components/CurrentTask";
import Search from "../components/Search";
import Task from "../components/Task";
import ModalButtons from "../components/ModalButtons";

function Dashboard() {
  let currentTask = {
    name: "Task 1",
    timeElapsed: "12:34:56",
  };

  let unfocusedTask = {
    name: "Task 2",
    timeElapsed: "00:00:00"
  };

  return (
    <div>
      <Timer time={currentTask.timeElapsed} />
      <CurrentTask props={currentTask}/>
      <Search taskName={currentTask.name} />
      <Task task={currentTask} />
      <Task task={unfocusedTask} />
      <ModalButtons successText="Yes" dangerText="No" />
    </div>
  );
}

export default Dashboard;
