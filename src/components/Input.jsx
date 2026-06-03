import React from 'react'

const Input = ({type, name, value, onChange, required, placeholder, ohterStyles}) => {
  return (
        <input className={`py-3 px-5 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${ohterStyles || ''}`}
            type={type || 'text'}
            name={name}
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
          />
  )
}

export default Input