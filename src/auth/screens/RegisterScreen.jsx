import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View,Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const initalForm ={
    displayName: "",
    email:"",
    password:""
}
const formValidations = {
    displayName: [ (value) => value.length >= 4, 'The name must contain at least 4 or more characters.'],
    email: [ (value) => value.includes('@'), 'email invalid'],
    password: [ (value) => value.length >= 6, 'password must contains 6 characters or more.'],
  }

export const RegisterScreen = ()=> {
    const[formSub,setFormSub] = useState(false)
    const{onInputChange,displayName,email,password,formState, isFormValid,displayNameValid,emailValid,passwordValid}=useForm(initalForm,formValidations)
    const {startRegisterWithEmailPassword}= useAuthStore();
    const{top}=useSafeAreaInsets()
    const navigation =useNavigation()
    const[secure,SetSecure]=useState(true)
    const toggle = ()=>{
        SetSecure(!secure)
    }
    const onSubmit = ()=>{
      setFormSub(true)
      if(!isFormValid) return;
      startRegisterWithEmailPassword({email:email,password:password,displayName:displayName});
    }
    const keyboardVerticalOffset = -200
  return (
     <View style={{marginTop: top + 30,flex:1}}>
    <Text style={{fontSize:35, fontWeight:'bold' ,textAlign:'center'}}>FoodTrack</Text>
    <Text style={{fontSize:16, fontWeight:'500', color:'gray', alignSelf:'center', textAlign:'center', marginTop:10, width:230}}>
        Please enter your email adress & create password
    </Text>
    <View style={{flex:1,alignItems:'center', marginTop: 50,}}>
    <KeyboardAvoidingView
     style={{flex:1}}
     behavior={Platform.OS === 'ios' ? 'position' : null}
     keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 20}
     enabled
   >  
       <ScrollView style={{height:400, padding:7,overflow:'visible'}} showsVerticalScrollIndicator={false}>  
        <View style={styles.inputContainer}>
        <TextInput
        placeholder='Enter your name'
        style={styles.input}
        value={displayName}
        onChangeText={(text)=>onInputChange(text,"displayName")}  
        />
        {!!displayName && formSub && <Text style={{color:'red', fontWeight:'bold', fontSize:14,width:300}}>{displayNameValid}</Text>}
        </View>
        <View style={styles.inputContainer}>
        <TextInput
        placeholder='Enter your email'
        style={styles.input}
        value={email}
        onChangeText={(text)=>onInputChange(text,"email")}    
        />
        <MaterialIcons name="email" size={24} color="black" style={{position:'absolute', top:16 , right: 10}} />
        {!!emailValid && formSub && <Text style={{color:'red', fontWeight:'bold', fontSize:14,width:300}}>{emailValid}</Text>}
        </View>
        <View style={styles.inputContainer}>
        <TextInput
        placeholder='Enter your password'
        style={styles.input}
        value={password}
        onChangeText={(text)=>onInputChange(text,"password")} 
        secureTextEntry={secure} 
        />
        <MaterialIcons name="remove-red-eye" size={24} color="black" style={{position:'absolute', top:16 , right: 10}} onPress={toggle} />
        {!!passwordValid && formSub && <Text style={{color:'red', fontWeight:'bold', fontSize:14,width:300}}>{passwordValid}</Text>}
        </View>
        </ScrollView> 
        </KeyboardAvoidingView>
        </View>
    <View style={{alignItems:'center', marginTop: 40, flex:1 }}>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onSubmit}> 
            <Text style={{color:'white', textAlign:'center', fontSize:18, fontWeight:'bold'}}>
                Sign up
            </Text>
        </TouchableOpacity>
        <View style={{marginTop:16, flexDirection:'row', gap:2}}>
        <Text style={{fontSize:16, fontWeight:'500', color:'gray', textAlign:'center', }}>
            Already have an account?
        </Text>
        <TouchableWithoutFeedback onPress={()=> navigation.navigate('Login')}>
            <Text style={{color:'blue', fontSize:16, fontWeight:'500'}}>Log In</Text>
            </TouchableWithoutFeedback>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        width: 300,
        height:60,
        padding:10,
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
        marginBottom: 5
    },
    button:{
        backgroundColor:'black',
        padding: 18,
        width: 200,
        height: 60,
        borderRadius: 18
    },
    inputContainer:{
        marginBottom:30
    }
})