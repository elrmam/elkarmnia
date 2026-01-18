import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // حالات الفلاتر
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbzIb9Xvv-j_vsg4xn0ocSwknUlf9w1A8mIPh69oiY2M_8FVaWoSk5pzFHOrbYUjf9hYUw/exec")
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data);
        setFilteredBuildings(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // منطق الفلترة والترتيب
  useEffect(() => {
    let result = [...buildings];

    if (selectedOwner) result = result.filter(apt => apt.owner === selectedOwner);
    if (selectedCategory) result = result.filter(apt => apt.category === selectedCategory);
    if (selectedType) result = result.filter(apt => apt.type === selectedType);

    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        if (!a.date) return 1;
        if (!b.date) return -1;
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredBuildings(result);
  }, [selectedOwner, selectedCategory, selectedType, sortOrder, buildings]);

  // استخراج القيم الفريدة للقوائم (منطق ديناميكي)
  const uniqueOwners = [...new Set(buildings.map(apt => apt.owner))].filter(Boolean);

  const uniqueCategories = [...new Set(
    buildings
      .filter(apt => !selectedOwner || apt.owner === selectedOwner)
      .map(apt => apt.category)
  )].filter(Boolean);

  const uniqueTypes = [...new Set(
    buildings
      .filter(apt => (!selectedOwner || apt.owner === selectedOwner) && (!selectedCategory || apt.category === selectedCategory))
      .map(apt => apt.type)
  )].filter(Boolean);

  // دوال التعامل مع التغيير لتصفير الفلاتر التابعة
  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value);
    setSelectedCategory(""); // صفر البروجكت لو المالك اتغير
    setSelectedType("");     // صفر النوع لو المالك اتغير
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedType("");     // صفر النوع لو البروجكت اتغير
  };

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

  return (
    <div className="container py-4">
      <h1 className="darkgray fw-bold rounded sectionehead my-5 p-3 text-center">
        التطوير العقاري
      </h1>

      <div className="text-center mb-4">
        <button className="btn btn-warning fw-bold px-4 shadow" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "إخفاء الفلاتر ▲" : "إظهار الفلاتر ▼"}
        </button>
      </div>

      <div className={`collapse ${showFilters ? "show" : ""} mb-5`}>
        <div className="card card-body bg-secondary border-0 shadow text-light p-4">
          <div className="row" dir="rtl">
            <div className="col-md-3 mb-3 text-start">
              <label className="form-label fw-bold small">المالك :</label>
              <select className="form-select shadow-sm" value={selectedOwner} onChange={handleOwnerChange}>
                <option value="">كل الملاك</option>
                {uniqueOwners.map((owner, i) => <option key={i} value={owner}>{owner}</option>)}
              </select>
            </div>

            <div className="col-md-3 mb-3 text-start">
              <label className="form-label fw-bold small">البروجكت :</label>
              <select className="form-select shadow-sm" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">كل البروجكتات</option>
                {uniqueCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="col-md-3 mb-3 text-start">
              <label className="form-label fw-bold small">نوع الوحدة :</label>
              <select className="form-select shadow-sm" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">كل الأنواع</option>
                {uniqueTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
              </select>
            </div>

            <div className="col-md-3 mb-3 text-start">
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
              setSelectedOwner(""); setSelectedCategory(""); setSelectedType(""); setSortOrder("");
            }}>إعادة الضبط</button>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredBuildings.map((apt, index) => (
          <div key={index} className="col-lg-6 col-md-12 mb-4">
            <div className="card apartment-card shadow-sm border-0">
              <div id={`carousel${index}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {apt.images?.map((img, i) => (
                    <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                      <img src={img} className="d-block w-100" alt={`building ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>

              <div className="building-body bg-secondary">
                <ul dir="rtl">
                  {apt.owner && (<li className="yellow fs-4"><strong className="text-light fs-5">المالك :</strong> {apt.owner}</li>)}
                  {apt.category && (<li className="yellow fs-4"><strong className="text-light fs-5">البروجكت :</strong> {apt.category}</li>)}
                  {apt.type && (<li className="yellow fs-4"><strong className="text-light fs-5">نوع الوحدة :</strong> {apt.type}</li>)}
                  {apt.city && (<li className="yellow fs-4"><strong className="text-light fs-5">المدينة :</strong> {apt.city}</li>)}
                  {apt.area && (<li className="yellow fs-4"><strong className="text-light fs-5">المنطقة :</strong> {apt.area}</li>)}
                  {apt.unitnum && (<li className="yellow fs-4"><strong className="text-light fs-5">رقم البناية :</strong> {apt.unitnum}</li>)}
                  {apt.apartmentnum && (<li className="yellow fs-4"><strong className="text-light fs-5">رقم الوحدة :</strong> {apt.apartmentnum}</li>)}
                  {apt.floor && (<li className="yellow fs-4"><strong className="text-light fs-5">الدور :</strong> {apt.floor}</li>)}
                  {apt.front && (<li className="yellow fs-4"><strong className="text-light fs-5">الواجهة :</strong> {apt.front}</li>)}
                  {apt.condition && (<li className="yellow fs-4"><strong className="text-light fs-5">حالة البناء :</strong> {apt.condition}</li>)}
                  {apt.size && (<li className="yellow fs-4"><strong className="text-light fs-5">المساحة :</strong> {apt.size}</li>)}
                  {apt.meterprice && (<li className="yellow fs-4"><strong className="text-light fs-5">سعر المتر :</strong> {apt.meterprice}</li>)}
                  {apt.totalprice && (<li className="yellow fs-4"><strong className="text-light fs-5">سعر الوحدة :</strong> {apt.totalprice}</li>)}
                  {apt.payment && (<li className="yellow fs-4"><strong className="text-light fs-5">نظام السداد :</strong> {apt.payment}</li>)}
                  {apt.receive && (<li className="yellow fs-4"><strong className="text-light fs-5">موعد التسليم :</strong> {apt.receive}</li>)}
                  {apt.location && (<li className="yellow fs-4"><strong className="text-light fs-5">اللوكيشن :</strong> <a href={apt.location} target="_blank" rel="noreferrer"> اضغط هنا </a> </li>)}
                  {apt.date && (<li className="yellow fs-4"><strong className="text-light fs-5">التاريخ :</strong> {apt.date}</li>)}
                  {apt.notes && (<li className="yellow fs-4"><strong className="text-light fs-5">التفاصيل :</strong> {apt.notes}</li>)}
                  {apt.details && (<li className="yellow fs-4"><strong className="text-light fs-5">عن البروجكت :</strong> {apt.details}</li>)}
                </ul>
                <div className="text-center mt-3 mb-5 d-flex justify-content-center">
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

export default Buildings;