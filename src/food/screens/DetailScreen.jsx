import { View, Text, Dimensions, Image, Button, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import React from 'react'
import { RestaurantItems } from '../components/RestaurantItems';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const heightScreen = Dimensions.get('screen').height
export const DetailScreen = ({route}) => {
  const items = route.params
  const navigation =useNavigation()
  return (
    <ScrollView>
      <View style={{height:heightScreen * 0.30}}>
        <Image source={{uri:items.img}} style={{flex:1}} />
      </View>
      <View style={{backgroundColor:'white', height:'100%', borderRadius:20, top:-18}}>
        <View style={{marginTop:15, marginHorizontal:20}}> 
         <Text style={{fontWeight:'800', fontSize:26}}>{items.name}</Text>
         <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
        <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}><Feather name="star" size={16} color="yellow" style={{fontWeight:'bold'}} /> {items.rating} </Text>
        <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}><Feather name="clock" size={14} color="black" /> {items.time} mins </Text>
      </View>
        </View>
        <View style={{alignItems:'center', marginTop:10}}>
        <FlatList
           data={items.menu}
           renderItem={({item})=> <RestaurantItems item={item} />}
           keyExtractor={item=> item.name}
           showsVerticalScrollIndicator={false} 
           scrollEnabled={false}
           style={{backgroundColor:'white'}} 
        />
        </View>
      </View>
      <View style={{position:'absolute', top:45, left:15}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
           <AntDesign name="arrowleft" size={44} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
