import React from 'react'
import {useDispatch} from 'react-redux'
import authservice from '../../appwrite/auth.js'
import {logout} from '../../store/authslice.js'
import {Button} from '../index.js'

function Logout() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }

  return (
      <Button bg="#111827" onClick={logoutHandler}>
        Logout
      </Button>
  )
}

export default Logout