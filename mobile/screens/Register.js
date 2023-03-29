import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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

function Register({ navigation }) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [password2, setPassword2] = useState('');

  let registerUser = (name, email, password, password2) => {
    fetch(`https://www.pocketwatch.page/api/users`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message !== undefined) alert(data.message);
        else alert('Registration successful!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>PocketWatch Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onChangeText={(value) => setName(value)}
      />
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
      <TextInput
        style={styles.textInput}
        placeholder="Confirm password"
        value={password2}
        onChangeText={(value) => setPassword2(value)}
        secureTextEntry={true}></TextInput>
      <Button
        title="Register"
        onPress={() => registerUser(name, email, password, password2)}
      />
      <Button title="Cringe" onPress={() => navigation.navigate('Welcome')} />
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

export default Register;
