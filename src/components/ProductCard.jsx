import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  return (
    <div 
      className='p-2 border rounded hover-hand' 
      style={{ width: '13rem', height: '17rem' }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img 
        src={process.env.REACT_APP_BACKEND + product.image} 
        alt="" 
        className='border rounded'
        style={{height: '60%', width: '100%', objectFit: 'contain'}}
      />

      <p className='fw-semibold my-1'>{product.name}</p>
      <p className='m-0' style={{ fontSize: '0.9rem' }}>{product.description.slice(0,20) + '...'}</p>
      <p className='m-1 fw-semibold'>${product.price}</p>
      <div className='d-flex align-items-center'>
        <p className='m-0 me-2' style={{ fontSize: '0.9rem' }}>Rating: {product.rating}/5</p>
        <FontAwesomeIcon icon={faStar} color='gold' />
      </div>
    </div>
  )
}
