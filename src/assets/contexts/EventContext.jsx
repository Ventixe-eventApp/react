import React, { createContext, useState, useEffect} from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
  
    const fetchEvents =  async () => {
    try {
         
        const res = await fetch('https://localhost:7020/api/event/')

        if(res.ok) {
        const data = await res.json()
         setEvents(data)
        }
    }  
     catch(error) {
        console.error("Something went wrong:", error)
     }
  }
     const fetchEventsById = async (id) => {

        try {
            const res = await fetch(`https://localhost:7020/api/event/${id}`)

            if(res.ok) {
            const data = await res.json()
            setSelectedEvent(data)
            }
            else {
                console.error("Could not find event:", id)
            }

        }
        catch(error){
            console.error("Something went wrong:", error)
        }
     }

useEffect(() => {

        fetchEvents()
    }, [])

 return (
    <EventContext.Provider value= {{events, selectedEvent, fetchEvents, fetchEventsById}}>
        {children}
    </EventContext.Provider>
 )

}

export default EventProvider