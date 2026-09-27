import React from 'react'
import TopNavbar from '../components/TopNavbar'
import Carousel from '../components/HomeCarousel'
import Footer from '../components/Footer'
import ServiceOfferings from '../components/ServiceOfferings'
import PortfolioShowcase from '../components/PortfolioShowcase'


export default function Landing() {
  return (
    <>
      <TopNavbar className="landing-navbar" />
      <main id="main-content"><div className="main-content landing-carousel txt-hard">
        <ServiceOfferings />
        <Carousel />
      </div>

      <PortfolioShowcase />

      </main><Footer />
    </>
  )
}
