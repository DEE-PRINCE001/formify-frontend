import React from 'react'
import forms from '../assets/forms.svg'

const Hero = () => {
  return (
    <div className="flex items-stretch mx-auto text-white justify-between mt-20 w-full">
        <div className="w-full">
            <h3 className="text-[50px] font-bold mb-4">Create custom FORMS <br /> with our easy to use <br /> form builder</h3>
            <p>Get started by creating an account for FREE!</p>
            <form className="flex items-center">
                <input type="email" placeholder="Enter Email Address" 
                className='bg-white text-black focus:outline-none 
                focus:ring-2 focus:ring-blue-500 h-7 w-[70%] rounded-sm' />
                <button type="submit" className="bg-blue-500 text-white rounded-sm text-sm p-3 h-7 ml-4 hover:bg-blue-600">Let's GO</button>
            </form>
            
        </div>
        <div className="w-full ml-5">
            <img src={forms} alt="Forms" className="w-20 h-20 object-contain" />
        </div>
    </div>
  )
}

export default Hero