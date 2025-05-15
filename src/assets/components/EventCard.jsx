import React from 'react'

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className='event-image'>
      {event.imagePath && (<img src={event.imagePath} alt={event.eventName} className="event-image" /> )}
      </div>
      <h2 className='event-name'>{event.eventName}</h2>
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
      <p className='location'><strong>Location:</strong> {event.location}</p> 
      <p className='price'><strong>Price:</strong> ${event.price.toFixed(2)}</p>
    </div>
  );
};
export default EventCard

//Fortsätt med cards