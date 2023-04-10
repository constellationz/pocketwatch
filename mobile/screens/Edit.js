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

function Edit({ navigation }) {
  let [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Edit Task</Text>
      <View>
        <Text style={styles.text}>Task Name</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>Start Time</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>End Time</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>Time Elapsed</Text>
        <Text style={styles.graybox}>Time elapsed here</Text>
        <Text style={styles.text}>Location</Text>
        <Text style={styles.graybox}>Location here</Text>
        <Text
          style={styles.buttonSettings}
          onPress={() => navigation.navigate('UpdatePassword')}>
          Save
        </Text>
        <Text
          style={styles.cancel}
          onPress={() => navigation.navigate('UpdatePassword')}>
          Discard Changes
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Edit;
