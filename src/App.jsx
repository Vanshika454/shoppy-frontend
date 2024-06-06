import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

import AuthContext, { AuthContextProvider } from "./contexts/AuthContext";
import { CartContextProvider } from "./contexts/CartContext";
import AuthManager from "./components/AuthManager";
import { USER_STATE } from "./contexts/AuthContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogIn from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Product from './pages/productDetails'
import Cart from './pages/cart';
import Profile from './pages/profile';
import Order from './pages/order';

import Admin from './pages/admin';
import ManageProducts from './pages/manageProducts';
import ManageOrders from './pages/manageOrders';

import NotFound from './pages/notFound';
import { USER_TYPES } from "./config/constants";

function App() {
  return (
    <>
      <AuthContextProvider>
      <CartContextProvider>
      <AuthManager>
        <Router>
          <Routes>

            <Route exact path='/login' element={< LogIn />}/>
            <Route exact path='/register' element={< Register />}/>

            <Route element={<PersistantLogin />}>
              <Route exact path='/' element={< Home />}/>
              <Route exact path='/product/:id' element={< Product />}/>
              <Route exact path='/order/:id' element={< Order />}/>
              <Route exact path='/cart' element={< Cart />}/>
              <Route exact path='/profile' element={< Profile />}/>
              <Route element={<AdminRoutes />}>
                <Route exact path='/admin' element={< Admin />}/>
                <Route exact path='/manage-products' element={< ManageProducts />}/>
                <Route exact path='/manage-orders' element={< ManageOrders />}/>
              </Route>
            </Route>

            {/* Not found */}
            <Route path='*' element={ <Navigate to="/404" /> } />
            <Route path='/404' element={< NotFound />} />
          </Routes>
        </Router>

        </AuthManager>
        </CartContextProvider>
      </AuthContextProvider>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
      />
    </>
  );
}

function PersistantLogin() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user.state === USER_STATE.FAILED) navigate('/login');
  }, [user.state, navigate])

  return <Outlet />;
}

function AdminRoutes() {
  const { user } = useContext(AuthContext);
  
  if(user.role !== USER_TYPES.ADMIN) return <Navigate to='/' />;
  return <Outlet />;
}

export default App;
