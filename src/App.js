import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Home';
import Apartments from "./Pages/Apartments";
import Navbar from './Components/Navbar';
import Lands from './Pages/Lands';
import Houses from './Pages/Houses';
import Shops from './Pages/Shops';
import Chalets from './Pages/Chalets';
import Offices from './Pages/Offices';
import Buildings from './Pages/Buildings';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Contact from './Pages/Contact';






function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/lands" element={<Lands />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/chalets" element={<Chalets />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
