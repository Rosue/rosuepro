import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function Portforlio() {
  return (
    <>
      <TopNavbar/>

      <Container className="main-content">

        <h1 className="text-center mt-5  txt-dark">Portfolio</h1>
        <p className="text-center"><small className="txt-dark mb-5">A showcase of some of our work</small></p>
        <div className="card mb-5 portfolio-project-card">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-music-note-beamed fs-1 txt-main" aria-hidden="true"></i>
              <div>
                <h2 className="h5 card-title mb-1">Vybz Meter</h2>
                <p className="card-text mb-3">A live music-focused web experience.</p>
                <a href="https://vybz-meter.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit Vybz Meter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5 portfolio-project-card">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-flower1 fs-1 txt-main" aria-hidden="true"></i>
              <div>
                <h2 className="h5 card-title mb-1">Funeral Template</h2>
                <p className="card-text mb-3">A respectful and polished funeral website template.</p>
                <a href="https://funeral-template.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit Funeral Template</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5 ">
          <img src="reggaewheels-2482a.web.app_ (1).webp" className="card-img-top" alt="Reggae_Wheels_Website"/>
          <div className="card-body">
            <h5 className="card-title">Reggae Wheels Website</h5>
            <p className="card-text">This website books and advertises tours, trips and  rentals</p>
            <a href="https://reggaewheels-2482a.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="rj-detailing.web.app_calendar.png" className="card-img-top" alt="Rj_Detailing_Website"/>
          <div className="card-body">
            <h5 className="card-title">Shynz By Onyx Website</h5>
            <p className="card-text">This is an appointment website where users can set and see the schedule</p>
            <a href="https://rj-detailing.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="Screenshot 2025-08-03 160451.png" className="card-img-top" alt="Pack_My_Cart"/>
          <div className="card-body">
            <h5 className="card-title">Pack My Cart Website</h5>
            <p className="card-text">This is a new Supermarket Platform</p>
            <a href="https://pack-my-cart.web.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Visit</a>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="432952191_923514793107512_60065450142670162_ysn.jpg" className="card-img-top" alt="YSN_Website"/>
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
