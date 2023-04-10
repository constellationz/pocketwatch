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

function Settings({ navigation }) {
  let [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Settings</Text>
      <View>
        <Text style={styles.text}>Current Email</Text>
        <Text style={styles.graybox}>User's email goes here</Text>
        <Text
          style={styles.buttonSettings}
          onPress={() => navigation.navigate('UpdateEmail')}>
          Re-verify email
        </Text>
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
        <Text style={styles.buttonSettings}>Logout</Text>
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
