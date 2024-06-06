import React from 'react'

import homeIntro from '../images/home-intro.jpg';

export default function HomeIntro() {
  return (
    <div className='position-relative' style={{ height: '40vh', width: '100%' }}>
      <div className='tint' style={{ height: '100%', width: '100%' }}>
        <img 
          src={homeIntro}
          alt="shoppy" 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}

        />
      </div>
      <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
        <p className='m-0 fw-bold fs-2' style={{ color: 'white' }}>Shoppy</p>
      </div>
    </div>
  )
}
