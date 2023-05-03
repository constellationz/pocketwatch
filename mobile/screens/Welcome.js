import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const setToken = (token) => {
  return SecureStore.setItemAsync('secure_token', token);
};

const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};


function Welcome({ navigation }) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let userLogin = () => {
    
    // Potential issue here, as the submit button is not disabled while processing
    // allowing users to potentially spam login requests

    // IMPORTANT //
    // if dev is the username, we skip auth
    // remove this before prod
    if (email === 'dev') {
      navigation.navigate('Dashboard')
      return
    }

    fetch('https://www.pocketwatch.page/api/users/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== undefined) {
          // Incorrect login
          alert("Incorrect login info!")
          return
        }
        
        // Store token securely
        setToken(data['token'])

        // Navigate to dashboard
        navigation.navigate('Dashboard')
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Login</Text>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          //placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          //placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}></TextInput>
        <Text style={styles.button} onPress={userLogin}>
          Login
        </Text>
      </View>
      <Text
        style={styles.smallText}
        onPress={() => navigation.navigate('Register')}>
        Create a new account
      </Text>
      <Text
        style={styles.smallText}
        onPress={() => navigation.navigate('Forgot')}>
        Forgot password
      </Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Welcome;
