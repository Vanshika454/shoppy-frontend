import React from 'react'

export default function Loader() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.7)'} }>
      <div className='' style={{ width: '2rem', height: '2rem' }}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}
