import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import Product from '../../components/Product'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

import getProduct from '../../services/product/getProduct'

export default function Index() {

  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setErrorMessage(error.message);
        setIsErrOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div>
        <Header />
        <Product product={product} />
        <Footer />
      </div>
    </>
  )
}
