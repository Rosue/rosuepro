import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from '../pages/Landing';
import Portforlio from '../pages/Portforlio';
import Resume from '../pages/Resume';
import Blog from '../pages/Blog';
import BasicTipsMarketMusic from '../pages/blog/BasicTipsMarketMusic';

export default function Router() {
    const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Landing />} />
        <Route path='/portfolio' element={<Portforlio />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/basic-tips-market-music' element={<BasicTipsMarketMusic />} />
    </Routes>
  )
}
