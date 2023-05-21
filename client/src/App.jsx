import Login from './pages/login'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import OwnerDashboard from './pages/ownerDashboard'
import Register from './pages/register'
import Property from './pages/property'
function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ownerdashboard" element={<OwnerDashboard />} />
            <Route path="/dashboard/property/:property_id" element={<Property />} />
        </Routes>
    )
}

export default App;