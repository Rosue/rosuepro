import React from 'react'
import TopNavbar from '../components/TopNavbar'
import { Accordion, Container, Table } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function Resume() {
  return (
    <>
    <TopNavbar/>
    <Container className="main-content">
    <h1 className="text-center mt-5  mb-5 txt-cool">Resume</h1>

      <Accordion defaultActiveKey="0" className='mb-5'>
      <Accordion.Item eventKey="0">
          <Accordion.Header>Introduction</Accordion.Header>
          <Accordion.Body>
            I am a fully professional Software Developer who practices modern software development techniques to ensure software maintainability, modularity, extendibility, testability and robustness. I both endorse and use SOLID principles, Unit Tests and Design patterns that make proper use of interfaces, maps, polymorphism, axioms and other architecture elements to deliver feature rich software continuously. This along with my vast experience in full stack web development will bring immense value to your company.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Skills</Accordion.Header>
          <Accordion.Body>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tool/ Technology/ Methodology</th>
          <th>Places(s) Used</th>
          <th>Experience Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Team Lead</td>
          <td>Digicel</td>
          <td>Lead a group of Software Developers of varying skillsets and experience to Create Software using modern software development techniques, also the managing the expectations of our stakeholders for timelines</td>
        </tr>
        <tr>
          <td>Java</td>
          <td>Digicel, Egov</td>
          <td>Advanced Spring Boot,  Advanced J2EE EJB, used for Web Backends and API Systems, within the Financial and Business Domain</td>
        </tr>
        <tr>
          <td>PHP</td>
          <td>Digicel, SERHA, Institute of Advanced Technology (HEART), Personal Websites: yahsonice.com, caristocks.com, Freelancing at Upwork, LazyPen Labs</td>
          <td>Advanced Laravel, Advanced Wordpress, mostly used to develop web-applications. I have also taught vocational students web development using PHP as a backend language and Wordpress as a CMS web-tool   </td>
        </tr>
        <tr>
          <td>C# .NET</td>
          <td>SERHA, ETECH</td>
          <td>Advanced MVC, Advanced Web-Forms, Console Applications, Windows Applications. Used within a fast paced entrepreneurial setting with ETECH</td>
        </tr>
        <tr>
          <td>Visual Basic</td>
          <td>KRYS Financials, Discovery Bay Glass, Freelancing at Fiverr</td>
          <td>Used for Visual Fox Pro and Advanced Excel Macro Programming</td>
        </tr>
        <tr>
          <td>JavaScript (Along with HTML and CSS)</td>
          <td>Digicel, Egov, SERHA, ETECH, Institute of Advanced Technology (HEART), Personal Websites: yahsonice.com, caristocks.com, Freelancing at Upwork, LazyPen Labs </td>
          <td>I have a vast experience with JavaScript and I have used many libraries built with it (React, Vue, Jquery, Google Maps, Bing Maps, D3js, Datatables, AG Grid etc.) I can also use webpack and other techniques to bundle and minify JS files. I have also taught vocational students web development using HTML, CSS & JS</td>
        </tr>
        <tr>
          <td>MySQL/ Maria DB, MSSQL, Informix, Oracle DB, PostgreSQL</td>
          <td>Digicel, SERHA, Egov, ETECH, Institute of Advanced Technology (HEART), Personal Websites: yahsonice.com, caristocks.com</td>
          <td>I have developed and interacted with many MySql/ MSSQL Databases. I have also developed Stored procedures, functions and Views. I have also normalized, indexed, optimized and encrypted databases</td>
        </tr>
        <tr>
          <td>Azure (Dev-Ops & Portal)</td>
          <td>Digicel</td>
          <td>Cloud Computing (SaaS, PaaS, IaaS) CI/ CD Pipelines, Virtual Networks, API Management, Azure Kubernetes, Helm Charts, Virtual Machines</td>
        </tr>
        <tr>
          <td>Docker</td>
          <td>Digicel</td>
          <td>Used to Containerize Java and PHP based Systems for Azure Containerized Web App Server and for Kubernetes orchestration</td>
        </tr>
        <tr>
          <td>Git</td>
          <td>Digicel, Egov, SERHA</td>
          <td>Used to maintain version control across teams. I can do Git Flow and Trunk based development</td>
        </tr>
        <tr>
          <td>Agile</td>
          <td>Digicel, Egov</td>
          <td>Agile teams where delivery are done in sprints. Scope is determined by the team while planning for sprints. Daily Scrum Updates, Retrospectives, Backlog Grooming, Kanban boards, Self-Organizing Teams.</td>
        </tr>
      </tbody>
    </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Experience</Accordion.Header>
          <Accordion.Body>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Employer</th>
          <th>Position</th>
          <th>Responsibilities</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>April 2022 - Present</td>
          <td>Digicel Group Jamaica</td>
          <td>Senior Software Developer</td>
          <td>Lead Software Developers of varying experience to deliver software using modern software development techniques and best practices within an agile environment.</td>
        </tr>
        <tr>
          <td>March 2020 – March 2022</td>
          <td>Digicel Group Jamaica</td>
          <td>Software Developer</td>
          <td>Delivered Micro-services and Software features for their API Eco-System. Also Integral in migrating some of their applications to the cloud and developing pipelines for releases. Agile development is used to organize work and cloud computing is highly adopted. Also practiced Solid programming, Design Patterns, Test Driven Development and Event Driven Development.    </td>
        </tr>
        <tr>
          <td>November 2018 – March 2020</td>
          <td>Egov Jamaica Limited</td>
          <td>Programmer Analyst</td>
          <td>Responsible for delivering features to a financial application within an agile environment. Refactored many routines, fixed many bugs and introduced object oriented design patterns. Also migrated the code base to a git repository.</td>
        </tr>
        <tr>
          <td>October 2017 – November 2018</td>
          <td>South East Regional Health Authority (SERHA) – Ministry of Health</td>
          <td>Software and Training Administrator</td>
          <td>Developed many PHP and C# based Systems where I had to gather requirements from stakeholders, develop and gather feedback, deliver, demonstrate and deploy these systems and also train staff (doctors, nurses etc) to use these systems along with creating manuals for usage.</td>
        </tr>
        <tr>
          <td>April 2016 – March 2017</td>
          <td>Institute of Advance Technology – National Unattached Youth Program –HEART Trust NTA</td>
          <td>Web Page Design Teacher</td>
          <td>Taught vocational students how to create web pages with HTML, CSS and JS along with web builders and CMS such as Wordpress and Wix. Also taught them the basics of backend programming with PHP. Also did a lot of document processing for the vast reports that were delivered (mail merge, excel)</td>
        </tr>
      </tbody>
    </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Education</Accordion.Header>
          <Accordion.Body>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Years</th>
          <th>School</th>
          <th>Achievement</th>
          <th>Noteworthy</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2011 - 2017</td>
          <td>University of Technology (UTECH)</td>
          <td>Bachelor of Science in Computer Science.</td>
          <td>Major Project: Developed a web application system with a central database to help in solving the problem of glut within the agricultural sector.</td>
        </tr>
        <tr>
          <td>2009 - 2011</td>
          <td>Browns Town Community College</td>
          <td>Associate Degree in Computer Science.</td>
          <td>4th in Jamaica and 9th in the Caribbean for Information Technology (CXC CAPE level one)</td>
        </tr>
      </tbody>
    </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


    </Container>
    <Footer />
    </>
  )
}
