import React from 'react'
import { Outlet } from 'react-router-dom'

const BookingLayout = () => {
  return (
    <div className='booking-layout'>
        <Outlet/>
        </div>
  )
}

export default BookingLayout