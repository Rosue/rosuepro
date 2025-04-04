import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function Portforlio() {
  return (
    <>
      <TopNavbar/>

      <Container className="main-content">

        <h1 className="text-center mt-5  txt-cool">Portfolio</h1>
        <p className="text-center"><sm className="txt-cool mb-5">A showcase of some of our work</sm></p>
        <div className="card mb-5 ">
          <img src="reggaewheels-2482a.web.app_ (1).png" className="card-img-top" alt="Reggae Wheels Website Image"/>
          <div className="card-body">
            <h5 className="card-title">Reggae Wheels Website</h5>
            <p className="card-text">This website books and advertises tours, trips and  rentals</p>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="rj-detailing.web.app_calendar.png" className="card-img-top" alt="Reggae Wheels Website Image"/>
          <div className="card-body">
            <h5 className="card-title">Shynz By Onyx Website</h5>
            <p className="card-text">This is an appointment website where users can set and see the schedule</p>
          </div>
        </div>

        <div className="card mb-3 mt-5 ">
          <img src="432952191_923514793107512_60065450142670162_ysn.jpg" className="card-img-top" alt="Reggae Wheels Website Image"/>
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
