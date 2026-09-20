import React from 'react'
import TopNavbar from '../components/TopNavbar'
import Carousel from '../components/HomeCarousel'
import Footer from '../components/Footer'
import ServiceOfferings from '../components/ServiceOfferings'


export default function Landing() {
  return (
    <>
      <TopNavbar className="landing-navbar" />
      <main id="main-content"><div className="main-content landing-carousel txt-hard">
        <ServiceOfferings />
        <Carousel />
      </div>

      <section className="container my-5" aria-labelledby="featured-projects-heading">
        <div className="card shadow featured-projects">
          <div className="card-body">
            <h2 id="featured-projects-heading" className="card-title text-center text-dark">
              Featured Projects
            </h2>
            <p className="card-text text-center text-dark">
              Explore two of our latest live web experiences.
            </p>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
              <div className="col">
                <article className="card h-100 project-promo-card">
          <img src="/projects/vybz-meter.webp" className="card-img-top project-preview" alt="Vybz Meter website showing its interactive Jamaica hotspots map" loading="lazy" decoding="async" width="1280" height="720" />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="h4 card-title">Vybz Meter</h3>
                    <p className="card-text flex-grow-1">Explore Jamaica’s hotspots with Vybz Meter’s interactive map.</p>
                    <a href="https://vybz-meter.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary align-self-center">Visit Vybz Meter</a>
                  </div>
                </article>
              </div>
              <div className="col">
                <article className="card h-100 project-promo-card">
          <img src="/projects/funeral-template.webp" className="card-img-top project-preview" alt="Funeral Template website showing its memorial homepage with white doves" loading="lazy" decoding="async" width="1272" height="716" />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="h4 card-title">Funeral Template</h3>
                    <p className="card-text flex-grow-1">See a thoughtful, polished funeral website template in action.</p>
                    <a href="https://funeral-template.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary align-self-center">Visit Funeral Template</a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main><Footer />
    </>
  )
}
