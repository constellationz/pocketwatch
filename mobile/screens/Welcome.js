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
// Old login, need to fix this to validate before navigating to dashboard
// <Text style={styles.button} onPress={() => userLogin(email, password)}>
function Welcome({ navigation }) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let userLogin = () => {
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
        console.log(data);
        if (data.message !== undefined) alert(data.message);
        else alert('Login success');
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
        <Text style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
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
