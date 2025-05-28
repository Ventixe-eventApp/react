import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { EventContext } from '../contexts/EventContext';
import ConfirmHero from '../images/hero-confirmation.jpg'

const BookingConfim = () => {
    const {selectedEvent, fetchEventsById} = useContext(EventContext)
    const {state} = useLocation();
    const bookingId = state?.bookingId
    const eventId = state?.eventId

     
useEffect(()=> {
    fetchEventsById(eventId)

},[eventId])

  if (!state) {
    return <p>Missing booking information.</p>;
  }

 if (!selectedEvent) {
    return <p>Loading events...</p>
  }

  return (
    <>
 
    <div className='center-screen'>
      <div className='summary-card'>
        <h1>Thank you for you booking!</h1>
        <span>{selectedEvent.eventName}</span>
        <span>{selectedEvent.artistName}</span>
        <span>   {new Date(selectedEvent.startDate).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}</span>
              <p>Booking number: {bookingId}</p>
             </div>

    </div>
    </>
    
  )
}

export default BookingConfim