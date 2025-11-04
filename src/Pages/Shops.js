import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function Shops() {
  const [Shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbziHjH_ZMFh8qR2vKYtQaIqgGgiUwuI3WyIFxY0-LoiLyqfgIXuJIap9waA4hUSyl_vTQ/exec")
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" role="status"></div>
          <h3>جارٍ تحميل البيانات...</h3>
        </div>
      </div>
    );
  }

  if (!loading && Shops.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light text-center">
        <div>
          <h3 className="text-warning mb-3">لا توجد بيانات متاحة حاليًا</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="darkgray fw-bold rounded sectionehead my-5 p-3">
                       المحلات
                    </h1>

      <div className="row">
        {Shops.map((apt, index) => (
          <div key={index} className="col-lg-6 col-md-12 mb-4">
  <div className="card apartment-card shadow-sm border-0">

    <div id={`carousel${index}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {apt.images?.map((img, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <img src={img} className="d-block w-100" alt={`apartment ${i + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <div className="apartment-body bg-secondary">
      <ul>
        <li className="yellow fs-4"><strong className="text-light fs-5"></strong> {apt.category}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">البلد :</strong> {apt.city}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">المنطقة :</strong> {apt.area}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">رقم العمارة :</strong> {apt.number}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">المساحة :</strong> {apt.size}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">السعر :</strong> {apt.price}</li>
        <li className="yellow fs-4"><strong className="text-light fs-5">اللوكيشن :</strong> <a href={apt.location} target="_blank" rel="noreferrer">اضغط هنا </a></li>
        <li className="yellow fs-4"><strong className="text-light fs-5">المميزات :</strong> {apt.notes}</li>
      </ul>
      <div className="text-center mt-3 d-flex justify-content-center">
        <Link className="cardbtn rounded nav-link custom-nav-link w-50 fs-5 fw-bold text-center text-warning mt-3" to="/Contact">تواصل معنا</Link>
      </div>
    </div>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}

export default Shops;
