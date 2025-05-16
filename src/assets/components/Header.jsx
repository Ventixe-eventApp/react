import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation();

  const titles = {
      '/events': 'Events',
      '/home': 'Home',
      '/dashboard': 'Dashboard',
  }

  const putPath = Object.keys(titles).find(path => location.pathname.startsWith(path))


  const title = titles[putPath] || 'test'
  return (
    < header className='header-title'>{title}</header>
  )
}

export default Header