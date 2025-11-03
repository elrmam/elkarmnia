import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <img src="/logoshadow.png" className="mx-3 ms-5" alt="Logo" height="60" width="60" />
      <button
        className="navbar-toggler me-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
        <ul className="navbar-nav  mb-2 mb-lg-0 ms-5">
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/">الرئيسية</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Apartments">شقق</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Houses">بيوت</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Chalets">شاليهات</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Shops">محلات</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Offices">إدارى</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Lands">أراضى</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Buildings">بنايات</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link fs-5" to="/Contact">للتواصل</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
}

export default Navbar;