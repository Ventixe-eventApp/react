import React from 'react'
import { useLocation } from 'react-router-dom'
import { getTitleFromPath } from '../../utils/navigationPaths';

const Header = () => {
  const { pathname } = useLocation()
  const title = getTitleFromPath(pathname)
  
  return (
    < header className='header-title'>{title}</header>
  )
}

export default Header