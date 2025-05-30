import React, { useContext, useEffect } from 'react'
import { EventContext } from '../contexts/EventContext'
import EventCard from '../components/EventCard'

const Events = () => {
const {events, fetchEvents} = useContext(EventContext)

useEffect(() => {

  fetchEvents()
}, [])

if(!events || events.length === 0) return <p>Loading events..</p>

  return (
    <>
    <div className='event-list'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

    </div>
    </>
  )
}

export default Events