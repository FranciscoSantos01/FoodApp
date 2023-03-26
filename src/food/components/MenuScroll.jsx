import { View, Text,FlatList, Image } from 'react-native'
import React from 'react'
import { menuItems } from '../../Contansts'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RenderItem = ({item,changeCategorie})=>{
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={()=> changeCategorie(item.category)}>
        <View style={{height:100, width:100, marginTop:10, backgroundColor:'#BDBDBD', justifyContent:'center', alignItems:'center', borderRadius:100, marginLeft:5}}>
            <Image source={item.icon} style={{height:30, width:30}} />
            <Text style={{fontSize:18, textAlign:'center'}}>{item.name}</Text>
        </View>
        </TouchableOpacity>
    )
}

export const MenuScroll = ({changeCategorie}) => {
  return (
    <View style={{height:150,}}>
      <FlatList
         data={menuItems}
         renderItem={({item})=> <RenderItem item={item} changeCategorie={changeCategorie} />}
         horizontal={true}
        showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}

