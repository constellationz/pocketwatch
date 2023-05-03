import { Text, View } from 'react-native';
import Tasks from './Tasks';

const TaskList = (props) => {
  if (props.tasks === undefined) {
    return <Text>Oh no!</Text>;
  }

  props.tasks.sort((a, b) => {
    // Compare month
    if (a.month < b.month) {
      return 1;
    } else if (a.month > b.month) {
      return -1;
    }
    
    // Months are equal, compare day
    if (a.day < b.day) {
      return 1;
    } else if (a.day > b.day) {
      return -1;
    }
    
    // Day is also equal, compare startTime
    if (a.startTime < b.startTime) {
      return 1;
    } else if (a.startTime > b.startTime) {
      return -1;
    }
    
    // All are equal
    return 0;
  });

  // Group by day
  const dayMap = new Map();
  for (let i = 0; i < props.tasks.length; i++) {
    let task = props.tasks[i];
    let key = task.day + '/' + task.month;
    if (!dayMap.has(key)) {
      dayMap.set(key, [task]);
    } else {
      dayMap.get(key).push(task);
    }
  }

  let days = Array.from(dayMap.values());

  days.map( (tasks, index) => {
    //tasks.reverse()
  })

  return days.map((tasks, index) => (
    <View style={{ marginBottom: 20 }} key={index}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      }}>
        {tasks[0].month}/{tasks[0].day}
      </Text>
      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
      }}/>
      <Tasks tasks={tasks} />
    </View>
  ));
};

export default TaskList;