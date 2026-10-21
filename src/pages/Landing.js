import React from 'react'
import TopNavbar from '../components/TopNavbar'
import useReplacePathWhen from '../hooks/useReplacePathWhen'
import ServiceOfferings from '../components/ServiceOfferings'
import PortfolioShowcase from '../components/PortfolioShowcase'
import HomeShareSection from '../components/HomeShareSection'


export default function Landing() {
  useReplacePathWhen('/resume', '/');

  return (
    <>
      <TopNavbar />
      <main id="main-content"><div className="landing-hero txt-hard">
        <ServiceOfferings />
      </div>

      <PortfolioShowcase />

      </main>
      <HomeShareSection />
    </>
  )
}
