import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/footer.css';

export default function Footer() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            Daily-blog<span className="logo-dot">.</span>
          </Link>
          <span className="footer-dot">&bull;</span>
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Ayush Tiwari
          </span>
        </div>
        <div className='footer-dot'>Email : ayush.ayushtiwari.99@gmail.com</div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>

          {authStatus ? (
            <>
              <Link to="/all-posts" className="footer-link">All Posts</Link>
              <Link to="/add-post" className="footer-link footer-link-primary">Write</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/signup" className="footer-link footer-link-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
