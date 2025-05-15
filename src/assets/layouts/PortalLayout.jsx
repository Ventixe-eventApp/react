import React from 'react'
import SideNav from '../components/SideNav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

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