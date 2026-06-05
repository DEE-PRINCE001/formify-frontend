import { useState } from 'react'
import Hero from './components/Hero'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import { Routes, Route } from 'react-router-dom';
import AnalyticsPage from './pages/AnalyticsPage';
import RespondentPage from './pages/RespondentPage';


export default function App() {
  return (
  // <div className="bg-primary font-inter w-screen min-h-screen max-sm:px-5 px-15 pt-5">
     <Routes>
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder" element={<FormBuilder />} />
      <Route path="/analytics/:id" element={<AnalyticsPage />} />
      <Route path="/form/:id" element={<RespondentPage />} />
     </Routes>
  //  </div>

  )

}