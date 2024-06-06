import React from 'react'

export default function Modal({ zIndex=100, children }) {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: zIndex, backgroundColor: 'rgba(0,0,0,0.7)' }}> 
      <div className='rounded' style={{ backgroundColor: 'white', width: '30%'}}>
        {children}
      </div>
    </div>
  )
}
