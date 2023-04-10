import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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

function Dashboard({ navigation }) {
  let [task, setTask] = useState('');

  return (
    <SafeAreaView style={styles.containerDash}>
      <Text
        style={styles.textDash}
        onPress={() => navigation.navigate('Settings')}>
        Settings
      </Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.timerText}>00:00.00</Text>
          <TextInput
            style={styles.textInput}
            value={task}
            onChangeText={(value) => setTask(value)}></TextInput>
          <Text style={styles.button}>Play, replace this with icon later</Text>
        </View>
        <Text
          style={styles.smallText}
          onPress={() => navigation.navigate('Welcome')}>
          List goes here, for now goes back to login
        </Text>
        <Text
          style={styles.smallText}
          onPress={() => navigation.navigate('Edit')}>
          Goes to edit task page
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Dashboard;
