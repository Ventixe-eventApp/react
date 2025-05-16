import React from 'react'

const EventCard = ({ event }) => {
  return (
   
    <div className="event-card">
      <div className='event-image'>
      {event.imagePath && (<img src={event.imagePath} alt={event.eventName} className="event-image" /> )}
      </div>
     <p className='date'>
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
      
      <p className='location'><i class="bi bi-geo-alt"></i> {event.location}</p> 
      <p className='price'> ${event.price.toFixed(0)}</p>
    </div>
  )
}
export default EventCard

//Fortsätt med cards