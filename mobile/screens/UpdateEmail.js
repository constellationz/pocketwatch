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

function UpdateEmail({ navigation }) {
  let [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Settings</Text>
      <View>
        <Text style={styles.text}>Current Email</Text>
        <Text style={styles.graybox}>User's email goes here</Text>
        <Text style={styles.text}>New Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
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

export default UpdateEmail;
