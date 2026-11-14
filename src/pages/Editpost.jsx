import React, { useState, useEffect } from 'react'
import { Container, Postform } from '../components/index'
import service from '../appwrite/data'
import { useNavigate, useParams } from 'react-router-dom'
import './pagescss/editpost.css'

function Editpost() {
  const [post, setpost] = useState(null)
  const { slug } = useParams()
  const nevigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post)
        } else {
          nevigate("/")
        }
      })
    }
  }, [slug, nevigate])

  return post ? (
    <section className="editpost-page">
      <Container>
        <div className="editpost-card">
          <Postform post={post} />
        </div>
      </Container>
    </section>
  ) : null
}

export default Editpost
