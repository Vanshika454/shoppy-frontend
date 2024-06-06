import React from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import AdminOrders from '../../components/AdminOrders'

export default function Index() {
  return (
    <>
      <div>
        <Header />
        <AdminOrders />
        <Footer />
      </div>
    </>
  )
}
