import React from 'react'

import { NavLink } from 'react-router-dom'

const SideNav = () => {
  return (
    <>
    <section className='nav'>
      <div className='logo'>
      <img className='logo-img' src="/icons/ventixe-logo.svg" alt="Logo Ventixe" />
      <span className='logo-text'>Ventixe</span>
    </div>


    <nav className='nav-list'>
     
      <NavLink to='/'className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>
          <i className="bi bi-border-all"></i>
        <span className="nav-text">Dashboard</span> 
      </NavLink>
  
   <NavLink to='/events'className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>
          <i className="bi bi-ticket"></i>
        <span className="nav-text">Events</span>
    </NavLink>
    </nav>
   


    </section>
    </>
   
  )
}

export default SideNav