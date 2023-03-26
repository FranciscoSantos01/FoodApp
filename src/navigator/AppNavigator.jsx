
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from '../food/navigator/MainNavigator';

import { Ionicons } from '@expo/vector-icons'; 
import { CartNavigator } from '../food/navigator/CartNavigator';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { ActivityIndicator } from 'react-native';
import { AuthStack } from '../auth/navigator/AuthNavigator';

const Tab = createBottomTabNavigator();

export const AppNavigator= ()=> {
  const status = useCheckAuth();
  if(status === 'checking'){
    return(
      <ActivityIndicator color='blue' size={70} style={{justifyContent:'center', alignItems:'center'}} />
    )
  }
  if(status === 'authorized'){
    return(
      <Tab.Navigator screenOptions={ ({route})=>({ 
        headerShown:false,
        tabBarShowIcon:true,
        tabBarLabelStyle:{fontSize:14},
        tabBarIcon:((props)=>{
          let iconName;
          switch(route.name){
            case "Main":
            return <Ionicons name="home-outline" size={27} color={props.color} />
            break
            case "Cart":
              return <Ionicons name="cart-outline" size={27} color={props.color} />
             default:
              iconName = "";
          }

        })
      })}  >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Cart" component={CartNavigator} />
    </Tab.Navigator>
    )
  }
  
  return(
    <AuthStack />
  )
  
}