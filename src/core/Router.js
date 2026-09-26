import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Seo from '../components/Seo';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Landing from '../pages/Landing';
import Portforlio from '../pages/Portforlio';
import Resume from '../pages/Resume';
import Blog from '../pages/Blog';
import BasicTipsMarketMusic from '../pages/blog/BasicTipsMarketMusic';
import PackMyCartHelpsJamaicanSupermarkets from '../pages/blog/PackMyCartHelpsJamaicanSupermarkets';
import WebsitesAndAiForJamaicanSalonsBarbershops from '../pages/blog/WebsitesAndAiForJamaicanSalonsBarbershops';
import WebsitesAndAiForJamaicanRestaurantsCookshops from '../pages/blog/WebsitesAndAiForJamaicanRestaurantsCookshops';

export default function Router() {
    const location = useLocation();
  return (
    <><Seo /><Routes location={location} key={location.pathname}>
        <Route path='/' element={<Landing />} />
        <Route path='/portfolio' element={<Portforlio />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/basic-tips-market-music' element={<BasicTipsMarketMusic />} />
        <Route path='/blog/pack-my-cart-helps-jamaican-supermarkets' element={<PackMyCartHelpsJamaicanSupermarkets />} />
        <Route path='/blog/websites-and-ai-for-jamaican-salons-barbershops' element={<WebsitesAndAiForJamaicanSalonsBarbershops />} />
        <Route path='/blog/websites-and-ai-for-jamaican-restaurants-cookshops' element={<WebsitesAndAiForJamaicanRestaurantsCookshops />} />
        <Route path="/about-us" element={<About />} />
        <Route path="*" element={<NotFound />} />
    </Routes></>
  )
}
