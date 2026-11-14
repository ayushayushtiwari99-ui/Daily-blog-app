import React from 'react'
import './css/button.css'

function Button({children,bg,onClick,type}) {
    
  return (
    <button  onClick={onClick} style={{backgroundColor: bg }} className='btn' type={type}>{children} </button>
  )
}

export default Button