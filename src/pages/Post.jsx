import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/data'
import { Button, Container } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import './pagescss/post.css'

function Post() {
    const [post, setpost] = useState(null)
    const { slug } = useParams()
    const nevigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    const isauthor = post && userData ? post.user === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setpost(post)
                } else {
                    nevigate("/")
                }
            })
        } else {
            nevigate("/")
        }
    }, [slug, nevigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.image)
                nevigate("/")
            }
        })
    }

    return post ? (
        <article className="post-page">
            <Container>
                <div className="post-wrapper">
                    <div className="post-image-wrapper">
                        {post.image && (
                            <img
                                src={service.getFilePreview(post.image)}
                                alt={post.title}
                                className="post-banner-img"
                            />
                        )}
                    </div>

                    {isauthor && (
                        <div className="post-actions">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bg="#111827">
                                    Edit
                                </Button>
                            </Link>

                            <Button bg="#dc2626" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    <div className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                    </div>

                    <div className="post-content">
                        {post.content ? parse(post.content) : ""}
                    </div>
                </div>
            </Container>
        </article>
    ) : null
}

export default Post
