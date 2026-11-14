import React, {useId} from 'react'
import './css/input.css'
const Input = React.forwardRef(function Input({
   label,
   placeholder="input here",
   type="text",
   ...props
  },ref
){
  const id = useId()
  return (
    <div className='container'>
      {label && (
                <label className='info' htmlFor={id}>
                    {label}
                </label>
                )
      }
     <input type={type} placeholder={placeholder} ref={ref} {...props} id={id} />
    </div>
  )
})

export default Input