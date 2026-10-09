import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import PortfolioProjectCard from '../components/PortfolioProjectCard'
import PortfolioDemosSection from '../components/PortfolioDemosSection'
import { clientPortfolioProjects } from '../data/portfolioProjects'

export default function Portforlio() {
  const clientProjects = clientPortfolioProjects()

  return (
    <>
      <TopNavbar/>

      <Container as="main" id="main-content" className="main-content">

        <h1 className="text-center mt-5  txt-dark">Website Development Portfolio</h1>
        <p className="text-center"><small className="txt-dark mb-5">A showcase of some of our work</small></p>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 portfolio-client-grid mb-5">
          {clientProjects.map((project) => (
            <div className="col" key={project.slug}>
              <PortfolioProjectCard
                project={project}
                context="portfolio"
                cardClassName="card h-100 portfolio-project-card"
              />
            </div>
          ))}
        </div>
      </Container>

      <PortfolioDemosSection />

      <Footer />
    </>
  )
}
