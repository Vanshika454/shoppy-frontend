import React from 'react'

export default function Footer() {
  return (
    <div className='p-5' style={{ backgroundColor: '#1A2130' }}>
      <div className='d-flex justify-content-center align-items-start'>
        <div className='mx-5 d-flex flex-column align-items-center'>
          <p className='mb-4 fw-semibold fs-5' style={{ color: 'white' }} >Women</p>

          <p className='mb-1' style={{ color: 'white' }} >Dresses</p>
          <p className='mb-1' style={{ color: 'white' }} >Pants</p>
          <p className='mb-1' style={{ color: 'white' }} >Skirts</p>
        </div>

        <div className='mx-5 d-flex flex-column align-items-center'>
          <p className='mb-4 fw-semibold fs-5' style={{ color: 'white' }} >Men</p>

          <p className='mb-1' style={{ color: 'white' }} >Shirts</p>
          <p className='mb-1' style={{ color: 'white' }} >Pants</p>
          <p className='mb-1' style={{ color: 'white' }} >Hoodies</p>
        </div>

        <div className='mx-5 d-flex flex-column align-items-center'>
          <p className='mb-4 fw-semibold fs-5' style={{ color: 'white' }} >Kids</p>
        </div>

        <div className='mx-5 d-flex flex-column align-items-center'>
          <p className='mb-4 fw-semibold fs-5' style={{ color: 'white' }} >Links</p>

          <p className='mb-1' style={{ color: 'white' }} >Home</p>
          <p className='mb-1' style={{ color: 'white' }} >Contact</p>
        </div>
      </div>

      <hr style={{ color: 'white' }} />

      <div className='d-flex justify-content-center'>
        <p style={{ color: 'white', marginBottom: '-1rem' }}>Copyright @Ecommrce 2023-2025</p>
      </div>
    </div>
  )
}
