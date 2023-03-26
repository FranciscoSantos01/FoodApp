import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LocationSelector } from '../components/LocationSelector'
import { useDispatch, useSelector } from 'react-redux'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { collectionOrders } from '../../firebase/config'
import { resetCart } from '../../store/cart/cartSlice'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 
import { Button } from 'react-native'

export const OrderScreen = ({products}) => {
    const{total,location,cart}=useSelector(state=>state.cart)
    const{displayName}=useSelector(state=>state.auth)
    const[orderId, setOrderId]= useState("")
    const dispatch = useDispatch()
    const{top}=useSafeAreaInsets()
    const navigation = useNavigation()
    const handlePurchase = ()=>{
      if(location === null){
       return Alert.alert('You must select a location')
      }
       console.log('failed')
        const objPurchase = {
          name:displayName,
          cart,
          total,
          date: serverTimestamp()
        }
       const orderRef = doc(collectionOrders)
       setDoc(orderRef,objPurchase)
       .then((response)=> {
        setOrderId(response?.id)
        dispatch(resetCart())
      })
       .catch((error)=> console.log(error)) 
    }
    const handleCancel = ()=>{
      dispatch(resetCart())
      navigation.navigate('Carrito')
    }
    if(orderId !== ''){
      return(
        <View style={{marginTop:top*2, alignItems:'center', justifyContent:'center', flex:1}}>
          <Text style={{fontSize:26, fontWeight:'600', marginBottom:10}}>Your order was accepted</Text>
          <AntDesign name="checkcircle" size={54} color="green" style={{marginBottom:20}} />
          <Button title='Go back' color='blue' onPress={()=> navigation.navigate('Carrito')} />
        </View>
      )
    }
  return (
    <View style={{marginTop:top*2}}>
      <LocationSelector />
      <View style={styles.totalContainer}>
      <Text>Total:${total}</Text>
      <View style={{flexDirection:'row', gap:8}}>
          <TouchableOpacity
              onPress={handlePurchase} 
                activeOpacity={0.8} 
                style={{backgroundColor:'green', width:70, height:40, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontWeight:'bold'}}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={handleCancel}   
                activeOpacity={0.8} 
                style={{backgroundColor:'red', width:70, height:40, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontWeight:'bold'}}>Cancel</Text>
                </TouchableOpacity>
                </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  totalContainer:{
    position:'absolute', 
    bottom:-350,
    left:30, 
    backgroundColor:'white', 
    width:300, 
    height:80, 
    padding:8,
    borderRadius:18,
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
  }
})
