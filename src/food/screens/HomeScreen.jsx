import { View, Text, Dimensions, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { MenuScroll } from '../components/MenuScroll'
import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { RestaurantsScroll } from '../components/RestaurantsScroll'
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../hooks/useAuthStore'

const heightScreen = Dimensions.get('screen').height
export const HomeScreen = () => {
  const{top}= useSafeAreaInsets()
  const[docs,setDocs]= useState()
  const[categorie,setCategorie] = useState("all")
  const[selectedCategorie, setSelectedCategorie]= useState()
  const{displayName}=useSelector(state=>state.auth)
  const{startLogout}= useAuthStore()
 

   const getData = async()=>{
    const querySnapshot = await getDocs(collection(FirebaseDB,'restaurants'))
    const restaurants = []
    querySnapshot.forEach((doc)=>{
      restaurants.push({id:doc.id, ...doc.data()})
    })
    setDocs(restaurants)
   }
   const changeCategorie = (category)=>{
    setCategorie(category)
     if(category !== 'all'){
      const filter = docs.filter(item=> item.category === category)
      setSelectedCategorie(filter)
     }
   }

   const handleLogOut = ()=>{
      startLogout();
   }
  //  const filterCategory = ()=>{
  //     console.log(docs.filter(item=> item.category === categorie))
  //  }
  useEffect(() => {
    getData()
  }, [])

    
  return (
    <ScrollView>
     <View style={{backgroundColor:'black', height: heightScreen * 0.22, flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:22, color:'white', fontWeight:'700', marginTop: top + 20, marginHorizontal:20}}>Hi {displayName} </Text>
      <MaterialIcons name="logout" size={34} color="red" style={{marginTop:top + 20, marginHorizontal:20}} onPress={handleLogOut}  />
    </View>
      <TextInput placeholder='only for style' style={styles.serchbar} />
      <MenuScroll changeCategorie={changeCategorie} />
      <View style={{alignItems:'center'}}>
        {
          categorie === 'all' ? <RestaurantsScroll restaurants={docs} /> : <RestaurantsScroll restaurants={selectedCategorie} />
        }
      
      </View>
    </ScrollView>
   
  )
}

const styles = StyleSheet.create({
  serchbar:{
    padding: 15,
    width: 330,
    borderRadius:20,
    backgroundColor:'white',
    height: 65,
    top:-45,
    left: 20
  }
})