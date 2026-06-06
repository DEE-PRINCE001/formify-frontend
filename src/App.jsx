import { useState } from 'react'
import Hero from './components/Hero'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import { Routes, Route } from 'react-router-dom';
import AnalyticsPage from './pages/AnalyticsPage';
import RespondentPage from './pages/RespondentPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


export default function App() {
  return (
  // <div className="bg-primary font-inter w-screen min-h-screen max-sm:px-5 px-15 pt-5">
  <>
    <ToastContainer
    position='top-center'
    autoClose={2000}/>
     <Routes>
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder" element={<FormBuilder />} />
      <Route path="/analytics/:id" element={<AnalyticsPage />} />
      <Route path="/form/:id" element={<RespondentPage />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      
     </Routes>
  </>
  //  </div>

  )

}