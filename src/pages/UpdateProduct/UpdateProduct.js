import React, { useContext, useState } from 'react';
import './UpdateProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../Context/Context';
import Title from '../../Components/title/Title';


const UpdateProduct = () => {
    const{productList}= useContext(AdminContext);
    const params = useParams();
    const navigate = useNavigate();

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors =['Black', 'White', 'Blue', 'Red', 'Pink', 'Orange', 'Yellow'];

    const [size, setSize] = useState([]);
    const[color, setColor] = useState([]);
    const[data, setData] = useState({
        name: '',
        price:'',
        category:'',
        description:''
    })
    const[image1, setImage1] = useState(false);
    const[image2, setImage2] = useState(false);
    const[image3, setImage3] = useState(false);
    const[image4, setImage4] = useState(false);

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

    const product = productList.filter(p=> p._id === params.id);

  return (
    <div className='update-product'>
      <div className='container'>
        <Title title="update product"/>
        <form className='p-5'>
            <p className='fw-bold mb-2'>Upload image</p>
            <div className='picture mb-3'>
                <div>
                    <label for='image1'>
                        {image1 ?  
                        <img src={URL.createObjectURL(image1)} alt=''/>:
                        <i className="fa-solid fa-upload"></i>
                        }
                    </label>
                    <input onChange={(e)=>setImage1(e.target.files[0])} id='image1' type='file' hidden/>
                </div>
                <div>
                    <label for='image2'>
                        {image2 ?  
                        <img src={URL.createObjectURL(image2)} alt=''/>:
                        <i className="fa-solid fa-upload"></i>
                    }
                    </label>
                    <input onChange={(e)=>setImage2(e.target.files[0])} id='image2' type='file' hidden/>
                </div>
                <div>
                    <label for='image3'>
                        {image3 ?  
                        <img src={URL.createObjectURL(image3)} alt=''/>:
                        <i className="fa-solid fa-upload"></i>
                    }
                    </label>
                    <input onChange={(e)=>setImage3(e.target.files[0])} id='image3' type='file' hidden/>
                </div>
                <div>
                    <label for='image4'>
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
                    <input name='name' value={data.name}   className='w-100 p-2' type='text' placeholder='Name' required/>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Product price</p>
                    <input name='price' value={data.price}   className='w-100 p-2' type='number' placeholder='Price' required/>
                </div>
                <div className='input mb-3'>
                    <p className='mb-2'>Category</p>
                    <select name='category' value={data.category}   className='w-100 p-2'>
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
                    <textarea name='description' value={data.description}  rows='5' className='w-100 p-2' placeholder='write product description'></textarea>
                </div>
                <button type='submit' className='bg-black text-light p-2'>Update Product</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProduct
