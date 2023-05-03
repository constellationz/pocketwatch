import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import playImage from '../assets/play.png';
import stopImage from '../assets/stop.png';

import { useIsFocused } from '@react-navigation/native';

import TaskList from '../components/TaskList';

import * as SecureStore from 'expo-secure-store';
const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

function Dashboard({ navigation }) {

  const isFocused = useIsFocused();

  // For managing the timer
  const intervalRef = useRef(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  let isPlaying = useRef(false);
  let startTime = useRef(0);
  let endTime = useRef(0);

  // For managing tasks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    updateTasks();
    if (tasks.length === 0) {
      console.log("NO TASKS???")
    }
  }, [search]);

  function updateTasks() {
    getTasks().then((tasks) => parseAndUpdateTasks(tasks));

    function parseAndUpdateTasks(jsonTasks) {
      setTasks([]);
      for (let i = 0; i < jsonTasks.length; i++) {
        setTasks((tasks) => [
          ...tasks,
          {
            id: jsonTasks[i]._id,
            name: jsonTasks[i].name,
            month: jsonTasks[i].createdAt.split(/[-T]+/)[1],
            day: jsonTasks[i].createdAt.split(/[-T]+/)[2],
            startTime: jsonTasks[i].startTime,
            endTime: jsonTasks[i].endTime,
          },
        ]);
      }
    }

    async function getTasks() {
      const token = await getToken();
      const url = 'http://www.pocketwatch.page/api/tasks/search';
      const searchQuery = search;

      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          search: searchQuery,
        }),
      });

      return await result.json();
    }
  }

  function handlePress() {
    if (isPlaying.current) {
      stopTimer();
      saveTask();
    } else {
      startTimer();
    }
    isPlaying.current = !isPlaying.current;
    updateTasks();
  }

  const saveTask = async () => {
    const token = await getToken();
    const url = 'http://www.pocketwatch.page/api/tasks';

    if (!task || !startTime.current || !endTime.current) {
      console.error(
        'Incomplete task data. Please ensure task, startTime, and endTime are set.'
      );
      Alert.alert(
        'Error',
        'Incomplete task data. Please ensure task, startTime, and endTime are set.'
      );
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: task,
          startTime: startTime.current,
          endTime: endTime.current,
          location: [0, 0],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${error.message}`);
      } else {
        const jsonResponse = await response.json();
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save the task. Please try again.');
    }
  };

  const startTimer = () => {
    startTime.current = Date.now();

    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (++seconds === 60) {
          seconds = 0;
          if (++minutes === 60) {
            minutes = 0;
            hours++;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);
  };

  const stopTimer = () => {
    resetTimer();
    endTime.current = Date.now();
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  // An effect to manage things that should update every render
  useEffect(() => {
      return () => {
        clearInterval(intervalRef.current);
      };
  }, []);
  return (
    <SafeAreaView style={styles.containerDash}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text
          style={styles.textDash}
          onPress={() => navigation.navigate('Settings')}>
          Settings
        </Text>

        <View style={styles.content}>
          <View style={styles.centeredText}>

            <Text style={styles.timerText}>
              {formatTime(time.hours)}:{formatTime(time.minutes)}:
              {formatTime(time.seconds)}
            </Text>

            <TextInput
              style={styles.textInput}
              value={task}
              onChangeText={(value) => setTask(value)}></TextInput>

            <TouchableOpacity 
              onPress={() => handlePress()}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={isPlaying.current ? stopImage : playImage}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, marginTop: -80, marginLeft: 40, marginRight: 40}}>
        <Text style={styles.text}>Search</Text>
        <TextInput
          style={{ ...styles.inputMax}}
          value={search}
          placeholder="Search"
          onChangeText={(value) => setSearch(value)}></TextInput>
        <TaskList tasks={tasks}/>
        {
          tasks.length === 0 &&
          <Text style={styles.text}>
          No results found.
          </Text>
        }
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Dashboard;
