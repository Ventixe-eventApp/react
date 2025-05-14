import React from 'react'
import SideNav from '../components/SideNav'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PortalLayout = () => {
  return (
    <div className='portal-wrapper'>
      <SideNav/>
      <Header/>
       <main>
        <Outlet/>
        </main>
       <Footer/>
        </div>
  )
}

export default PortalLayout