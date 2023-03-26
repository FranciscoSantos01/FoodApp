import { useDispatch } from "react-redux"
import { firebaseLogOut, logInWithEmailPassword, registerWithEmailPassword } from "../firebase/providers";
import { checkingCredentials, logIn, logOut } from "../store/auth/authSlice";


export const useAuthStore = ()=>{
  
    const dispatch = useDispatch();

  const startRegisterWithEmailPassword = async({email,password,displayName})=>{
          dispatch(checkingCredentials());

          const response = await registerWithEmailPassword({email,password,displayName})
          

          if(!response.ok) return dispatch(logOut(response.errorMessage))
          dispatch(logIn({uid:response.uid,email:response.email,displayName:response.displayName}))
  }

  const startLoginWithEmailPassword = async ({email,password})=>{
     dispatch(checkingCredentials())        
    const response = await logInWithEmailPassword({email,password})
    if(!response.ok) return dispatch(logOut(response.errorMessage))
    dispatch(logIn({uid:response.uid,email:response.email,displayName:response.displayName}))
  }

  const startLogout = async ()=>{
     await firebaseLogOut();
     dispatch(logOut())
  }










    return{
        startRegisterWithEmailPassword,
        startLoginWithEmailPassword,
        startLogout
    }
}