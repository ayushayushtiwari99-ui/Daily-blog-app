import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authslice'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading,setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect( () => {

    authservice.getCurrentUser()
    .then( ( userData ) => {
      if(userData){
        dispatch(login({userData: userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))

  } , [])

  return !loading ? (
    <div>
      <div className=''>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
