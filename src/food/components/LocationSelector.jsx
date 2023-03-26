import { View, Text, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import * as GeoLocation from "expo-location" 
import { MapsPreview } from './MapsPreview'
import { useDispatch } from 'react-redux'
import { addLocation } from '../../store/cart/cartSlice'

export const LocationSelector= ()=> {
    const[Location, setLocation] = useState(null)
    const dispatch = useDispatch()
    const verifyPermissions = async ()=>{
        const{status}= await GeoLocation.requestForegroundPermissionsAsync();
        if(status !== "granted"){
            Alert.alert("No permits to use your location");
            return false
        };
        return true;
    }
    const onHandleLocation = async ()=>{
        const isLocation = await verifyPermissions();
        if(!isLocation) return;
        const geolocation = await GeoLocation.getCurrentPositionAsync({
            timeout: 5000,
        })
        const{latitude, longitude} = geolocation.coords;
        setLocation({lat:latitude, lng:longitude})
        dispatch(addLocation({lat:latitude, lng:longitude}))

    }
  return (
    <View style={Styles.container}>
      <View style={Styles.preview}>
        {!Location ? (
            <Text>No location Choose yet</Text>
        ):(
           <MapsPreview location={{...Location}} />
        )}
      </View>
      <Button
      title='Select location'
      onPress={onHandleLocation}
      color='blue'
       />
    </View>
  )
}

const Styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
    preview:{
        width:"100%",
        height: 180,
        borderColor: 'purple',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,

    }
})