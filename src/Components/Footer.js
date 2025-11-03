import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer bg-black text-center text-light py-4 mt-5 ">
      <div className="container ">
        <div className="row mb-3 justify-content-center align-items-center">
          <div className="col-auto">
            <img
              src="/logoshadow.png"
              alt="Logo"
              height="60"
              width="60"
              className="me-2"
            />
          </div>
          <div className="col-auto">
            <h5 className="fw-bold m-0">ELKARMNIA REAL ESTATE</h5>
          </div>
        </div>

        <div className="row mb-3 justify-content-center">
          <div className="col-auto">
            <Link className="nav-link custom-nav-link text-warning fs-5" to="/Contact">انقر هنا للتواصل معنا</Link>
          </div>
        </div>

        <div className="row mb-3 justify-content-center">
          <div className="col-auto">
            <Link
              to="/"
              className="btn text-black fs-5 px-4 fw-bold"
            >
              العودة إلى الرئيسية
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-auto">
            <p className="small mb-0 ">© AHMED REDA 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
