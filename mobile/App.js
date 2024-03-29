import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
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
import Register from "./screens/Register";
import Edit from "./screens/Edit";
import Dashboard from "./screens/Dashboard";
import Forgot from "./screens/Forgot";
import Settings from "./screens/Settings";
import UpdateEmail from "./screens/UpdateEmail";
import UpdatePassword from "./screens/UpdatePassword";

const Stack = createStackNavigator();
/*
To do list:
Make rest of pages using format of login and stuff in style sheet
Make main timer page with play button, list, logout button
Follow figma ^^^^
Make buttons have rounded corners in style sheet idk how
*/
function App() 
{
  let customFonts = {
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf')
  };
  
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded)
    return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Edit" component={Edit}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Forgot" component={Forgot}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="UpdateEmail" component={UpdateEmail}/>
        <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;