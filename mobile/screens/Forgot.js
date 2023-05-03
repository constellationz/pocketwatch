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

function Forgot({ navigation }) {
  let [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Forgot Password</Text>
      <View>
        <Text style={styles.regularText}>Enter your email and we'll send you a password reset link.</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}></TextInput>
        <Text
          //onPress={() => registerUser(name, email, password, password2)}>
          style={styles.button}>
          Send reset link
        </Text>
      </View>
      <Text
        style={styles.cancel}
        onPress={() => navigation.goBack()}>
        Discard Changes
      </Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Forgot;
