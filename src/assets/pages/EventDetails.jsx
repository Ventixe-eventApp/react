import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EventContext } from '../contexts/EventContext';

const EventDetails = () => {
 const {id} = useParams();
 const {selectedEvent, fetchEventById} = useContext(EventContext)

 useEffect(()=> {
    fetchEventById(id)

 }, [id])
  return (


    <div>EventDetails</div>
  )
}

export default EventDetails