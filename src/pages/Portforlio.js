import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Portforlio() {
  return (
    <>
      <TopNavbar/>

      <Container className="main-content">

        <h1 className="text-center mt-5  txt-dark">Portfolio</h1>
        <p className="text-center"><sm className="txt-dark mb-5">A showcase of some of our work</sm></p>
        <div className="card mb-5 ">
          <img src="reggaewheels-2482a.web.app_ (1).png" className="card-img-top" alt="Reggae_Wheels_Website"/>
          <div className="card-body">
            <h5 className="card-title">Reggae Wheels Website</h5>
            <p className="card-text">This website books and advertises tours, trips and  rentals</p>
            <Link to="https://reggaewheels-2482a.web.app/" target="_blank" className="btn btn-primary">Visit</Link>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="rj-detailing.web.app_calendar.png" className="card-img-top" alt="Rj_Detailing_Website"/>
          <div className="card-body">
            <h5 className="card-title">Shynz By Onyx Website</h5>
            <p className="card-text">This is an appointment website where users can set and see the schedule</p>
            <Link to="https://rj-detailing.web.app/" target="_blank" className="btn btn-primary">Visit</Link>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="localhost_3000_ (2).png" className="card-img-top" alt="Pack_My_Cart"/>
          <div className="card-body">
            <h5 className="card-title">Pack My Cart Website</h5>
            <p className="card-text">This is a new Supermarket Platform</p>
            <Link to="https://pack-my-cart.web.app/" target="_blank" className="btn btn-primary">Visit</Link>
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
