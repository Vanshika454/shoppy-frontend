import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

import useAuth from '../hooks/useAuth'

import { USER_TYPES } from '../config/constants'

export default function Sidebar({ isSidebarOpen, onClose }) {

  const { user } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove('jwt');
    window.location.href = '/login';
  }

  return (
    <>
      {
        isSidebarOpen && <div className='position-fixed top-0 bottom-0 start-0 end-0' style={{ zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className='p-4 d-flex flex-column justify-content-between' style={{ height: '100vh', backgroundColor: 'white', width: '20rem' }}>
            <div>
              <div>
                <FontAwesomeIcon
                  icon={faXmark}
                  color='black'
                  style={{
                    height: '1.5rem',
                    width: '1.5rem'
                  }}
                  onClick={onClose}
                  className='hover-hand'
                />
              </div>

              <p className='mt-4 fw-semibold fs-5 mb-3'>Hi, {user.name}</p>

              { user.role === USER_TYPES.ADMIN && <p className='m-0 mb-1 hover-hand' onClick={() => navigate('/admin')} >Admin</p>}
              <p className='m-0 mb-1 hover-hand' onClick={() => navigate('/profile')} >Profile</p>
            </div>

            <div className='align-items-center d-flex mt-4' style={{ width: '' }} >
              <div className='align-items-center d-flex hover-hand'
                onClick={logOut}
              >
                <FontAwesomeIcon 
                  icon={faRightFromBracket} 
                  style={{ height: '1.5rem', aspectRatio: 1 }}
                />

                <p className='fw-semibold m-0 ms-2'>Logout</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
