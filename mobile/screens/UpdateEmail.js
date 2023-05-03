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

function UpdateEmail({ navigation }) {
  let [currentEmail, setCurrentEmail] = useState('')
  let [newEmail, setNewEmail] = useState('');
  let [password, setNewPassword] = useState('');

  useEffect(() => {
    getUserEmail()
  }, []);

  async function getUserEmail() {
    const token = await getToken();
    const url = 'http://www.pocketwatch.page/api/users/me';

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      Alert("Something went wrong. Please try again.")
    }

    let parsed = await response.json()
    setCurrentEmail(parsed['email'])
  }

  function saveChanges() {
    makeChangeEmailRequest()

    async function makeChangeEmailRequest() {
      const token = await getToken();
      const url = 'http://www.pocketwatch.page/api/users/updateEmail';

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: password,
          newEmail: newEmail
        }),
      })

      let parsed = await response.json();

      if (!response.ok) {
        Alert.alert(parsed['message'])
      } 
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Settings</Text>
      <View>
        <Text style={styles.text}>Current Email</Text>
        <Text style={styles.graybox}>{currentEmail}</Text>
        <Text style={styles.text}>New Email</Text>
        <TextInput
          style={styles.textInput}
          value={newEmail}
          onChangeText={(value) => setNewEmail(value)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(value) => setNewPassword(value)}></TextInput>
        <Text
          style={styles.buttonSettings}
          onPress={() => saveChanges()}>
          Save
        </Text>
        <Text
          style={styles.cancel}
          onPress={() => navigation.goBack()}>
          Discard Changes
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default UpdateEmail;
