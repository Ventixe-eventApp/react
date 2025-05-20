import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation();

  const titles = {
      
      '/home': 'Dashboard',
      '/events': 'Events',
      '/event/' : 'Event Details',
      
  }

  const putPath = Object.keys(titles).find(path => location.pathname.startsWith(path))


  const title = titles[putPath] || ''
  return (
    < header className='header-title'>{title}</header>
  )
}

export default Header