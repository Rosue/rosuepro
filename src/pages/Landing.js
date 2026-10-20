import React from 'react'
import TopNavbar from '../components/TopNavbar'
import Footer from '../components/Footer'
import ServiceOfferings from '../components/ServiceOfferings'
import PortfolioShowcase from '../components/PortfolioShowcase'
import HomeShareSection from '../components/HomeShareSection'


export default function Landing() {
  return (
    <>
      <TopNavbar />
      <main id="main-content"><div className="landing-hero txt-hard">
        <ServiceOfferings />
      </div>

      <PortfolioShowcase />

      </main>
      <HomeShareSection />
      <Footer />
    </>
  )
}
