import React, { createContext, useState, useEffect} from "react";

export const BookingContext = createContext()

const BookingProvider = ({children}) => {

    const [bookings, setBookings] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(null)
  
    const fetchBookings =  async () => {
    try {
         
        const res = await fetch('https://booking-service-ventixe-ana6b3azaketebav.swedencentral-01.azurewebsites.net/api/Booking')

        if(res.ok) {
        const data = await res.json()
         setBookings(data.result)
        }
    }  
     catch(error) {
        console.error("Something went wrong:", error)
     }
  }
     const fetchBookingsById = async (id) => {

        try {
            const res = await fetch(`https://booking-service-ventixe-ana6b3azaketebav.swedencentral-01.azurewebsites.net/api/Booking/${id}`)

            if(res.ok) {
            const data = await res.json()
            setSelectedBooking(data.result)
            }
            else {
                console.error("Could not find booking:", id)
            }

        }
        catch(error){
            console.error("Something went wrong:", error)
        }
     }

useEffect(() => {

        fetchBookings()
    }, [])

 return (
    <BookingContext.Provider value= {{bookings, selectedBooking, fetchBookings, fetchBookingsById}}>
        {children}
    </BookingContext.Provider>
 )

}

export default BookingProvider