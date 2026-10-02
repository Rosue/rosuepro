import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <>
    <TopNavbar/>
    <Container as="main" id="main-content" className='main-content'>
      <h1 className='text-center txt-dark'>Digital Marketing Blog</h1>
      <div className='d-flex flex-wrap justify-content-center gap-4 w-100 mt-5 mb-5'>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/whatsapp-chatbot-for-business-jamaica.webp" className="card-img-top" alt="Smartphone showing a WhatsApp business chatbot conversation for a Jamaican small business" width="1280" height="720" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">WhatsApp Chatbot for Business Jamaica: How Small Businesses Reply Faster in 2026</h5>
            <p className="card-text">Looking for a WhatsApp chatbot for business Jamaica? This guide explains what a bot does for Kingston small businesses, who it suits, RosuePro pricing from J$28,000, and the J$45,000 landing page plus chatbot package.</p>
            <Link to={"/blog/whatsapp-chatbot-for-business-jamaica"} className="btn btn-primary">Read WhatsApp chatbot guide</Link>
          </div>
        </div>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/website-design-jamaica-price.webp" className="card-img-top" alt="Kingston business owner reviewing a landing page on a laptop with WhatsApp open on her phone" width="1280" height="720" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Website Design Jamaica Price: What a Website Really Costs in 2026</h5>
            <p className="card-text">If you have searched for website design Jamaica price, you have probably noticed that the answers are all over the place. This guide sets out what drives website cost in Jamaica, what a landing page is, and what RosuePro charges in Kingston.</p>
            <Link to={"/blog/website-design-jamaica-price"} className="btn btn-primary">Read website design price guide</Link>
          </div>
        </div>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/Screenshot 2025-08-03 160451.png" className="card-img-top" alt="Pack My Cart online supermarket platform for Jamaica" width="1895" height="863" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">How Pack My Cart helps Jamaican supermarket owners sell online</h5>
            <p className="card-text">If you run a supermarket or mini-mart in Jamaica, most of your day still happens on the shop floor — stock, suppliers, the line at the till, and a phone full of WhatsApp questions. Pack My Cart is built for customers who expect to browse prices, build a cart, and choose delivery or pick-up without waiting for a reply.</p>
            <Link to={"/blog/pack-my-cart-helps-jamaican-supermarkets"} className="btn btn-primary">Read Pack My Cart article</Link>
          </div>
        </div>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/jamaican-restaurant-cookshop-blog.png" className="card-img-top" alt="Websites and AI for Jamaican restaurants and cook shops" width="1200" height="630" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">How Jamaican restaurants and cook shops can fill more tables with a website and AI</h5>
            <p className="card-text">If you run a restaurant or cook shop in Jamaica, your phone is part of the kitchen. A simple business website, an AI chatbot for common questions, and light automations give customers a clear place to see your menu — and give you fewer of the same messages to answer by hand.</p>
            <Link to={"/blog/websites-and-ai-for-jamaican-restaurants-cookshops"} className="btn btn-primary">Read restaurant and cook shop tips</Link>
          </div>
        </div>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/jamaican-salon-barbershop-blog.png" className="card-img-top" alt="Websites and AI for Jamaican salons and barbershops" width="1200" height="630" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">How Jamaican salon and barbershop owners can win more bookings with a website and AI</h5>
            <p className="card-text">If you run a salon or barbershop in Jamaica, your phone is probably a second workplace. A simple business website, an AI chatbot for common questions, and light automations give customers a clear place to learn about you — and give you fewer of the same messages to answer by hand.</p>
            <Link to={"/blog/websites-and-ai-for-jamaican-salons-barbershops"} className="btn btn-primary">Read salon and barbershop tips</Link>
          </div>
        </div>
        <div className="card" style={{"width": "18rem"}}>
          <img src="/headphones-4595492_1280.jpg" className="card-img-top" alt="Headphones for music and online promotion" width="1280" height="853" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Basic Tips on how to Market your music</h5>
            <p className="card-text">In the fast paced and constantly evolving music world we currently live in, and one which boasts of thousands and thousands of music artistes, the success of nowadays musicians especially the upcoming ones is almost not guaranteed unless some pertinent things are put into consideration. In this article, I have decided to put together a few tips for upcoming musicians like you that will definitely help your career push.</p>
            <Link to={"/blog/basic-tips-market-music"} className="btn btn-primary">Read music marketing tips</Link>
          </div>
        </div>
    </div>
    </Container>
    <Footer/>
    </>
  )
}
