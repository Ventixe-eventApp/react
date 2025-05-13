import React, { createContext, useState, useEffect} from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {

    const [events, setEvents] = useState([])
  

    useEffect(() => {
        const fetchData =  async () => {

        const res = await fetch('www.rl.se/haha')
        if(res.ok) {
        const data = await res.json()
         setEvents(data)
        }

     }

        fetchData()
    }, [])

 return (
    <EventContext.Provider value= {{events}}>
        {children}
    </EventContext.Provider>
 )

}

export default EventProvider