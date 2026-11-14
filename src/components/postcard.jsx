import React from 'react'
import service from '../appwrite/data'
import { Link } from 'react-router-dom'
import './css/postcard.css'

function Postcard({ $id, title, image }) {
  return (
    <Link to={`/post/${$id}`} className="postcard-link">
      <div className="postcard-outer">
        <div className="postcard-card">
          <div className="postcard-media">
            {image && (
              <img
                src={service.getFilePreview(image)}
                alt={title}
                className="postcard-img"
              />
            )}
          </div>
          <div className="postcard-content">
            <h2 className="postcard-title">{title}</h2>
            <span className="postcard-cta">Read article →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Postcard
