import React, { useState } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import UserOrders from '../../components/UserOrders'

import EditProfileModel from '../../components/EditProfileModel'

import useAuth from '../../hooks/useAuth'
import { USER_TYPES } from '../../config/constants'

export default function Index() {

  const { user } = useAuth();
  const [showEditProfileModel, setShowEditProfileModel] = useState(false);

  return (
    <>
      {showEditProfileModel && <EditProfileModel onClose={() => setShowEditProfileModel(false)} />}
      <div>
        <Header />
        <div className='m-4 d-flex flex-column justify-content-between' style={{ minHeight: '80vh' }}>
          <div className=''>
            <div className='d-flex justify-content-between'>
              <div className='d-flex'>
                <div className='p-5' style={{ width: '20rem', aspectRatio: 1 }}>
                  <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}>
                    {
                      user.profilePicture? <img
                        src={process.env.REACT_APP_BACKEND + user.profilePicture}
                        alt='profile'
                        className='rounded-circle'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      /> : 
                      (user.name && <p className='text-center m-0' style={{ fontSize: '5rem' }}>{user.name[0]}</p>)
                    }
                  </div>
                </div>

                <div className='p-4'>
                    <p className='fw-bold fs-3 mb-2'>@{user.userName}</p>
                    <p className='fw-semibold fs-5 m-0'>{user.name}</p>
                    <p className='mb-4'>{user.email}</p>

                    {user.createdAt && <p className='m-0 mb-1'>Joined on: {new Date(user.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</p>}
                    {user.dob && <p className='m-0'>Date of Birth: {new Date(user.dob).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</p>}
                </div>
              </div>

              <div className='d-flex justify-content-center' style={{ width: '15rem' }}>
                  <div className='d-flex flex-column'>
                    <button className='py-2 rounded mb-4' onClick={() => setShowEditProfileModel(true)} >Edit Profile</button>
                    {user.role === USER_TYPES.ADMIN && <p className='fs-5 p-2 px-5 rounded border border-success border-2' style={{ backgroundColor: 'rgba(0,255,0,0.25)' }}>Admin</p>}
                  </div>
              </div>
            </div>

            {
              <UserOrders />
            }
          </div>

          {/* <div className='align-items-center d-flex mt-4' style={{ width: '' }} >
            <div className='align-items-center d-flex hover-hand'
              onClick={logOut}
            >
              <FontAwesomeIcon 
                icon={faRightFromBracket} 
                style={{ height: '1.5rem', aspectRatio: 1 }}
              />

              <p className='fw-semibold m-0 ms-2'>Logout</p>
            </div>
          </div> */}
        </div>
        <Footer />
      </div>
    </>
  )
}
