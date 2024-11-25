import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { AdminContext } from '../../Context/Context';

const Login = () => {
  const{setatoken} = useContext(AdminContext);

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', {email, password});
      if(response.data.success){
        setatoken(response.data.atoken);
        localStorage.setItem('atoken', response.data.atoken);
        toast.success('You have logged in');
      }
      else{
        toast.error(response.data.message);
      }
    }catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='login'>
      <p className='title text-center fw-bold'> Login </p>
      <form onSubmit={onSubmitHandler}>
        <div className='mb-3'>
          <p className='mb-1'>Email</p>
          <input type='email' className='w-100 px-2 py-1' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className='mb-3'>
          <p className='mb-1'>Password</p>
          <input type='password' className='w-100 px-2 py-1' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
        </div>
        <button type='submit' className='mb-3 w-100 px-2 py-1'>Login</button>
        
      </form>
    </div>
  )
}

export default Login
