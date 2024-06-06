import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';

import register from '../../services/auth/register';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

export default function Index() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await register(fullName, email, username, password);

      toast.success('Registered successfully');
      navigate('/login');
    } catch (error) {
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
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <div className="d-flex bg-white overflow-hidden rounded shadow" style={{ height: '50%', width: '60%' }}>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#FF7D29', width: '40%' }}>
            <p className="text-white fs-3">Join Us</p>
            <FontAwesomeIcon 
              color="white"
              style={{ height: '5rem' }}
              icon={faShop}
            />
          </div>

          <div className="d-flex flex-column justify-content-center w-60 p-4" style={{width: '60%'}}>
            <p className="fs-2 fw-bold">Register</p>

            <form
              onSubmit={handleRegister}
            >
              <input 
                className="form-control mb-4"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input 
                className="form-control mb-4"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input 
                className="form-control mb-4"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input 
                className="form-control mb-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-danger m-0">{error}</p>}
              <button type="submit" className="btn btn-dark mb-4 px-4">Register</button>
            </form>

            <p className='fs-6'>Already have an account?<a href="/login" className='fw-semibold m-lg-1' style={{ color: '#FF7D29' }}>Login here</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
