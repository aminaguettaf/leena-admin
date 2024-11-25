import React, { useContext } from 'react';
import './OrderDetails.css';
import { useParams } from 'react-router-dom';
import { AdminContext } from '../../Context/Context';
import Title from '../../Components/title/Title';

const OrderDetails = () => {
    const params = useParams();
    const {orders} = useContext(AdminContext);
    const order = orders?.find(o => o._id === params.id);
    if(order){
        return (
            <div className='order-details p-4'>
                <Title title='order details'/>
                <div className='order-infos d-flex gap-4'>
                    <div>
                        {order.items.map((item, index)=>{
                            return(
                                <div key={index} className='order d-flex align-items-center gap-2 mb-3'>
                                    <img src={`http://localhost:4000/images/${item.image[0]}`} alt=''/>
                                    <div className=''>
                                        <p className='mb-3'>{item.name} x {item.quantity} <span className='fw-bold'>{item.size} {item.color}</span></p>
                                        <p>{item.price} DA</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p className='mb-3 fw-bold name'>{order.userInfos.data.firstName} {order.userInfos.data.lastName}</p>
                        <p className='mb-3'>{order.userInfos.data.phone}</p>
                        <p className='mb-3'>{order.userInfos.data.alladdress}</p>
                        <p>{`${order.userInfos.address.country} - ${order.userInfos.address.wilaya} - ${order.userInfos.address.city} - ${order.userInfos.address.code}`}</p>
                    </div>
                </div>
                <div className='mt-5'>
                    <p className='mb-3'>Amount: {order.amount} DA</p>
                    <p className='mb-3'>Payment: {order.paymentMethod}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
            </div>
          )
    }

}

export default OrderDetails
