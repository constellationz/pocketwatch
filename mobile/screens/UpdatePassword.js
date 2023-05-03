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
import * as SecureStore from 'expo-secure-store';
const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};


function UpdatePassword({ navigation }) {
  let [currentPassword, setCurrentPassword] = useState('');
  let [newPassword, setNewPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  function saveChanges() {

    // Check to make sure passwords match
    if (newPassword !== confirmPassword) {
      Alert.alert("Non-matching passwords! Try again!")
      return
    }

    // If we are here, we are all good to make the request
    makeChangePasswordRequest()

    // The request: 
    async function makeChangePasswordRequest() {
      const token = await getToken();
      const url = 'http://www.pocketwatch.page/api/users/updatePassword';

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          "password": currentPassword,
          "newPassword": newPassword
        })
      })

      if (!response.ok) {
        Alert.alert("Something isn't quite right. Check your entries and try again.")
      } else {
        Alert.alert("Success! Your password was changed!")
        navigation.goBack()
      }

    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Settings</Text>
      <View>
        <Text style={styles.text}>Current Password</Text>
        <TextInput
          style={styles.textInput}
          value={currentPassword}
          onChangeText={(value) => setCurrentPassword(value)}></TextInput>
        <Text style={styles.text}>New password</Text>
        <TextInput
          style={styles.textInput}
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}></TextInput>
        <Text style={styles.text}>Confirm new password</Text>
        <TextInput
          style={styles.textInput}
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}></TextInput>
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

export default UpdatePassword;
