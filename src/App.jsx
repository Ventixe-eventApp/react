
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Events from './assets/pages/Events'
import Home from './assets/pages/Home'
import EventProvider from './assets/contexts/EventContext'

import EventDetails from './assets/pages/EventDetails'

import LoginForm from './assets/components/LoginForm'
import RegisterForm from './assets/components/RegisterForm'
import PortalLayout from './assets/layouts/PortalLayout'
import EventBooking from './assets/pages/EventBooking'
import AuthLayout from './assets/layouts/AuthLayout'
import BookingLayout from './assets/layouts/BookingLayout'
import BookingConfim from './assets/pages/BookingConfim'
import UserProfileForm from './assets/components/UserProfileForm'
import VerifyEmailPage from './assets/pages/VerifyEmailPage'

function App() {


  return (
    <EventProvider>
      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<LoginForm/>}/>
          <Route path='register' element={<RegisterForm/>}/>
          <Route path='register/profile' element={<UserProfileForm/>}/>
          <Route path='register/verify' element={<VerifyEmailPage/>}/>
        </Route>
      
        <Route element={< PortalLayout/>}>
          <Route path='/' element= {<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/event/:id' element={<EventDetails/>}/>
          </Route>
          <Route element={< BookingLayout/>}>
          <Route path='/event/booking/:id' element={<EventBooking/>}/>
          <Route path='/event/booking/confirmation/' element={<BookingConfim/>}/>
        </Route>
      
      </Routes>
    </EventProvider>
  )
}

export default App
  
