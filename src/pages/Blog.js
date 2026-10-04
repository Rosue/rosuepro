import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { blogPostsByNewest, formatPublishedDate } from '../data/blogPosts'

export default function Blog() {
  const posts = blogPostsByNewest()

  return (
    <>
    <TopNavbar/>
    <Container as="main" id="main-content" className='main-content'>
      <h1 className='text-center txt-dark'>Jamaica website &amp; WhatsApp guides</h1>
      <p className="text-center text-muted mx-auto" style={{ maxWidth: '40rem' }}>
        Practical articles on website pricing, WhatsApp chatbots, and online tools for Jamaican small businesses — from RosuePro in Kingston and island-wide.
      </p>
      <div className='blog-article-cards d-flex flex-wrap justify-content-center gap-4 w-100 mt-5 mb-5'>
        {posts.map((post) => (
          <article className="card" style={{ width: '18rem' }} key={post.path}>
            <Link to={post.path}>
              <img
                src={post.image}
                className="card-img-top"
                alt={post.imageAlt}
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <div className="card-body d-flex flex-column">
              <p className="small text-muted mb-2">
                <time dateTime={post.datePublished}>{formatPublishedDate(post.datePublished)}</time>
              </p>
              <h2 className="h5 card-title">
                <Link to={post.path} className="text-reset text-decoration-none">{post.cardTitle}</Link>
              </h2>
              <p className="card-text flex-grow-1">{post.cardExcerpt}</p>
              <Link to={post.path} className="btn btn-primary mt-auto align-self-start">{post.ctaLabel}</Link>
            </div>
          </article>
        ))}
    </div>
    </Container>
    <Footer/>
    </>
  )
}
