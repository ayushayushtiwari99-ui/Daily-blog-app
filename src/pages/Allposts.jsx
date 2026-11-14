import React, { useState, useEffect } from 'react'
import { Container, Postcard } from '../components'
import service from '../appwrite/data'
import './pagescss/allposts.css'

function Allposts() {
    const [posts, setposts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])

    return (
        <section className="allposts-section">
            <Container>
                <div className="allposts-header">
                    <h1 className="allposts-heading">All Posts</h1>
                </div>
                <div className="allposts-grid">
                    {posts.map((post) => (
                        <div key={post.$id} className="allposts-grid-item">
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Allposts
