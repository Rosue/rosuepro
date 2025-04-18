import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

export default function TopNavbar() {
    const location = useLocation();
  return (
        <Navbar collapseOnSelect expand="sm" fixed="top" className='mh-10 bg-main'>
            <Container fluid>
                <Navbar.Brand href="/">
                    <img className='my-4' height={'45px'} src='/logo.png' alt='logo' />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll"/>

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto justify-content-center">
                        <Navbar.Text className="flex-grow-1 text-center">
                            {location.pathname === "/" ? 
                                <Link style={location.pathname.startsWith("/") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none nav-link active text-center'  to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  width="30" height="30" className="bi active m-icon" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                                    </svg>
                                    <span className='menu-text'>Home</span>
                                </Link>
                                    :
                                <Link className='m-option text-decoration-none nav-link text-center' to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" className="bi bi-house-door m-icon" viewBox="0 0 16 16">
                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                                    </svg>
                                    <span className='menu-text'>Home</span>
                                </Link>
                            }
                        </Navbar.Text>
                        <Navbar.Text className="flex-grow-1 text-center">     
                        {location.pathname.startsWith("/portfolio") ?
                            <Link style={location.pathname.startsWith("/portfolio") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link active text-center'  to="/portfolio">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 576 512">
                                    <path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z"/>
                                </svg>
                                <span className='menu-text'>Portfolio</span>
                            </Link>
                            :
                            <Link style={location.pathname.startsWith("/portfolio") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link text-center' to="/portfolio">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" viewBox="0 0 576 512">
                                    <path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/>
                                </svg>
                                <span className='menu-text'>Portfolio</span>
                            </Link>
                        }
                        </Navbar.Text>
                        <Navbar.Text className="flex-grow-1 text-center">     
                        {location.pathname.startsWith("/resume") ?
                            <Link style={location.pathname.startsWith("/resume") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link active text-center'  to="/resume">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 512 512">
                                    <path d="M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                                <span className='menu-text'>Resume</span>
                            </Link>
                            :
                            <Link style={location.pathname.startsWith("/resume") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link text-center' to="/resume">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" viewBox="0 0 512 512">
                                    <path d="M168 80c-13.3 0-24 10.7-24 24l0 304c0 8.4-1.4 16.5-4.1 24L440 432c13.3 0 24-10.7 24-24l0-304c0-13.3-10.7-24-24-24L168 80zM72 480c-39.8 0-72-32.2-72-72L0 112C0 98.7 10.7 88 24 88s24 10.7 24 24l0 296c0 13.3 10.7 24 24 24s24-10.7 24-24l0-304c0-39.8 32.2-72 72-72l272 0c39.8 0 72 32.2 72 72l0 304c0 39.8-32.2 72-72 72L72 480zM176 136c0-13.3 10.7-24 24-24l96 0c13.3 0 24 10.7 24 24l0 80c0 13.3-10.7 24-24 24l-96 0c-13.3 0-24-10.7-24-24l0-80zm200-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272l208 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-208 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80l208 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-208 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                                </svg>
                                <span className='menu-text'>Resume</span>
                            </Link>
                        }
                        </Navbar.Text>
                        <Navbar.Text className="flex-grow-1 text-center">     
                        {location.pathname.startsWith("/blog") ?
                            <Link style={location.pathname.startsWith("/blog") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link active text-center'  to="/blog">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                                </svg>
                                <span className='menu-text'>Blog</span>
                            </Link>
                            :
                            <Link style={location.pathname.startsWith("/blog") ? {fontWeight: 'bolder'} : {}} className='m-option text-decoration-none ms-auto nav-link text-center' to="/blog">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" viewBox="0 0 512 512">
                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                                </svg>
                                <span className='menu-text'>Blog</span>
                            </Link>
                        }
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}
