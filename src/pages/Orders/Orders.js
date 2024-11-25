import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { AdminContext } from '../../Context/Context';
import Title from '../../Components/title/Title'
import {Link} from 'react-router-dom';


const Orders = () => {
  const{atoken, orders, setOrders} = useContext(AdminContext);
  

  const getOrders = async()=>{
    try {
      const response = await axios.post('http://localhost:4000/api/order/all-orders', {}, {headers:{atoken}});
      if(response.data.success){
        setOrders(response.data.orders);
        console.log(response.data.orders)
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    getOrders();
  },[atoken]);

  return (
    <div className='orders p-4'>
      <Title title='all orders' />
      <div className='table header p-2'>
        <p className='fw-bold'>ID</p>
        <p className='fw-bold'>USER NAME</p>
        <p className='fw-bold'>AMOUNT</p>
        <p className='fw-bold'>STATUS</p>
        <p className='fw-bold'>DATE</p>
        <p className='fw-bold'>VIEW</p>
        <p className='fw-bold'>DELETE</p>
      </div>
      {orders.map((order, index)=>{
        return(
          <div className='table body p-2'>
            <p>{index + 1}</p>
            <p>{order.userInfos.data.firstName} {order.userInfos.data.lastName}</p>
            <p>{order.amount} DA</p>
            <p>{order.status}</p>
            <p>{new Date(order.date).toLocaleDateString()}</p>
            <Link to={`/order-details/${order._id}`}><i className="fa-regular fa-eye eye"></i></Link>
            <i className="fa-solid fa-trash trash"></i>
          </div>
        )
      })}
    </div>
  )
}

export default Orders
