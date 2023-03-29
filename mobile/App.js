import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight, 
  SafeAreaView, 
  Button, 
  TextInput,
  Alert 
} from 'react-native';
import Welcome from "./screens/Welcome";
import Register from"./screens/Register";

const Stack = createStackNavigator();
/*
To do list:
Make placeholder text work or find alternative
Make all input boxes same length
Make forgot password page
Make settings page
Make main timer page with play button and list (with logout button)
Add icons for style like web page
Registration success/not success message
*/
function App() 
{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Register" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;