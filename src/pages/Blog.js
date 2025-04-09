import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import BasicTipsMarketMusic from './blog/BasicTipsMarketMusic'

export default function Blog() {
  return (
    <>
    <TopNavbar/>
    <Container className='main-content'>
      <h1 className='text-center txt-cool'>Blog</h1>
    <div className="card mt-5 mb-5" style={{"width": "18rem"}}>
      <img src="headphones-4595492_1280.jpg" className="card-img-top" alt="Basic Tips on how to Market your music image"/>
      <div className="card-body">
        <h5 className="card-title">Basic Tips on how to Market your music</h5>
        <p className="card-text">In the fast paced and constantly evolving music world we currently live in, and one which boasts of thousands and thousands of music artistes, the success of nowadays musicians especially the upcoming ones is almost not guaranteed unless some pertinent things are put into consideration. In this article, I have decided to put together a few tips for upcoming musicians like you that will definitely help your career push.</p>
        <Link to={"/blog/basic-tips-market-music"} className="btn btn-primary">Read</Link>
      </div>
    </div>
    </Container>
    <Footer/>
    </>
  )
}
