import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Accordion, Container } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function Resume() {
  return (
    <>
    <TopNavbar/>
    <Container className="main-content">
    <h1 className="text-center mt-5  mb-5 txt-dark">Resume</h1>

      <Accordion defaultActiveKey="0" className='mb-5'>
      <Accordion.Item eventKey="0">
          <Accordion.Header>Introduction</Accordion.Header>
          <Accordion.Body>
            I am a seasoned software developer with a passion for crafting innovative solutions. My expertise spans full-stack web development, and I am well-versed in modern software development techniques, including SOLID principles, unit testing, and design patterns. With a strong focus on maintainability, modularity, and robustness, I bring immense value to any team through my technical skills and leadership experience.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Skills</Accordion.Header>
          <Accordion.Body>
          <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Programming Languages</div>
            Java, PHP, C#, Visual Basic, JavaScript (with HTML and CSS) 
          </div>
          <span class="badge bg-primary rounded-pill">6+</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Frameworks and Libraries:</div>
              Spring Boot, Laravel, .NET MVC, React, Vue, jQuery, Google Maps, Bing Maps, D3.js, DataTables, AG Grid  
          </div>
          <span class="badge bg-primary rounded-pill">30+</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Databases</div>
            MySQL, MariaDB, MSSQL, Informix, Oracle DB, PostgreSQL (including stored procedures, functions, views, normalization, indexing, and optimization) 
          </div>
          <span class="badge bg-primary rounded-pill">10+</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Tools and Technologies</div>
            Azure (DevOps, Portal, CI/CD Pipelines, Kubernetes, Helm Charts), Docker, Git, Agile methodologies
          </div>
          <span class="badge bg-primary rounded-pill">15+</span>
        </li>
      </ol>
      </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Experience</Accordion.Header>
          <Accordion.Body>
          <h3 className='text-center mb-3'>Over 8 years of experience at 2025</h3>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Senior Software Developer, Digicel Group Jamaica</div>
                Led a team of software developers in delivering high-quality software solutions using agile methodologies. Managed stakeholder expectations and ensured timely delivery of projects.
              </div>
              <span class="badge bg-primary rounded-pill">3+ yrs</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Software Developer, Digicel Group Jamaica</div>
                Contributed to the development of microservices and API systems, and played a key role in migrating applications to the cloud. Utilized SOLID principles and design patterns to deliver robust solutions.
              </div>
              <span class="badge bg-primary rounded-pill">2 yrs</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Programmer Analyst, Egov Jamaica Limited</div>
                Enhanced a financial application by delivering new features, refactoring code, and introducing object-oriented design patterns. Migrated the codebase to a Git repository for improved version control.
              </div>
              <span class="badge bg-primary rounded-pill">1+ yr</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Software and Training Administrator, SERHA</div>
                Developed and deployed multiple web applications, gathered requirements from stakeholders, and provided training to end-users. Created user manuals to ensure smooth adoption of the systems.
              </div>
              <span class="badge bg-primary rounded-pill">1 yr</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Web Page Design Teacher, Institute of Advanced Technology</div>
                Taught web development skills to vocational students, covering HTML, CSS, JavaScript, and CMS platforms like WordPress. Also handled administrative tasks and document processing.
              </div>
              <span class="badge bg-primary rounded-pill">-1 yr</span>
            </li>
          </ol>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Education</Accordion.Header>
          <Accordion.Body>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Bachelor of Science in Computer Science, University of Technology (UTECH)</div>
                Developed a web application to address agricultural challenges as part of the major project.  
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Associate Degree in Computer Science, Browns Town Community College</div>
              </div>
            </li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


    </Container>
    <Footer />
    </>
  )
}
