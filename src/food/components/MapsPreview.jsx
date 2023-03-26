import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { API_KEY } from '../../Contansts/Map'

export const MapsPreview = ({location}) => {
    const mapPreview = location 
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=12&size=400x400&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.lat},${location.lng}&key=${API_KEY}`
    : ""

  return (
    <View style={styles.mapPreview} >
      {
        location
        ? <Image style={styles.mapPreview} source={{uri:mapPreview}} />
        : <Text>Failed request</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:'100%'
    },
    mapContainer:{
        justifyContent:'center',
        alignItems:'center'
    }
})