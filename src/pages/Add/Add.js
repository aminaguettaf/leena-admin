import React, { useState, useContext, useEffect} from 'react';
import './Add.css';
import Title from '../../Components/title/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../Context/Context';
import axios from 'axios';
import {toast} from 'react-toastify';

const Add = ({state}) => {
    const{productList}= useContext(AdminContext);
    const params = useParams();
    const navigate = useNavigate();
    const product = productList.find(p=> p._id === params.id);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors =['Black', 'White', 'Blue', 'Red', 'Pink', 'Orange', 'Yellow'];

    const [size, setSize] = useState(product?.sizes || []);
    const[color, setColor] = useState(product?.colors || []);
    const[image1, setImage1] = useState(false);
    const[image2, setImage2] = useState(false);
    const[image3, setImage3] = useState(false);
    const[image4, setImage4] = useState(false);
    const[data, setData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        category: product?.category || '',
        description: product?.description || ''
    })
    // useEffect(() => {
    //     if (state === 'update' && product) {
    //         setData({
    //             name: product.name,
    //             price: product.price,
    //             category: product.category,
    //             description: product.description,
    //         });
    //         setSize(product.sizes);
    //         setColor(product.colors);
    //     }
    //     console.log(product)
    // }, [state, product]);

    const handleSize = (e)=>{
        setSize((prev)=>{
            if(prev.includes(e)){
                return prev.filter((size)=> size !== e);
            }
            else{
                return [...prev, e];
            }
        })    
    }
    const handleColor = (e)=>{
        setColor((prev)=>{
            if(prev.includes(e)){
                return prev.filter((color)=> color !== e);
            }
            else{
                return [...prev, e];
            }
        })
    }

    const onChangeHandler =(e)=>{
        const {name, value} = e.target;
        setData((prev)=>({...prev, [name]:value}));
    }

    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('description', data.description);
            formData.append('sizes', JSON.stringify(size));
            formData.append('colors', JSON.stringify(color));
            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            if(state === 'add'){
                const response = await axios.post('https://leena-backend-5.onrender.com/api/product/add-product', formData);
                if(response.data.success){
                    toast.success(response.data.message);
                    setImage1(false);
                    setImage2(false);
                    setImage3(false);
                    setImage4(false);
                    setSize([]);
                    setColor([]);
                    setData({
                        name: '',
                        price:'',
                        category:'',
                        description:''
                    })
                }
                else{
                    toast.error(response.data.message);   
                }
            }
            else{
                const response = await axios.post('https://leena-backend-5.onrender.com/api/product/update-product', formData);
                if(response.data.success){
                    toast.success(response.data.message);
                    navigate('/products-list');
                }
                
                else{
                    toast.error(response.data.message);   
                    console.log(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);   
        }
        
    }
  return (
    <div className='add p-4'>
        <Title title={`${state ==='add' ? 'add product' : 'update product'}`} />
        <form onSubmit={onSubmitHandler} className='p-5'>
        <p className='fw-bold mb-2'>Upload image</p>
          <div className='picture mb-3'> 
            <div>
              <label htmlFor='image1'>
              {image1 ?  
                <img src={URL.createObjectURL(image1)} alt=''/>:
                <i className="fa-solid fa-upload"></i>
              }
              </label>
              <input onChange={(e)=>setImage1(e.target.files[0])} id='image1' type='file' hidden/>
            </div>
            <div>
              <label htmlFor='image2'>
              {image2 ?  
                <img src={URL.createObjectURL(image2)} alt=''/>:
                <i className="fa-solid fa-upload"></i>
              }
              </label>
              <input onChange={(e)=>setImage2(e.target.files[0])} id='image2' type='file' hidden/>
            </div>
            <div>
              <label htmlFor='image3'>
              {image3 ?  
                <img src={URL.createObjectURL(image3)} alt=''/>:
                <i className="fa-solid fa-upload"></i>
              }
              </label>
              <input onChange={(e)=>setImage3(e.target.files[0])} id='image3' type='file' hidden/>
            </div>
            <div>
              <label htmlFor='image4'>
              {image4 ?  
                <img src={URL.createObjectURL(image4)} alt=''/>:
                <i className="fa-solid fa-upload"></i>
              }
              </label>
              <input onChange={(e)=>setImage4(e.target.files[0])} id='image4' type='file' hidden/>
            </div>
          </div>
            <div className='form-content '>
                <div className='input mb-3'>
                    <p className='mb-2'>Product name</p>
                    <input name='name' value={data.name} onChange={onChangeHandler}  className='w-100 p-2' type='text' placeholder='Name' required/>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Product price</p>
                    <input name='price' value={data.price} onChange={onChangeHandler}   className='w-100 p-2' type='number' placeholder='Price' required/>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Category</p>
                    <select name='category' value={data.category} onChange={onChangeHandler}  className='w-100 p-2'>
                        <option>Choose category</option>
                        <option value="New collection">New collection</option>
                        <option value="Robes">Robes</option>
                        <option value="Aid collection">Aid collection</option>
                        <option value="Manteaux">manteaux</option>
                        <option value="Combinaisons">Combinaisons</option>
                        <option value="Ensembles">Ensemble</option>
                        <option value="Jogging">Jogging</option>
                        <option value="Blazers">Blazers</option>
                        <option value="Liquettes">Liquettes</option>
                        <option value="Jupes">Jupes</option>
                        <option value="Pantalons">Pantalons</option>
                        <option value="Abayas">Abayas</option>
                        <option value="Costumes">Costumes</option>
                        <option value="Costumes">Sweater</option>
                    </select>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Colors</p>
                    <div className='colors d-flex gap-2'>
                    {colors.map((c, index)=>{
                        return(
                            <p onClick={()=>handleColor(c)} className={`color p-2 ${color.includes(c) && "active"}`} key={index}>{c}</p>
                        )
                    })}
                    </div>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Sizes</p>
                    <div className='sizes d-flex gap-2'>
                    {sizes.map((s, index)=>{
                        return(
                            <p onClick={()=>handleSize(s)} className={`size p-2 ${size.includes(s) && 'active'}`} key={index}>{s}</p>
                        )
                    })}
                    </div>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Description</p>
                    <textarea name='description' value={data.description} onChange={onChangeHandler} rows='5' className='w-100 p-2' placeholder='write product description'></textarea>
                </div>
                <button type='submit' className='bg-black text-light p-2'>{state === 'add' ? 'Add Product': 'Upadate Product'}</button>
            </div>
        </form>
    </div>
    )
}
export default Add;

