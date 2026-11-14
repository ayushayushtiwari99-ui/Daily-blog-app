import React from 'react'
import {Container ,Logout} from '../index.js'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../css/header.css'

function Header() {
  const authStatus = useSelector( (state) => state.auth.status )
  const navigate = useNavigate()
  
  const naitem = [
    {
      name: 'home',
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "all posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "add post",
      slug: "/add-post",
      active: authStatus,
    }
  ]
  return (
    <header className='outer'>
      <Container>
        <nav className='nav'>
          <div className='container'>
            <Link to="/">
              Daily-blog
            </Link>
          </div>
          <ul className='lists'>
             {naitem.map( (item) => 
             item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='' >{item.name}</button>
              </li>
              ) : null
              )}
              {authStatus && (
                <li>
                  <Logout />
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header