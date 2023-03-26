import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OrderScreen } from '../screens/OrderScreen';

const Stack = createStackNavigator();

export const Main =() => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#f6f6f6'}}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen  name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}