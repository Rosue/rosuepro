import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
  return (
<Carousel>
      <Carousel.Item>
        <img
          className="d-block mx-auto img-fluid rounded"
          src="/Slide1.webp"
          alt="RosuePro website development services" width="1983" height="793" loading="lazy" decoding="async" />
        {/* <Carousel.Caption className="carousel-caption-custom">
          <h3>Welcome to RosuePro</h3>
          <p>Best in the business</p>
        </Carousel.Caption> */}
      </Carousel.Item>
       <Carousel.Item>
        <img
          className="d-block mx-auto img-fluid rounded"
          src="/Slide2.webp"
          alt="RosuePro business website solutions" width="2048" height="768" loading="lazy" decoding="async" />
        {/* <Carousel.Caption>
          <h3>Our Services</h3>
          <p>Contact Us Today</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      {/*<Carousel.Item>
        <img
          className="d-block w-100"
          src="path/to/your/image3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  )
}
