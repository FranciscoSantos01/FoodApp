import { View, TouchableOpacity,Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuantity } from '../../store/cart/cartSlice'

export const Buttons = ({value,name}) => {
    const[count,setCount]= useState(value)
    const dispatch = useDispatch()
    const addCount =  ()=>{
        setCount(count + 1)
        dispatch(addQuantity(name))
    }

    const restCount = ()=>{
        setCount(count -1)
    }
  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <TouchableOpacity onPress={addCount}  style={styles.button}>
     <Text style={{fontSize:15}}>+</Text>
    </TouchableOpacity>
    <Text style={{fontSize:18, marginHorizontal:5}}> {count} </Text>
    <TouchableOpacity  style={styles.button} onPress={restCount}>
     <Text style={{fontSize:15}}>-</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        width:30,
        height:30, 
        borderRadius:100,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderColor: 'gray',
        borderWidth:1
    }
})