import {  createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props)=>{
    const [atoken, setatoken] = useState('');
    const[productList, setProductList] = useState([]);
    const[orders, setOrders] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem('atoken')){
            setatoken(localStorage.getItem('atoken'));
        }
    },[])

    const value ={
        atoken, setatoken,
        productList, setProductList,
        orders, setOrders
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}
export default AdminContextProvider;