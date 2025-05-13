
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Events from './assets/pages/Events'
import Home from './assets/pages/Home'

function App() {


  return (
        <EventProvider>
    <Routes>
      <Route path='/events' element={<Events/> }/>
      <Route path='/home' element= {<Home/>} />
 
    </Routes>
    </EventProvider>
  )
}

export default App
