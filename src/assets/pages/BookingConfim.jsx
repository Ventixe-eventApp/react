import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { EventContext } from '../contexts/EventContext';


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
    <div>
        <h1>Booking Confirmation</h1>
        <span>Booking number: {bookingId}</span>
        <span>{selectedEvent.eventName}</span>
    </div>
    </>
    
  )
}

export default BookingConfim