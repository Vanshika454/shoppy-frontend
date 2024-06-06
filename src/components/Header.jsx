import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons'

import Sidebar from './Sidebar'

import useCart from '../hooks/useCart'

export default function Header() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div style={{ height: '6rem', backgroundColor: '#FF7D29' }} className='d-flex p-4 justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <FontAwesomeIcon
            icon={faBars}
            color='white'
            style={{
              height: '2rem',
              width: '2rem',
              marginRight: '1rem'
            }}
            onClick={() => setIsSidebarOpen(true)}
            className='hover-hand'
          />

          <p 
            className='m-0 fs-3 fw-bold hover-hand' 
            style={{color: 'white'}}
            onClick={() => navigate('/')}
          >
            Shoppy
          </p>
        </div>

        <div className='d-flex justify-content-center align-items-center gap-5'>
          <div className='position-relative'>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ height: '2rem', aspectRatio: 1 }}
              color='white'
              className='hover-hand'
              onClick={() => navigate('/cart')}
            />
            {
              cart.length > 0 && <div className='position-absolute badge bg-danger rounded-circle' style={{ top: '-.5rem', right: '-.5rem' }}>
                <p className='m-0'>{cart.length}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
