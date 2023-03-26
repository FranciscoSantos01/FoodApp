import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons'; 
import { Buttons } from '../Ui/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/cart/cartSlice';

export const CartItem = ({item}) => {
    // const{top}= useSafeAreaInsets()
    const dispatch = useDispatch()
    const handleDelete = (payload)=>{
        dispatch(deleteProduct(payload))
    }
  return (
    <View style={styles.container}> 
    <View style={{justifyContent:'space-evenly'}}>
    <Text style={{fontSize:17, fontWeight:'bold'}}> {item?.name} </Text>
    <Text style={{fontSize:12, width:250}}>
        {item?.ingredients.map(item=> item).join(',')}
    </Text>
    </View>
    <View style={{justifyContent:'space-evenly', alignItems:'center'}}>
    <FontAwesome name="trash" size={24} color="red" onPress={()=> handleDelete(item?.name)} />
    <Buttons value={item?.quantity} name={item?.name} />
    </View>
    
 </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:350,
        height:100,
        backgroundColor:'#fdfdfd',
        borderRadius:20,
        padding:3,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
  
        elevation: 5,
    }
})


