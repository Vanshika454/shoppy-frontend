import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Loader from '../../components/Loader'
import Error from '../../components/Error'

import getOrderById from '../../services/order/getOrderById'

export default function Index() {

  const { id } = useParams();
  const [ order, setOrder ] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        setErrorMessage(error.message);
        setIsErrOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const subTotal = order?.products?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = 0.1 * order?.products?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subTotal - discount;

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div>
        <Header />
        <div className='d-flex' style={{ minHeight: '80vh' }}>
          <div className='p-4 border-end' style={{ width: '40%' }}>
            <p className='fs-5 fw-semibold' >Order Details</p>

            <div className='d-flex'>
              <div className='' style={{ width: '75%' }}>
                <p className='mb-1'>Sub Total: </p>
                <p className='mb-1'>Discount: </p>
                <p className='mb-1'>Delivery: </p>
                <p className='mb-1'>Total: </p>
              </div>
              <div className='' style={{ width: '25%' }}>
                <p className='mb-1'>${subTotal}</p>
                <p className='mb-1'>${discount}</p>
                <p className='mb-1'>${0}</p>
                <p className='mb-1 fw-semibold'>${total}</p>
              </div>
            </div>

            <p className='mt-5 text-center text-bg-success'>
              Thanks for being a customer of shoppy!
            </p>
          </div>
          <div className='p-2 d-flex flex-wrap overflow-scroll' style={{ width: '60%' }}>
            {
              order?.products?.map((item, index) => {
                return <Product key={index} product={item.product} quantity={item.quantity} />
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

function Product({ product, quantity }) {
  return (
    <div className='border rounded p-2 m-2' style={{ width: '20rem', height: '25rem' }}>
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
