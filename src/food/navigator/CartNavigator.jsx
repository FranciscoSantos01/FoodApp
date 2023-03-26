import { createStackNavigator } from '@react-navigation/stack';
import { CartScreen } from '../screens/CartScreen';
import { OrderScreen } from '../screens/OrderScreen';

const Stack = createStackNavigator();

export const CartNavigator =() => {
  return (
    <Stack.Navigator initialRouteName='Carrito' screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#f6f6f6'}}}>
      <Stack.Screen name="Carrito" component={CartScreen} />
      <Stack.Screen name='Order' component={OrderScreen} />
    </Stack.Navigator>
  );
}