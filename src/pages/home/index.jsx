import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HomeIntro from '../../components/HomeIntro'
import ProductCard from '../../components/ProductCard'
import Error from '../../components/Error'

import getAllProducts from '../../services/product/getAllProducts'
import Loader from '../../components/Loader'

export default function Index() {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(currentPage, pageSize);
        setProducts(data.products?.reverse());
        setTotalPages(data.totalPages);
      } catch (error) {
        setErrorMessage(error.message);
        setIsErrOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, pageSize])

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div>
        <Header />
        <HomeIntro />
        <div className='p-4 d-flex flex-wrap gap-4'>
          {
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          }
        </div>

        <div className='m-4 d-flex justify-content-between'>
          { currentPage > 1 ? <button className='px-4 py-2 rounded' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button> : <div/> }
          { currentPage < totalPages ? <button className='px-4 py-2 rounded' onClick={() => setCurrentPage(currentPage + 1)}>Next</button> : <div/> }
        </div>
        <Footer />
      </div>
    </>
  )
}
