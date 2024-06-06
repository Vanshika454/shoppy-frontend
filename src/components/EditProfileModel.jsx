import React, { useState } from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import Error from './Error'
import Loader from './Loader'
import editUserData from '../services/user/editUserData';
import useAuth from '../hooks/useAuth';

export default function EditProfileModel({ onClose }) {

  const { setUser } = useAuth();

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name && !dob && !profilePicture) {
      setError('Atleast one field is required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('image', profilePicture);

    try {
      setLoading(true);
      const data = await editUserData(formData);
      setUser(data);

      onClose && onClose();
    } catch (err) {
      setErrorMessage(error.message);
      setIsErrOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <Modal>
        <p className='border-bottom fw-bold fs-5 m-0 p-3' >Edit Profile</p>

        <form
          onSubmit={handleSubmit}
          className='p-3'
        >
          <input 
            className="form-control mb-4"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            className="form-control mb-4"
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          { 
            profilePicture ? <img 
              src={URL.createObjectURL(profilePicture)}
              alt="UploadedImage" 
              style={{ width: '98%', height: 'auto', margin: '1%'}}
              className='mb-3'
            /> : 
            <div className='position-relative mx-3 mb-3' style={{ height: '1.25rem', width: '1.25rem' }}>
              <input 
                type="file" 
                alt='Upload Image'
                style={{ height: '100%', width: '100%', zIndex: 20, opacity: 0}}
                onChange={(e) => {
                  if(e.target.files.length > 0) {
                    setProfilePicture(e.target.files[0]);
                  }
                }}
                className='top-0 start-0 position-absolute'
                src='https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png'  
              />

              <FontAwesomeIcon 
                icon={faImage} 
                color='black'
                style={{ height: '100%', width: '100%', zIndex: 10 }}
                className='position-absolute top-0 start-0'
              />
            </div>
          }
          {
            error && <p className='text-danger px-3'>{error}</p>
          }
          <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
            <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
            <button type='submit' className='btn btn-primary'>Edit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
