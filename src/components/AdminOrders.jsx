import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import getAllOrders from '../services/order/getAllOrders';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import Error from './Error';

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAllOrders();
        setOrders(data?.reverse());
      } catch (error) {
        setErrorMessage(error.message);
        setIsErrOpen(true);
      } finally {
        setLoading(false);
      }
    })()
  }, [user])

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div className=''>
        <p className='fw-semibold m-4'>All Orders: </p>

        <div className='d-flex flex-column m-2 gap-2'>
          {
            orders?.map((order, index) => (
              <Order key={index} order={order} />
            ))
          }
        </div>
      </div>
    </>
  )
}

function Order({ order }) {

  const navigate = useNavigate();
  let total = order.products?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  total = total - total * 0.1;

  const handleOrderClick = () => {
    console.log('Hii')
    navigate(`/order/${order._id}`)
  }

  return (
    <div className='border p-2 rounded hover-hand'
      onClick={handleOrderClick}
    >
      <div className='d-flex justify-content-between mx-2 my-1'>
        <p className='m-0'>Ordered on:  {new Date(order?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} </p>
        <p className='m-0'>Total: ${total}</p>
      </div>
      <div className='d-flex flex-wrap'>
        {
          order?.products?.map((item, index) => {
            return <Product key={index} product={item.product} quantity={item.quantity} />
          })
        }
      </div>
    </div>
  )
}

function Product({ product, quantity }) {
  return (
    <div className='border rounded p-2 m-2' style={{ width: '20rem' }}>
      <img 
        src={process.env.REACT_APP_BACKEND + product?.image}
        alt={product?.name}
        style={{ objectFit: 'contain', width: '100%', height: '15rem' }}
      />
      <p className='fw-semibold fs-5 m-0'>{product.name}</p>
      <p className='mb-3'>{product.description?.slice(0,25) + '...'}</p>
      <p className='mb-1'>Quantity: {quantity}</p>
      <p className='mb-1'>Price: ${product.price}</p>
    </div>
  )
}
