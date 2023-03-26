import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { addProduct, sumTotal } from '../../store/cart/cartSlice'

 export const RestaurantItems = ({item}) => {

  const dispatch = useDispatch()
   const onAddProduct = (payload)=>{
         dispatch(addProduct(payload))
   }
  return (
    <View 
    style={styles.container}>
        <View style={{marginTop:12, marginHorizontal:20, flexDirection:'row', justifyContent:'space-between'}}>
            <View>
             <Text style={{fontWeight:'600', fontSize:18}}> {item.name} </Text>
              <Text style={{marginTop:5, width:240, color:'gray', fontWeight:'300',fontSize:12}}> {item.ingredients.map(item=> item).join(',')}</Text>
            </View>
            <View style={{justifyContent:'space-between', alignItems:'center'}}>
              <Text>${item.price}</Text>
              <Button title='Add' color='black' onPress={()=> onAddProduct({...item, quantity:1})} />
            </View>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fdfdfd',
       width:320,
       height:100,
       marginTop:10,
       borderRadius:10,
       shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      marginBottom:8
  }
})