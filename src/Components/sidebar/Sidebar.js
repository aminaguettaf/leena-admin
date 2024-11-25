import React, {useState} from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const[activeLink, setActiveLink] = useState('dash');
  return (
    <div className='side-bar'>
      <ul>
        <li onClick={()=>setActiveLink('dash')} className={`${activeLink === 'dash' && 'active'}`}><Link to='/admin-dashboard' className='d-flex align-items-center gap-2 p-3'><i className="fa-solid fa-house fa-fw"></i> <span>Dashboard</span></Link></li>
        <li onClick={()=>setActiveLink('order')} className={`${activeLink === 'order' && 'active'}`}><Link to='/all-orders' className='d-flex align-items-center gap-2 p-3'><i className="fa-solid fa-calendar-days fa-fw"></i> <span>Orders</span></Link></li>
        <li onClick={()=>setActiveLink('add')} className={`${activeLink === 'add' && 'active'}`}><Link to='/add-product' className='d-flex align-items-center gap-2 p-3'><i className="fa-solid fa-plus fa-fw"></i> <span>Add Product</span></Link></li>
        <li onClick={()=>setActiveLink('list')} className={`${activeLink === 'list' && 'active'}`}><Link to='/products-list' className='d-flex align-items-center gap-2 p-3'><i className="fa-solid fa-users fa-fw"></i> <span>Products List</span></Link></li>
    </ul>

    
    </div>
  )
}

export default Sidebar
