import { useNavigation } from '@react-navigation/native'
import { View,Text,TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';



const initalForm ={
    email:"",
    password:""
}
const formValidations = {
    email: [ (value) => value.includes('@'), 'email invalid'],
    password: [ (value) => value.length >= 6, 'password invalid.'],
  }


export const LoginScreen= ()=> {
    const{onInputChange,email,password, formState,isFormValid,emailValid,passwordValid}=useForm(initalForm,formValidations)
    const{startLoginWithEmailPassword}=useAuthStore()
    const[formSub, setFormSub]=useState(false)
    const{top}=useSafeAreaInsets()
   const navigation =useNavigation()
    const[secure,SetSecure]=useState(true)
    const toggle = ()=>{
        SetSecure(!secure)
    }
    const submit = ()=>{
        setFormSub(true);
        if(!isFormValid) return;
      startLoginWithEmailPassword({email:email,password:password})
    }

  return (
      <View style={{marginTop: top + 30}}>
        <Text style={{fontSize:35, fontWeight:'bold' ,textAlign:'center'}}>FoodTrack</Text>
        <Text style={{fontSize:16, fontWeight:'500', color:'gray', alignSelf:'center', textAlign:'center', marginTop:10, width:230}}>
            Please enter your email adress & enter password
        </Text>

        <View style={{alignItems:'center', marginTop: 50}}>
            <View style={styles.inputContainer}>
                <TextInput 
                value={email} 
                placeholder='Enter your email'
                style={styles.input}
                onChangeText={(text)=> onInputChange(text,'email')}
                  />
                <MaterialIcons name="email" size={24} color="black" style={{position:'absolute', top:16 , right: 10}} />
                {!!emailValid && formSub && <Text style={{color:'red', fontWeight:'bold', fontSize:14,width:300}}>{emailValid}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                secureTextEntry={secure} 
                value={password}
                placeholder='Enter your password'
                style={styles.input}
                onChangeText={(text)=>onInputChange(text,"password")}
                  />
                <MaterialIcons name="remove-red-eye" size={24} color="black" style={{position:'absolute', top:16 , right: 10}} onPress={toggle} />
                {!!passwordValid && formSub && <Text style={{color:'red', fontWeight:'bold', fontSize:14,width:300}}>{passwordValid}</Text>}
            </View>
        </View>
        <View style={{alignItems:'center', marginTop: 50}}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={submit}> 
                <Text style={{color:'white', textAlign:'center', fontSize:18, fontWeight:'bold'}}>
                    Login
                </Text>
            </TouchableOpacity>
            <View style={{marginTop:16, flexDirection:'row', gap:2}}>
            <Text style={{fontSize:16, fontWeight:'500', color:'gray', textAlign:'center', }}>
                Don't have an account?
            </Text>
            <TouchableWithoutFeedback onPress={()=> navigation.navigate('Register')}>
                <Text style={{color:'blue', fontSize:16, fontWeight:'500'}}>sign up</Text>
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
        marginBottom: 8
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