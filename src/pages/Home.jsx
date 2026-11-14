import React, { useState, useEffect } from 'react'
import service from '../appwrite/data'
import { Container, Postcard } from '../components/index'
import './pagescss/home.css'

function Home() {
    const [posts, setposts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="home-empty">
                <Container>
                    <div className="home-empty-card">
                        <h2>Please login to view posts</h2>
                        <p>Sign in to explore the latest articles and stories.</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <section className="home-section">
            <Container>
                <div className="home-grid">
                    {posts.map((post) => (
                        <div className="home-grid-item" key={post.$id}>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Home
