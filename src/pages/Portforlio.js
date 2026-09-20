import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function Portforlio() {
  return (
    <>
      <TopNavbar/>

      <Container as="main" id="main-content" className="main-content">

        <h1 className="text-center mt-5  txt-dark">Website Development Portfolio</h1>
        <p className="text-center"><small className="txt-dark mb-5">A showcase of some of our work</small></p>
        <div className="card mb-5 portfolio-project-card">
          <img src="/projects/vybz-meter.webp" className="card-img-top project-preview" alt="Vybz Meter website showing its interactive Jamaica hotspots map" loading="lazy" decoding="async" width="1280" height="720" />
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              <div>
                <h2 className="h5 card-title mb-1">Vybz Meter</h2>
                <p className="card-text mb-3">An interactive map for discovering and sharing hotspots across Jamaica.</p>
                <a href="https://vybz-meter.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit Vybz Meter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5 portfolio-project-card">
          <img src="/projects/funeral-template.webp" className="card-img-top project-preview" alt="Funeral Template website showing its memorial homepage with white doves" loading="lazy" decoding="async" width="1272" height="716" />
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              <div>
                <h2 className="h5 card-title mb-1">Funeral Template</h2>
                <p className="card-text mb-3">A respectful and polished funeral website template.</p>
                <a href="https://funeral-template.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit Funeral Template</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5 ">
          <img src="/reggaewheels-2482a.web.app_ (1).webp" className="card-img-top" alt="Reggae_Wheels_Website" width="4542" height="2346" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Reggae Wheels Website</h5>
            <p className="card-text">This website books and advertises tours, trips and  rentals</p>
            <a href="https://reggaewheels-2482a.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="/rj-detailing.web.app_calendar.png" className="card-img-top" alt="Rj_Detailing_Website" width="2508" height="2446" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Shynz By Onyx Website</h5>
            <p className="card-text">This is an appointment website where users can set and see the schedule</p>
            <a href="https://rj-detailing.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="/Screenshot 2025-08-03 160451.png" className="card-img-top" alt="Pack_My_Cart" width="1895" height="863" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Pack My Cart Website</h5>
            <p className="card-text">This is a new Supermarket Platform</p>
            <a href="https://pack-my-cart.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="/432952191_923514793107512_60065450142670162_ysn.jpg" className="card-img-top" alt="YSN_Website" width="1902" height="858" loading="lazy" decoding="async" />
          <div className="card-body">
            <h5 className="card-title">Yahsonice Website</h5>
            <p className="card-text">This website connects Bar Owners with Bartenders</p>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
