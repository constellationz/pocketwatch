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
      <Text style={styles.topText}>Register</Text>
      <View>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}></TextInput>
        <Text style={styles.text}>Confirm password</Text>
        <TextInput
          style={styles.textInput}
          value={password2}
          onChangeText={(value) => setPassword2(value)}
          secureTextEntry={true}></TextInput>
        <Text
          style={styles.button}
          onPress={() => registerUser(name, email, password, password2)}>
          Register
        </Text>
      </View>
      <Text
        style={styles.smallText}
        onPress={() => navigation.navigate('Welcome')}>
        Back to login
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

export default Register;
