import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
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
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

function Edit({ route, navigation }) {
  const { task } = route.params;

  const epochToTime = (epoch) => {
    const date = new Date(epoch);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();

    return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  };

  const timeToEpoch = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(seconds));

    return date.getTime();
  };

  let [name, setName] = useState(task.name);
  let [startTime, setStartTime] = useState(epochToTime(task.startTime));
  let [endTime, setEndTime] = useState(epochToTime(task.endTime));
  let [email, setEmail] = useState('');

  useEffect(() => {
    setStartTime(epochToTime(task.startTime));
    setEndTime(epochToTime(task.endTime));
  }, []);

  function handlePress() {
    let val = saveTask();
    navigation.goBack();
  }

  const saveTask = async () => {
    const token = await getToken();
    const url = `http://www.pocketwatch.page/api/tasks/${task.id}`;

    console.log(name)

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          startTime: timeToEpoch(startTime),
          endTime: timeToEpoch(endTime),
          location: [0, 0],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${error.message}`);
      } else {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save the task. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Edit Task</Text>
      <View>
        <Text style={styles.text}>Task Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setName(value)}>
          {task.name}
        </TextInput>

        <Text style={styles.text}>Start Time</Text>
        <TextInput
          style={styles.textInput}
          value={startTime}
          onChangeText={(value) => setStartTime(value)}></TextInput>

        <Text style={styles.text}>End Time</Text>
        <TextInput
          style={styles.textInput}
          value={endTime}
          onChangeText={(value) => setEndTime(value)}></TextInput>

        <Text style={styles.buttonSettings} onPress={() => handlePress()}>
          Save
        </Text>
        <Text style={styles.cancel} onPress={() => navigation.goBack()}>
          Discard Changes
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Edit;
