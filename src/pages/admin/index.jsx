import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Error from '../../components/Error';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader';

import getAllOrders from '../../services/order/getAllOrders';
import getAllProducts from '../../services/product/getAllProducts';

export default function Index() {

  const navigation = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isErrorOpen, setIsErrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ordersData = await getAllOrders();
        setOrders(ordersData);
        const productsData = await getAllProducts(0, 'INFINITE');
        setProducts(productsData);
      } catch (error) {
        setErrorMessage(error.message);
        setIsErrOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalOrders = orders?.length;
  const totalProducts = products?.length;

  const totalProductsSold = orders?.reduce((acc, order) => {
    return acc + order.products?.reduce((acc, item) => acc + item.quantity, 0);
  }, 0);
  const totalGrossRevenue = orders?.reduce((acc, order) => {
    return acc + order.products?.reduce((acc, item) => acc + (item.product.price * item.quantity - 0.1 * item.product.price * item.quantity), 0);
  }, 0);

  const averageProductsInOrder = totalProductsSold / totalOrders;
  const averageRevenuePerOrder = totalGrossRevenue / totalOrders;

  const totalProductsInStock = products?.reduce((acc, product) => acc + product.stock, 0);

  let dateWiseOrders = {};
  orders?.forEach(order => {
    const date = new Date(order.createdAt).toDateString();
    dateWiseOrders[date] = dateWiseOrders[date] ? {
      orders: dateWiseOrders[date].orders + 1,
      products: dateWiseOrders[date].products + order.products.reduce((acc, item) => acc + item.quantity, 0),
      revenue: dateWiseOrders[date].revenue + order.products.reduce((acc, item) => acc + (item.product.price * item.quantity - 0.1 * item.product.price * item.quantity), 0)
    } : {
      orders: 1,
      products: order?.products?.reduce((acc, item) => acc + item.quantity, 0),
      revenue: order?.products?.reduce((acc, item) => acc + (item.product.price * item.quantity - 0.1 * item.product.price * item.quantity), 0)
    };
  });

  console.log( dateWiseOrders);

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <div>
        <Header />
        <div>
        <div className='d-flex gap-3 p-2'>
          <div className='p-2 border rounded d-flex flex-column justify-content-between' style={{ width: '50%' }}>
              <div>
                <p className='fs-5 fw-bold'>Orders:</p>

                <div className='d-flex'>
                  <div className='' style={{ width: '70%' }}>
                    <p className='m-0 mb-1'>Number of orders: </p>
                    <p className='m-0 mb-1'>Total Revenue generated: </p>
                    <p className='m-0 mb-1'>Average Number of products sold per order: </p>
                    <p className='m-0 mb-1'>Average Revenue generated per order: </p>
                  </div>
                  <div className='d-flex flex-column align-items-center' style={{ width: '30%' }}>
                    <p className='m-0 mb-1'>{totalOrders}</p>
                    <p className='m-0 mb-1'>${Math.floor(totalGrossRevenue)}</p>
                    <p className='m-0 mb-1'>{Math.floor(averageProductsInOrder)}</p>
                    <p className='m-0 mb-1'>${Math.floor(averageRevenuePerOrder)}</p>
                  </div>
                </div>
              </div>

              <div className='d-flex justify-content-end'>
                <button className='px-4 py-2 rounded border mt-2'
                  onClick={() => {
                    navigation('/manage-orders')
                  }}
                >
                  Manage Orders
                </button>
              </div>
            </div>

            <div className='p-2 border rounded justify-content-between d-flex flex-column' style={{ width: '50%' }}>
              <div>
                <p className='fs-5 fw-bold'>Products:</p>

                <div className='d-flex'>
                  <div className='' style={{ width: '70%' }}>
                    <p className='m-0 mb-1'>Number of different product: </p>
                    <p className='m-0 mb-1'>Number of products sold: </p>
                    <p className='m-0 mb-1'>Number of products in stock: </p>
                  </div>
                  <div className='d-flex flex-column align-items-center' style={{ width: '30%' }}>
                    <p className='m-0 mb-1'>{totalProducts}</p>
                    <p className='m-0 mb-1'>{totalProductsSold}</p>
                    <p className='m-0 mb-1'>{totalProductsInStock}</p>
                  </div>
                </div>
              </div>

              <div className='d-flex justify-content-end'>
                <button className='px-4 py-2 rounded border mt-2'
                  onClick={() => {
                    navigation('/manage-products')
                  }}
                >
                  Manage Products
                </button>
              </div>
            </div>
          </div>

          <div className='m-2 border rounded p-2'>
            <p className='fw-semibold fs-5' >All orders(Date Wise):</p>

            {
              dateWiseOrders && Object.keys(dateWiseOrders).map((date, index) => {
                return <div className='mb-4'>
                  <p className='fw-semibold mb-2'>{date}</p>
                  <div className='d-flex'>
                    <div className='' style={{ width: '33%' }}>
                      <p className='m-0 mb-1'>Number of orders: </p>
                      <p className='m-0 mb-1'>Number of products sold: </p>
                      <p className='m-0 mb-1'>Revenue generated: </p>
                    </div>
                    <div className='d-flex flex-column align-items-center' style={{ width: '33%' }}>
                      <p className='m-0 mb-1'>{dateWiseOrders[date].orders}</p>
                      <p className='m-0 mb-1'>{dateWiseOrders[date].products}</p>
                      <p className='m-0 mb-1'>${Math.floor(dateWiseOrders[date].revenue)}</p>
                    </div>
                  </div>

                  <hr />
                </div>
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
