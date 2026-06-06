import React from 'react'

const Button = ({type, disabled, text, bg, icon, size, color, shadow, sh, hover, onClick, otherStyles}) => {
  return (
    <button type={type || 'button'} disabled={disabled} className={`cursor-pointer transition duration-300 ${bg || 'bg-primary'} 
    ${color === 'secondary' ? 'text-[#141F33]' : 'text-white'} 
    rounded-xl ${size || 'h-10 w-30 text-xs'} 
    ${shadow || sh && 'shadow-md shadow-primary/30'} 
    ${hover || "hover:scale-105"} ${otherStyles || ''}`} onClick={onClick} >
      {text}
      {icon && <img src={icon} alt="arrow" className={`w-4 h-4 ml-2 inline`}/>}
    </button>
  )
}

export default Button