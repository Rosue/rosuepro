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
      <h2 class="card-title text-center text-white">
        Elevate Your Online Presence with Our All-In-One Website Development Services
      </h2>
      <p class="card-text text-center text-white">
        Unlock the full potential of your digital business with our comprehensive website development consultancy. We offer everything you need to create, optimize, and maintain an engaging online experience that drives results.
      </p>
      <ul class="list-group list-group-flush my-4">
        <li class="list-group-item bg-main txt-cool"><strong>Custom Website Design &amp; Development:</strong> Tailored, responsive designs that perfectly represent your brand.</li>
        <li class="list-group-item bg-main txt-cool"><strong>CMS Solutions:</strong> Empower your team with user-friendly WordPress, Drupal, or headless CMS setups.</li>
        <li class="list-group-item bg-main txt-cool"><strong>E-commerce Excellence:</strong> Seamless online store development with secure payment integrations.</li>
        <li class="list-group-item bg-main txt-cool"><strong>Ongoing Maintenance &amp; Support:</strong> Keep your site fast, secure, and up-to-date with our dedicated maintenance plans.</li>
        <li class="list-group-item bg-main txt-cool"><strong>SEO &amp; Digital Marketing:</strong> Optimize your site to climb search rankings and convert visitors into customers.</li>
        <li class="list-group-item bg-main txt-cool"><strong>UI/UX &amp; Branding:</strong> Enhance user experience and solidify your visual identity with expert guidance.</li>
        <li class="list-group-item bg-main txt-cool"><strong>Security &amp; Performance Audits:</strong> Ensure your site is safe and optimized for peak performance.</li>
        <li class="list-group-item bg-main txt-cool"><strong>Web Application Development &amp; Integration:</strong> Custom apps and API integrations to add unique functionality.</li>
        <li class="list-group-item bg-main txt-cool"><strong>Consultation &amp; Training:</strong> Strategic insights and hands-on training to empower your team.</li>
      </ul>
      <div class="text-center">
      <a href="mailto:rosuepro@gmail.com?subject=New%20RosuePro%20Customer%20Contact" className="btn bg-complimentary btn-lg">
        Contact RosuePro
      </a>
      </div>
    </div>
  </div>
</div>
<Footer />
    </>
  )
}
