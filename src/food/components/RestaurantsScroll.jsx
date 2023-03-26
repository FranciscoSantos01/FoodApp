import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { RestaurantCard } from './RestaurantCard'

export const RestaurantsScroll = ({restaurants=[]}) => {
  return (
    <View>
        <Text style={{fontWeight:'bold', fontSize:28}}>Restaurants</Text>
        {restaurants.length === 0
        ? <ActivityIndicator size={30} color='blue' style={{justifyContent:'center', alignItems:'center'}} />
        : (
          <FlatList
          data={restaurants}
          renderItem={({item})=> <RestaurantCard item={item} />}
          keyExtractor={item=> item.id}
          showsVerticalScrollIndicator={false} 
          scrollEnabled={false}
          />
        )
      }
  
    </View>
  )
}
