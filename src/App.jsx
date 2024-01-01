import PrivateRoutes from './components/PrivateRoutes'
import Login from './pages/Login'
import Room from './pages/Room'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import Signup from './pages/Signup'
import { useEffect, useState } from 'react'

function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route element={<PrivateRoutes/>} >
            <Route path='/' element={<Room/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    
  )
}

export default App
