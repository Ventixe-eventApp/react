
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Events from './assets/pages/Events'
import Home from './assets/pages/Home'
import EventProvider from './assets/contexts/EventContext'
import CenterLayout from './assets/layouts/CenterLayout'
import EventDetails from './assets/pages/EventDetails'
import { AdminLayout } from './assets/layouts/AdminLayout'
import AdminEventForm from './assets/components/AdminEventForm'
import AuthLayout from './assets/layouts/AuthLayout'
import LoginForm from './assets/components/LoginForm'
import RegisterForm from './assets/components/RegisterForm'

function App() {


  return (
    <EventProvider>
      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<LoginForm/>}/>
          <Route path='register' element={<RegisterForm/>}/>
        </Route>
        <Route element={<CenterLayout />}>
          <Route path='/events' element={<Events/>}/>
          <Route path='/events/:id' element={<EventDetails/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='addevent' element={<AdminEventForm/>}/>
        </Route>

      </Routes>
    </EventProvider>
  )
}

export default App
  
