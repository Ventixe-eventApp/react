import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="event-card-link">
    <div className="event-card">
      <div className='event-image'>
      {event.imagePath && (<img src={event.imagePath} alt={event.eventName} className="event-image" /> )}
      </div>
     <p className='event-date'>
        {new Date(event.startDate).toLocaleString('en-US', {
            month: 'long',    
            day: 'numeric',   
            year: 'numeric',  
            hour: 'numeric',  
            minute: '2-digit', 
            hour12: true      
          })}
          </p>
        <h2 className='event-name'>{event.eventName}</h2>
      
      <p className='event-location'><i className="bi bi-geo-alt"></i> {event.location}</p> 
      
      <p className='event-price'> ${event.price.toFixed(0)}</p>
    </div>
    </Link>
  )
}
export default EventCard

//Fortsätt med cards