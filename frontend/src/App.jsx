import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import UserProvider from './context/userContext';
import InstallPrompt from "./components/InstallPrompt";  

function App() { 
  return (
   <>
   <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>} />
      </Routes>
    </Router>
     <InstallPrompt />
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize: '13px',
      },
    }}
    />
    </UserProvider>
   </>
  )
}

export default App
