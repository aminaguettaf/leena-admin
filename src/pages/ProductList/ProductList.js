import React, { useContext, useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../Components/title/Title';
import { AdminContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const {productList, setProductList} = useContext(AdminContext);
    const navigate = useNavigate();

    const getAllProducts = async()=>{
        try {
            const response = await axios.get('https://leena-backend-5.onrender.com/api/product/get-products');
            if(response.data.success){
            setProductList(response.data.data);
            console.log(response.data.data)}
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }
    const removeProduct = async(id)=>{
        try {
            const response = await axios.post('https://leena-backend-5.onrender.com/api/product/delete-product', {productId:id});
            if(response.data.success){
                toast.success(response.data.message);
                getAllProducts();
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <div className='products-list p-4'>
      <Title title="all products"/>
      <div className='table header px-4 py-2 mb-3'>
        <p>product</p>
        <p>sizes</p>
        <p>colors</p>
        <p>category</p>
        <p>price</p>
        <p>update</p>
        <p>delete</p>
      </div>
      {productList.map((product, index)=>{
        return(
        <div key={index} className='table body px-4 py-2 mb-3'>
            <div className='d-flex align-items-center gap-3'>
                <img src={`https://leena-backend-5.onrender.com/images/${product.image[0]}`} alt=''/>
                <p className='name'>{product.name}</p>
            </div>
            <div className='sizes d-flex gap-2'>
                {product.sizes.map((size, indexSize)=>{
                    return(
                        <p key={indexSize}>{size}</p>
                    )
                })}
            </div>
            <div className='colors d-flex gap-2'>
                {product.colors.map((color, indexcolor)=>{
                    return(
                        <p key={indexcolor}>{color}</p>
                    )
                })}
            </div>
            <p>{product.category}</p>
            <p>{product.price} D.A</p>
            <i onClick={()=>navigate(`/update-product/${product._id}`)} className="fa-solid fa-pen-to-square text-center update"></i>
            <i onClick={()=>removeProduct(product._id)} className="fa-solid fa-xmark text-center delete"></i>
            
        </div>
    )
          })}
    </div>
  )
}
  


export default ProductList
