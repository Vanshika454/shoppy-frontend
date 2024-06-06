import React, { useState, useEffect } from 'react'

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import CreateNewProduct from '../../components/CreateNewProducts';

import getAllProducts from '../../services/product/getAllProducts';
import { useNavigate } from 'react-router-dom';

export default function Index() {

  const [products, setProducts] = useState([]);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts(0, 'INFINITE');
        setProducts(data?.reverse());
      } catch (error) {
        
      }
    })();
  }, [])

  const handleOnProductCreatedSuccess = (product) => {
    setProducts([
      product,
      ...products,
    ])
  }

  return (
    <>
      { isCreatingProduct && <CreateNewProduct onClose={() => setIsCreatingProduct(false)} onSuccess={handleOnProductCreatedSuccess} /> }
      <div>
        <Header />
        <div className='d-flex justify-content-end'>
          <button className='px-4 py-2 rounded m-4'
            onClick={() => setIsCreatingProduct(true)}
          >
            + Create New Product
          </button>
        </div>

        <p style={{  }} className='fw-semibold m-2 fs-4' >Products: </p>
        <div className='d-flex p-2 gap-3 flex-wrap' style={{ minHeight: '70vh' }}>
          {
            products?.map((product, ind) => {
              return <Product key={ind} product={product} />
            })
          }
        </div>
        <Footer />
      </div>
    </>
  )
}

function Product({ product }) {

  const navigate = useNavigate();

  return (
    <div 
      className='p-2 border rounded hover-hand' 
      style={{ width: '13rem', height: '17rem' }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img 
        src={process.env.REACT_APP_BACKEND + product.image} 
        alt="" 
        className='border rounded'
        style={{height: '60%', width: '100%', objectFit: 'contain'}}
      />

      <p className='fw-semibold my-1'>{product.name}</p>
      <p className='m-0' style={{ fontSize: '0.9rem' }}>{product.description.slice(0,20) + '...'}</p>
      <p className='m-1 fw-semibold'>${product.price}</p>
      <div className='d-flex align-items-center'>
        <p className='m-0 me-2' style={{ fontSize: '0.9rem' }}>Rating: {product.rating}/5</p>
        <FontAwesomeIcon icon={faStar} color='gold' />
      </div>
    </div>
  )
}
