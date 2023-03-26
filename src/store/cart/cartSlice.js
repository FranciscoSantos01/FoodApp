import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart:[],
        total: 0,
        location:null
    },
    reducers: {
         addProduct: (state, {payload} ) => {
             state.cart.push(payload)
         },
         deleteProduct: (state, {payload})=>{
            state.cart = state.cart.filter(item=> item.name !== payload)
         },
         addQuantity:(state, {payload})=>{
            state.cart.map(item=>{
                if(item.name === payload){
                    item.quantity +=1
                }
                return item
            })
         },
         resetCart:(state)=>{
            state.cart= []
         },
         sumTotal:(state,{payload})=>{
            state.total = payload
         },
         addLocation:(state,{payload})=>{
            state.location = payload
         }
     }
});


export const { addProduct,deleteProduct,addQuantity,sumTotal,addLocation,resetCart } = cartSlice.actions;