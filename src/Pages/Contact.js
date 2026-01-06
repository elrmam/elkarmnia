import React from "react";

const contacts = [
  {
    name: "كابتن / عفت أمين",
    phone: "+201018215053",
  },
  {
    name: "م / محمد أبو الفرح",
    phone: "+201007952665",
  },
  {
    name: "م / أحمد رضا",
    phone: "+201003123576",
  },
  {
    name: "ا / محمد المليجى",
    phone: "+201122302540",
  },
  {
    name: "ا / أحمد أيمن",
    phone: "+201055400117",
  }
];

export default function Contact() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 sectionehead fw-bold">تواصل معنا</h2>

      <div className="row">
        {contacts.map((c, idx) => (
          <div key={idx} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card contact-card h-100 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center text-center">
                <div className="avatar-wrapper mb-3">
                  <img
                    src={`/avatar${idx + 1}.png`}
                    alt={c.name}
                    className="avatar-img"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/avatar-placeholder.png'; }}
                  />
                </div>

                <h5 className="fw-bold mb-1 text-light">{c.name}</h5>

                <div className="mb-2">
                  <a className="d-block contact-link" href={`tel:${c.phone}`}>
                    ☎️ {c.phone}
                  </a>
                </div>

                <div className="mt-auto w-100">
                  <a
                    href={`https://wa.me/${c.phone}?text=${encodeURIComponent("مرحبًا، أود الاستفسار عن عقار")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn whatsapp-btn w-100 mb-2"
                  >
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
