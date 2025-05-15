import React, { useContext, useEffect } from 'react'
import { EventContext } from '../contexts/EventContext'
import EventCard from '../components/EventCard'

const Events = () => {
const {events, fetchEvents} = useContext(EventContext)

useEffect(() => {

  fetchEvents()
}, [])

if(!events || events.lenght === 0) return <p>No events to show</p>

  return (
    <>
    <h1>Events</h1>
    <div className='event-list'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

    </div>
    </>
  )
}

export default Events