
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Events from './assets/pages/Events'
import Home from './assets/pages/Home'
import EventProvider from './assets/contexts/EventContext'
import CenterLayout from './assets/layouts/CenterLayout'
import EventDetails from './assets/pages/EventDetails'
import { AdminLayout } from './assets/layouts/AdminLayout'
import AdminEventForm from './assets/components/AdminEventForm'

import LoginForm from './assets/components/LoginForm'
import RegisterForm from './assets/components/RegisterForm'
import PortalLayout from './assets/layouts/PortalLayout'

function App() {


  return (
    <EventProvider>
      <Routes>
        <Route path='/auth' element={<CenterLayout/>}>
          <Route path='login' element={<LoginForm/>}/>
          <Route path='register' element={<RegisterForm/>}/>
        </Route>
      
        <Route element={< PortalLayout/>}>
          <Route path='/home' element= {<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/event/:id' element={<EventDetails/>}/>
          
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='addevent' element={<AdminEventForm/>}/>
        </Route>

      </Routes>
    </EventProvider>
  )
}

export default App
  
