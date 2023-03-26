import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../../assets/cart.png'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CartItem } from '../components/CartItem'
import { FlatList } from 'react-native-gesture-handler'
import { resetCart, sumTotal } from '../../store/cart/cartSlice'


 export const CartScreen = () => {
  const{top}=useSafeAreaInsets()
  const{cart,total}=useSelector(state=> state.cart)
  const dispatch = useDispatch()
  const acumulator = ()=>{
    const reducer = cart.reduce((accum,val)=>{
       return accum + (val.price * val.quantity)
    },0)
    dispatch(sumTotal(reducer))
    
  }
  const handleCancel = ()=>{
    dispatch(resetCart())
  }
  const navigation=useNavigation()
  useEffect(()=>{
        acumulator()
  },[cart])
  return (
    <>
      {
        cart.length === 0 
        ?( 
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Image source={Cart} style={{height:150, width:150}} />
          <Text style={{fontSize:20, fontWeight:'bold', marginTop:10, marginBottom:10}}>No items in the Cart </Text>
          <Button title='Go to Home' onPress={()=>{navigation.navigate('Home')}} />
      </View>
        )
        : (
             <View style={{alignItems:'center', marginTop:top*2}}>
               <FlatList
                 data={cart}
                 renderItem={({item})=> <CartItem item={item} />}
                 scrollEnabled={false}
                 showsVerticalScrollIndicator={false}
                />
                <View style={styles.totalContainer}>
                <Text style={{fontSize:17, fontWeight:'800'}}>Total:{total}</Text>
                <View style={{flexDirection:'row', gap:8}}>
                <TouchableOpacity
                 onPress={()=> navigation.navigate('Order')} 
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
      
    </>
  )
}

const styles = StyleSheet.create({
  totalContainer:{
    position:'relative', 
    bottom:-50, 
    backgroundColor:'white', 
    width:300, 
    height:80, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    padding:8,
    borderRadius:18
  }
})