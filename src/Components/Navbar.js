import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar bg-light shadow-sm py-2 fixed-top">
      <div
        className="container d-flex justify-content-between align-items-center flex-nowrap"
        style={{ overflow: 'hidden' }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center flex-nowrap">
          <img
            src="/logoshadow.png"
            alt="Logo"
            height="50"
            width="50"
            className="me-2"
          />
        </div>

        <div
          className="d-flex align-items-center flex-nowrap"
          style={{ gap: '1rem' }}
        >
          <Link className="nav-link fs-5 text-light fw-bold p-0" to="/Contact">
            تواصل معنا
          </Link>
          <Link className="nav-link fs-5 text-light fw-bold p-0" to="/">
            الرئيسية
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
