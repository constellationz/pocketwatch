import Task from './Task'

const Tasks = props => {
  return props.tasks.map( (task) => 
    <Task task={task}/>
  )
}

export default Tasks