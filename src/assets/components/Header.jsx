import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTitleFromPath } from '../../utils/navigationPaths';

const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = getTitleFromPath(pathname)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    else {
      setUser(null)
    }
      
  
  }, [pathname])
 
  const handleLogout = async () => {
   try {
    const res = await fetch('https://localhost:7221/api/Auth/logout', {
        method:'POST'
      })

    if(res.ok) {
      localStorage.removeItem('user');
    navigate('/');
    }  
  } catch (error) {
    console.error('Logout failed:', error);
  }


  }
    const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <>
    <header className= "header">
    <div className='header-title'>{title}</div>


    <div className='header-options'>
   {user ? (
          <div className='logged-in'>
            
            <button title='Log-out' className="btn btn-logout" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></button>
            <span className="user-header">{user.firstName} {user.lastName}</span>
          </div>) : 
        
        
          (<div className='not-logged-in'>
          <button className="btn btn-secondary" onClick={handleLogin}>Log in</button>
            <button className="btn btn-secondary" onClick={() => navigate('auth/register')}>Register</button>
            </div>
           )}

          </div>
    
</header>
</>
  )
}

export default Header