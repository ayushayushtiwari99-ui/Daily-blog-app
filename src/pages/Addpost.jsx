import React from 'react'
import { Postform, Container } from '../components/index'
import './pagescss/addpost.css'

function Addpost() {
  return (
    <section className="addpost-page">
      <Container>
        <div className="addpost-card">
          <Postform />
        </div>
      </Container>
    </section>
  )
}

export default Addpost
