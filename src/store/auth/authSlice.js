import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:'checking',
        uid: null,
        displayName:null,
        email: null,
        errorMessage: null

    },
    reducers: {
         logIn: (state, {payload} ) => {
             state.status = 'authorized';
             state.uid = payload.uid;
             state.displayName = payload.displayName;
             state.email = payload.email;
             state.errorMessage = null
         },
         logOut:(state,{payload}) =>{
            state.status = 'unAuthorized';
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.errorMessage = payload?.errorMessage
         },

         checkingCredentials: (state)=>{
            state.status = 'checking'
         }
     }
});


export const { logIn,logOut,checkingCredentials } = authSlice.actions;