import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
   <div className='center-screen'>
       <main>
        <Outlet/>
        </main>
    </div>
  )
}

export default AuthLayout