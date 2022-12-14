import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer, filterReducer } from "./Reducers";

const baseUrl = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const Cart = createContext();

const Context = ({ children }) => {
  
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],              //saving productList to state in useReducer
    cart: [],
  });

  const getProducts = async () =>{
    const productsData = await axios.get(baseUrl);
    dispatch({type:"GET_DATA", payload:productsData.data})
    // console.log(productsData.data)    //checking if data recieved or not
  }
  
useEffect(()=>{
    getProducts()
    // console.log("initial",state);  //checking productList state variable
},[])

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byColor: [],
    byGender: [],
    byPrice: "",
    byType:[],
    searchQuery: "",
  });

  // console.log(filterState);

  return (
    <Cart.Provider value={{ state, dispatch, filterState, filterDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;