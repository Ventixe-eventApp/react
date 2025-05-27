import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import SeatMap from '../images/seat-map.svg';
import PackageItem from '../components/PackageItem';

const EventDetails = () => {
  const { id } = useParams();
  const { selectedEvent, fetchEventsById } = useContext(EventContext)

  useEffect(() => {
    fetchEventsById(id)

  }, [id])

  if (!selectedEvent) {
    return <p>Loading events...</p>
  }

  return (
    <>
      <div className='details-container'>


        <div className='details-card'>
          <div className='details-image'>
            {selectedEvent.imagePath && (<img src={selectedEvent.imagePath} alt={selectedEvent.eventName} className="event-image" />)}
          </div>
          <div className='card-details'>
            <h2 className='details-name'>{selectedEvent.eventName}</h2>
            <div className='detail-date'>
              <span className='details-artist'>{selectedEvent.artistName}</span>
              <span className='date'>
                <i className="bi bi-calendar4-event"></i>
                {new Date(selectedEvent.startDate).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>

            <p className='location'><i className="bi bi-geo-alt"></i> {selectedEvent.location}</p>


            <div className='book-btn'>
              <div className='btn-booking'>
               <Link to= {`/event/booking/${id}`}>
            <button className='btn-primary btn-ticket'>Book ticket</button>
          </Link> 
              </div>
            </div> 

          <div className="divider"></div>

        <div className='description'>
          <p className='description-header'>About Event</p>
          <span className='description-text'> {selectedEvent.description?.trim() || 'More info about event will come shortly.'} </span>
        </div>

          </div>
        </div>


        <div className='package-card'>
        <div className='seat-header'>
          <h3>Seat Plan</h3></div>
          <div className='seat-map'>
          <img src={SeatMap} alt="Map over seat plan" />
        </div>

        <div className='packages'>
          <h3>Packages</h3>
          {selectedEvent.packages && selectedEvent.packages.length > 0 ? (
            <ul className='package-list'>
              {selectedEvent.packages.map((pkg) => (
                <PackageItem key={pkg.id} pkg={pkg} />
              ))}
            </ul>
          ) : (
            <p>No packages available for this event.</p>
          )}
        </div>
         <Link to= {`/event/booking/${id}`}>
            <button className='btn-primary btn-ticket'>Book ticket</button>
          </Link>

        </div>

         
      </div>
    </>
  )
}

export default EventDetails