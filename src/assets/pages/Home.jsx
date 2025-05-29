import React, {useContext, useEffect} from 'react'
import { EventContext } from '../contexts/EventContext'
import { BookingContext } from '../contexts/BookingContext'


const Home = () => {
const {events, fetchEvents} = useContext(EventContext)
const {bookings, fetchBookings} = useContext(BookingContext)

useEffect(() => {

  fetchEvents()
  fetchBookings()
}, [])

console.log(bookings)

  if (events == null || bookings == null) {return <p>Loading...</p> }
    
  return (
    <>
    <div className='dashboard'>
        <div className='event-amount-card'>
          <div className='dashboard-icon'>
            <i class="bi bi-calendar4-event"></i>
          </div>
          <div className='card-amount-info'>
            <span className='amount-description'>Upcoming events</span>
            <span className='amount-number'>{events.length}</span>
          </div>
        </div>
           <div className='event-amount-card'>
          <div className='dashboard-icon'>
            <i class="bi bi-calendar4-event"></i>
          </div>
          <div className='card-amount-info'>
            <span className='amount-description'>Total bookings</span>
            <span className='amount-number'>{bookings.length}</span>
          </div>
        </div>
      </div>   

  </> 
  )
}

export default Home