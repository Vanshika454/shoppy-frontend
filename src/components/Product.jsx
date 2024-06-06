import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import useCart from '../hooks/useCart';

export default function Product({ product }) {

  const navigate = useNavigate();
  const { setCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [ isInCart, setIsInCart ] = useState(false);

  useEffect(() => {
    const item = cart.some(item => item.product._id === product._id);
    if (item) setIsInCart(true);
    else setIsInCart(false);
  }, [cart, product]);

  return (
    <div className='d-flex' style={{ height: '40rem' }}>
      <div className='py-2' style={{ width: '50%' }}>
        <img 
          src={process.env.REACT_APP_BACKEND + product.image}
          alt={product.name}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          className='p-2 mx-2 border rounded'
          
        />
      </div>
      <div className='p-4' style={{ width: '50%', height: '100%' }}>
        <div className='' style={{ minHeight: '50%' }}>
          <p className='fs-3 fw-semibold'>{product.name}</p>
          <p>{product.description}</p>

          <p className='fw-semibold'>Price: ${product.price}</p>

          <div className='d-flex align-items-center'>
            <p className='m-0'>{product.rating}</p>
            <FontAwesomeIcon icon={faStar} color='gold' />
          </div>

          <p className=''>{product.stock} pieces left, Hurry up!!</p>
        </div>

        <div>
          {
            isInCart ? <div>
            <p className=''>Added to cart</p>
            </div> : <div className='d-flex align-items-center mb-2'>
              <p className='m-0 fw-semibold me-3'>Quantity: </p>
              <button style={{ width: '2rem', height: '2rem' }} onClick={() => setQuantity(prev => prev - 1)} >-</button>
              <p className='m-0 mx-3'>{quantity}</p>
              <button style={{ width: '2rem', height: '2rem' }} onClick={() => setQuantity(prev => prev + 1)} >+</button>
            </div>
          }
          
          {
            isInCart? <div className='flex'>
              <button
                className='px-4 py-2 rounded me-3'
                onClick={() => {
                  setCart(prev => {
                    const data = prev.filter(item => item.product._id !== product._id);
                    return data;
                  })
                }}
              >
                Remove from Cart
              </button>

              <button
                className='px-4 py-2 rounded'
                onClick={() => {
                  navigate('/cart');
                }}
              >
                Order Now
              </button>
            </div> : <button className='px-4 py-2 rounded'
              onClick={() => {
                setCart(prev => {
                  return [
                    ...prev,
                    {
                      product,
                      quantity
                    }
                  ]
                })
              }}
            >
              Add to Cart
            </button>
          }
        </div>
      </div>
    </div>
  )
}
