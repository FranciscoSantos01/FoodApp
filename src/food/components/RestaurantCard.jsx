import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export const RestaurantCard = ({item}) => {
    const navigation =useNavigation()
  return (
    <View style={{ width:330,height:300, backgroundColor:'white',borderRadius:20, overflow:'hidden', marginBottom:15}}>
     <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate('Detail',item)}>   
    <Image 
    source={{uri:item.img}}
    style={{width:330, height:200, borderRadius:20 }}
    />
    </TouchableOpacity>
    <View style={{marginHorizontal:20}}>
      <Text style={{fontWeight:'bold', fontSize:25, marginTop:10}}> {item.name} </Text>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
        <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}><Feather name="star" size={16} color="yellow" style={{fontWeight:'bold'}} /> {item.rating} </Text>
        <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}><Feather name="clock" size={14} color="black" /> {item.time} mins </Text>
      </View>
    </View>
</View>
  )
}

