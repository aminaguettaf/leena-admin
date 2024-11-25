import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { AdminContext } from '../../Context/Context';
import { toast } from 'react-toastify';

const Navbar = () => {

  const {setAToken} = useContext(AdminContext);

  const logout = ()=>{
    setAToken('');
    localStorage.removeItem('atoken');
    toast.success('You have logged out');
  }

  return (
    <div className='nav-bar'>
      <div className='container d-flex align-items-center justify-content-between py-2'>
        <div className='logo d-flex align-items-center gap-2'>
          <Link><img src={logo} alt=''/></Link>
          <p className='px-2 py-1'>Admin</p>
        </div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar;
