import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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
import Register from './Register';

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
      <Text>PocketWatch Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}></TextInput>
      <Button title="Login" onPress={() => userLogin(email, password)} />
      <Button title="Cringe" onPress={() => navigation.navigate('Register')} />
      <Text>Forgot your password?</Text>
      <Text>Request a password reset</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 0,
    placeholderTextColor: 'gray',
    marginVertical: 4,
  },
});

export default Welcome;
