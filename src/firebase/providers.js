
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async()=>{
     
    try {
        const result = await signInWithPopup(FirebaseAuth,googleProvider)
        const response = result.user
        return{
            ok:true,
            response
        }
    } catch (error) {
        const errorCode = error.code;
    const errorMessage = error.message;
     return{
        ok:false,
        errorCode,errorMessage
    }
} 
}

export const registerWithEmailPassword = async ({email,password,displayName})=>{
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
        const{uid} = result.user
        await updateProfile(FirebaseAuth.currentUser,{displayName})
        return{
            ok:true,
            uid,email,displayName
        }
    } catch (error) {
        console.log(error)
         return{
            ok:false,
            errorMessage: error.message
         }
    }
}

export const logInWithEmailPassword = async({email,password})=>{
    try {
         const result = await signInWithEmailAndPassword(FirebaseAuth,email,password)
         const{uid,displayName}= result.user
         return{
            ok:true,
            uid,displayName,email
         }
    } catch (error) {
        console.log(error)
         return{
            ok:false,
            errorMessage: error.message
         }
    }
}


export const firebaseLogOut = async()=>{
    return await FirebaseAuth.signOut();
}