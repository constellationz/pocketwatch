// Dashboard.jsx
// Main timer/dashboard page

import Timer from "../components/Timer";
import CurrentTask from "../components/CurrentTask";
import Search from "../components/Search";
import ModalButtons from "../components/ModalButtons";

function Dashboard() {
  let currentTask = {
    name: "Task 1",
    timeElapsed: "00:00:00",
  };

  return (
    <div>
      <Timer time={currentTask.timeElapsed} />
      <CurrentTask props={currentTask}/>
      <Search taskName={currentTask.name} />
      <ModalButtons successText="Yes" dangerText="No" />
    </div>
  );
}

export default Dashboard;
