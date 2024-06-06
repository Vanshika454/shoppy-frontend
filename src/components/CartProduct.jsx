import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import useCart from '../hooks/useCart'

export default function CartProduct({ product, quantity }) {

  const { setCart } = useCart();

  return (
    <div className='p-2 d-flex border rounded border-black'>
      <div className='border rounded' style={{ width: '25%', aspectRatio: 1 }}>
        <img 
          src={process.env.REACT_APP_BACKEND + product.image} 
          alt={product.name}
          className='m-2'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div className='p-4'>
        <p className='fs-3 fw-semibold'>{product.name}</p>
        <p>{product.description.slice(0, 200) + '...'}</p>

        <p className='fw-semibold'>${product.price}</p>

        <div className='d-flex align-items-center mb-4'>
          <p className='m-0'>{product.rating}</p>
          <FontAwesomeIcon icon={faStar} color='gold' />
        </div>

        <button className='px-4 py-2 rounded'
          onClick={() => {
            setCart(prev => {
              return prev.filter(item => item.product._id !== product._id)
            })
          }}
        >
          remove Product
        </button>

        <div className='d-flex align-items-center mt-2'>
          <p className='m-0 fw-semibold me-3'>Quantity: </p>
          <button style={{ width: '2rem', height: '2rem' }} onClick={() => {
            if(quantity === 1) {
              setCart(prev => {
                return prev.filter(item => item.product._id !== product._id)
              })
            }
            else setCart(prev => {
              return prev.map(item => {
                if(item.product._id === product._id) {
                  return {
                    ...item,
                    quantity: item.quantity - 1
                  }
                }
                return item;
              })
            })
          }} >-</button>
          <p className='m-0 mx-3'>{quantity}</p>
          <button style={{ width: '2rem', height: '2rem' }} onClick={() => {
            setCart(prev => {
              return prev.map(item => {
                if(item.product._id === product._id) {
                  return {
                    ...item,
                    quantity: item.quantity + 1
                  }
                }
                return item;
              })
            })
          }} >+</button>
        </div>
      </div>
    </div>
  )
}
