import React, { createContext, useState, useEffect} from "react";
import apiConfig from "../../config/apiConfig";

export const EventContext = createContext()

const EventProvider = ({children}) => {

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
  
    const fetchEvents =  async () => {
    try {
         
        const res = await fetch(`${apiConfig.event}/api/Event`)

        if(res.ok) {
        const data = await res.json()
         setEvents(data.result)
        }
    }  
     catch(error) {
        console.error("Something went wrong:", error)
     }
  }
     const fetchEventsById = async (id) => {

        try {
            const res = await fetch(`${apiConfig.event}/api/Event/${id}`)

            if(res.ok) {
            const data = await res.json()
            setSelectedEvent(data.result)
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