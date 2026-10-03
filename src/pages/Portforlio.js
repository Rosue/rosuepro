import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import PortfolioProjectCard from '../components/PortfolioProjectCard'
import { portfolioProjects } from '../data/portfolioProjects'

export default function Portforlio() {
  return (
    <>
      <TopNavbar/>

      <Container as="main" id="main-content" className="main-content">

        <h1 className="text-center mt-5  txt-dark">Website Development Portfolio</h1>
        <p className="text-center"><small className="txt-dark mb-5">A showcase of some of our work</small></p>
        {portfolioProjects.map((project) => (
          <PortfolioProjectCard key={project.slug} project={project} context="portfolio" />
        ))}
      </Container>

      <Footer />
    </>
  )
}
