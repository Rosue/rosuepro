import React from 'react'
import TopNavbar from '../components/TopNavbar'
import Carousel from '../components/HomeCarousel'
import Footer from '../components/Footer'


export default function Landing() {
  return (
    <>
      <TopNavbar/>
      <div className="main-content txt-hard">
        <Carousel />
      </div>

      <div class="container my-5">
  <div class="card shadow" style={{ backgroundColor: 'transparent', border: 'none' }}>
    <img src="\ChatGPTImageApr14202509_38_38PM.png" class="card-img-top" alt="..."/>
    <div class="card-body" >
      <h2 class="card-title text-center text-dark">
        Elevate Your Online Presence with Our All-In-One Website Development Services
      </h2>
      <p class="card-text text-center text-dark">
        Unlock the full potential of your digital business with our comprehensive website development consultancy. We offer everything you need to create, optimize, and maintain an engaging online experience that drives results.
      </p>
      <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4">
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-palette-fill fs-1 mb-3"></i> {/* Example Bootstrap icon */}
        <h5 className="card-title"><strong>Custom Website Design &amp; Development</strong></h5>
        <p className="card-text">Tailored, responsive designs that perfectly represent your brand.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-gear-fill fs-1 mb-3"></i>
        <h5 className="card-title"><strong>CMS Solutions</strong></h5>
        <p className="card-text">Empower your team with user-friendly WordPress, Drupal, or headless CMS setups.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-cart-fill fs-1 mb-3"></i>
        <h5 className="card-title"><strong>E-commerce Excellence</strong></h5>
        <p className="card-text">Seamless online store development with secure payment integrations.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-shield-fill-check fs-1 mb-3"></i>
        <h5 className="card-title"><strong>Ongoing Maintenance &amp; Support</strong></h5>
        <p className="card-text">Keep your site fast, secure, and up-to-date with our dedicated maintenance plans.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-graph-up-arrow fs-1 mb-3"></i>
        <h5 className="card-title"><strong>SEO &amp; Digital Marketing</strong></h5>
        <p className="card-text">Optimize your site to climb search rankings and convert visitors into customers.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-brush-fill fs-1 mb-3"></i>
        <h5 className="card-title"><strong>UI/UX &amp; Branding</strong></h5>
        <p className="card-text">Enhance user experience and solidify your visual identity with expert guidance.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-shield-lock-fill fs-1 mb-3"></i>
        <h5 className="card-title"><strong>Security &amp; Performance Audits</strong></h5>
        <p className="card-text">Ensure your site is safe and optimized for peak performance.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-code-slash fs-1 mb-3"></i>
        <h5 className="card-title"><strong>Web Application Development &amp; Integration</strong></h5>
        <p className="card-text">Custom apps and API integrations to add unique functionality.</p>
      </div>
    </div>
  </li>
  <li className="col">
    <div className="card h-100 text-center bg-main txt-cool">
      <div className="card-body">
        <i className="bi bi-person-lines-fill fs-1 mb-3"></i>
        <h5 className="card-title"><strong>Consultation &amp; Training</strong></h5>
        <p className="card-text">Strategic insights and hands-on training to empower your team.</p>
      </div>
    </div>
  </li>
</ul>
      <div class="text-center">
      <a href="mailto:rosuepro@gmail.com?subject=New%20RosuePro%20Customer%20Contact" className="btn bg-complimentary btn-lg">
        <b>Contact RosuePro</b>
      </a>
      </div>
    </div>
  </div>
</div>
<Footer />
    </>
  )
}
