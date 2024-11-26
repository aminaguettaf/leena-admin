import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useContext} from 'react';
import {AdminContext} from './Context/Context';
import Navbar from './Components/navbar/Navbar';
import Login from './pages/Login/Login';
import Sidebar from './Components/sidebar/Sidebar';
import Add from './pages/Add/Add';
import ProductList from './pages/ProductList/ProductList';
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/OrderDetails/OrderDetails';

function App() {
  const{atoken} = useContext(AdminContext);
  return (
    <div>
      <ToastContainer />
      {!atoken ? 
      <Login />:
      <BrowserRouter basename='/leena-admin'>
        <Navbar />
        <div className='d-flex'>
          <Sidebar />
          <Routes>
            <Route path='/add-product'  element={<Add state='add'/>}/>
            <Route path='/update-product/:id'  element={<Add state='upadate' />}/>
            <Route path='/products-list'  element={<ProductList  />}/>
            <Route path='/all-orders'  element={<Orders />}/>
            <Route path='/order-details/:id' element={<OrderDetails/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
