import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

import useAuth from '../hooks/useAuth'
import { USER_STATE } from '../contexts/AuthContext';
import Loader from './Loader';
import Error from './Error';

import getUserData from '../services/user/getUserData';

export default function AuthManager({ children }) {

  const { setUser } = useAuth();
  const authCookie = Cookies.get('jwt');
  const [loading, setLoading] = useState(false);

  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!authCookie) {
      setUser({
        state: USER_STATE.FAILED,
      });
    } else {
      (async () => {
        try {
          setLoading(true);
          const data = await getUserData();

          setUser({
            state: USER_STATE.SUCCESS,
            ...data
          })
          setIsErrOpen(false);
        } catch (error) {
          setErrorMessage(error.message);
          setIsErrOpen(true);
          setUser({
            state: USER_STATE.FAILED,
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [authCookie, setUser]);

  if(loading) return <>
    { loading && <Loader /> }
  </>

  return (
    <>
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      {children}
    </>
  )
}
