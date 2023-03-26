import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export const AuthStack =  ()=> {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown:false,
        cardStyle:{backgroundColor:'white'}
        }} >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}