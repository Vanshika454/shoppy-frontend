import React, { useState } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CartProduct from '../../components/CartProduct'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

import useCart from '../../hooks/useCart'
import createNewOrder from '../../services/order/createOrder'

export default function Index() {

  const { cart, setCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      await createNewOrder(cart);

      alert('Order created successfully');
      setCart([]);
    } catch (error) {
      setErrorMessage(error.message);
      setIsErrOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div> 
        <Header />
        {
          cart.length > 0 && <div className='d-flex flex-column gap-3 m-4'>
            {
              cart.map((item, index) => (
                <CartProduct key={index} product={item.product} quantity={item.quantity} />
              ))
            }

            <div className='p-2 border rounded'>
              <p className='fw-semibold fs-5'>Cost</p>
              <div className='d-flex justify-content-between'>
                <div className='' style={{ width: '75%' }}>
                  <p>MRP</p>
                  <p>Delivery charges</p>
                  <p>Other charges</p>
                  <p>Discount(10%)</p>
                  <p className='fw-semibold'>Total</p>
                </div>
                <div className='' style={{ width: '25%' }}>
                  <p className='text-center'>${cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</p>
                  <p className='text-center'>$0</p>
                  <p className='text-center'>$0</p>
                  <p className='text-center'>-${cart.reduce((acc, item) => acc + item.product.price * item.quantity * 0.1, 0)}</p>
                  <p className='text-center fw-semibold'>${cart.reduce((acc, item) => acc + item.product.price * item.quantity * 0.9, 0)}</p>
                </div>
              </div>
            </div>
            <button 
              className='mx-auto px-4 py-2 rounded'
              onClick={handleCreateOrder}
            >
              Order Now
            </button>
          </div>
        }
        {
          cart.length === 0 && <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
            <p className='fs-3'>Your cart is empty</p>
          </div>
        }
        <Footer />
      </div>
    </>
  )
}
