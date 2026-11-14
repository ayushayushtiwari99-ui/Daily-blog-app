import React , {forwardRef, useId} from 'react'
import './css/select.css'

function Select({
    options,
    label,
    ...props
},ref) {
    const id = useId()
  return (
    
    <div className='container'>
        {label && <label htmlFor={id}>{label}</label>}
        <select {...props} id = {id} ref = {ref} className='status' >
           {options?.map((option) => (
            <option key={option} value={option} >
                {option}
            </option>
           ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)