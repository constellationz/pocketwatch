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

function Settings({ navigation }) {
  let [email, setEmail] = useState('');

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
    setEmail(parsed['email'])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Settings</Text>
      <View>
        <Text style={styles.text}>Current Email</Text>
        <Text style={styles.graybox}>{email}</Text>
        <Text
          style={styles.buttonSettings}
          onPress={() => navigation.navigate('UpdateEmail')}>
          Update Email
        </Text>
        <Text
          style={styles.buttonSettings}
          onPress={() => navigation.navigate('UpdatePassword')}>
          Update Password
        </Text>
        <Text
          style={styles.buttonSettings}
          onPress={() => navigation.navigate('Forgot')}>
          Forgot Password
        </Text>
        <Text 
          onPress={() => navigation.popToTop()}
          style={styles.buttonSettings}>Logout</Text>
      </View>
      <Text
        style={styles.smallText}
        onPress={() => navigation.navigate('Dashboard')}>
        Back to dashboard
      </Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Settings;
