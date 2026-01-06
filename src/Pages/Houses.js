import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function Houses() {
  const [Houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // حالات الفلاتر
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbx1l6lnhDpxPh5dGqyWQmTZrvjluuLlTfR-iio2EYcpQvKwc-kRSTPDMPsOmYMufWTT/exec")
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
        let result = [...Houses];
    
        // 1. الفلترة
        if (selectedCity) result = result.filter(apt => apt.city === selectedCity);
        if (selectedOwner) result = result.filter(apt => apt.owner === selectedOwner);
    
        // 2. الترتيب (بما أن التاريخ نص بصيغة YYYY-MM-DD)
       if (sortOrder) {
          result.sort((a, b) => {
            // إذا كانت الخانة فاضية، نعتبرها "أقدم شيء ممكن" عشان تنزل تحت
            const dateA = a.date ? new Date(a.date) : new Date(0); 
            const dateB = b.date ? new Date(b.date) : new Date(0);
    
            // معالجة الخانات الفاضية (دائماً في الأسفل)
            if (!a.date) return 1; // حرك 'a' للآخر
            if (!b.date) return -1; // حرك 'b' للآخر
    
            if (sortOrder === "newest") {
              return dateB - dateA; // من الأحدث للأقدم
            } else {
              return dateA - dateB; // من الأقدم للأحدث
            }
          });
        }
    
        setFilteredHouses(result);
      }, [selectedCity, selectedOwner, sortOrder, Houses]);
    
      const uniqueCities = [...new Set(Houses.map(apt => apt.city))].filter(Boolean);
      const uniqueOwners = [...new Set(Houses.map(apt => apt.owner))].filter(Boolean);
    

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

  if (!loading && Houses.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light text-center">
        <div>
          <h3 className="text-warning mb-3">لا توجد بيانات متاحة حاليًا</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" dir="rtl">
      <h1 className="darkgray fw-bold rounded sectionehead my-5 p-3">
                       البيوت
                    </h1>
      <div className="text-center mb-4">
        <button 
          className="btn btn-warning fw-bold px-4 py-2 shadow"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "الفلاتر   ▲" : " الفلاتر   ▼"}
        </button>
      </div>

      {/* قسم الفلاتر بنظام الـ Collapse */}
      <div className={`collapse ${showFilters ? "show" : ""} mb-5`}>
        <div className="card card-body bg-secondary border-0 shadow text-light p-4">
          <div className="row">
            <div className="col-md-4 mb-4 text-start">
              <label className="form-label fw-bold small">البلد :</label>
              <select className="form-select shadow-sm" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">كل البلاد</option>
                {uniqueCities.map((city, i) => <option key={i} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="col-md-4 mb-4 text-start">
              <label className="form-label fw-bold small">المالك :</label>
              <select className="form-select shadow-sm" value={selectedOwner} onChange={(e) => setSelectedOwner(e.target.value)}>
                <option value="">كل الملاك</option>
                {uniqueOwners.map((owner, i) => <option key={i} value={owner}>{owner}</option>)}
              </select>
            </div>

            <div className="col-md-4 mb-4 text-start">
              <label className="form-label fw-bold small">الترتيب :</label>
              <select className="form-select shadow-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">بدون ترتيب</option>
                <option value="newest">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
              </select>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <button className="btn btn-outline-warning btn-sm fw-bold px-4 text-black" onClick={() => {
              setSelectedCity(""); setSelectedOwner(""); setSortOrder("");
            }}>إعادة الضبط  </button>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredHouses.map((apt, index) => (
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
        {apt.category && (<li className="yellow fs-4"><strong className="text-light fs-5"></strong> {apt.category}</li>)}
        {apt.city && (<li className="yellow fs-4"><strong className="text-light fs-5">البلد :</strong> {apt.city}</li>)}
        {apt.area && (<li className="yellow fs-4"><strong className="text-light fs-5">المنطقة :</strong> {apt.area}</li>)}
        {apt.number && (<li className="yellow fs-4"><strong className="text-light fs-5">رقم العمارة :</strong> {apt.number}</li>)}
        {apt.floornum && (<li className="yellow fs-4"><strong className="text-light fs-5">عدد الأدوار :</strong> {apt.floornum}</li>)}
        {apt.front && (<li className="yellow fs-4"><strong className="text-light fs-5">الواجهة :</strong> {apt.front}</li>)}
        {apt.size && (<li className="yellow fs-4"><strong className="text-light fs-5">المساحة :</strong> {apt.size}</li>)}
        {apt.price && (<li className="yellow fs-4"><strong className="text-light fs-5">السعر :</strong> {apt.price}</li>)}
        {apt.location && (<li className="yellow fs-4"> <strong className="text-light fs-5">اللوكيشن :</strong>{" "} <a href={apt.location} target="_blank" rel="noreferrer"> اضغط هنا </a> </li>)}
        {apt.owner && (<li className="yellow fs-4"><strong className="text-light fs-5">المالك :</strong> {apt.owner}</li>)}
        {apt.date && (<li className="yellow fs-4"><strong className="text-light fs-5">التاريخ :</strong> {(apt.date)}</li>)}
        {apt.notes && (<li className="yellow fs-4"><strong className="text-light fs-5">التفاصيل :</strong> {apt.notes}</li>)}
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

export default Houses;
