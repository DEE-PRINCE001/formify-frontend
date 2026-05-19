import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
   <div className="bg-primary w-screen h-screen px-15 pt-5">
     <Navbar></Navbar>
     <Hero></Hero>
   </div>

  )

}