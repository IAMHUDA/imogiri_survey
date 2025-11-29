// src/pages/Contact.jsx
import React, { useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useFadeInOnScroll } from "../../hooks/useFadeInOnScroll";
import Footer from "../components/Footer";

function Contact() {
  const headerRef = useFadeInOnScroll();
  const contactRef = useFadeInOnScroll();
  const mapRef = useFadeInOnScroll();

  // Inject fade-in + accent background
  useEffect(() => {
    const id = "contact-inline-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-in-item {
        opacity: 0;
        transform: translateY(12px);
        transition: opacity .6s ease, transform .6s ease;
      }
      .fade-in-item.is-visible {
        opacity: 1;
        transform: translateY(0);
        animation: fadeInUp .6s ease both;
      }

      .contact-accent-circle {
        position: absolute;
        width: 380px;
        height: 380px;
        left: -120px;
        top: -80px;
        border-radius: 9999px;
        background: radial-gradient(circle at 30% 30%, #eaf3ff, transparent 60%);
        opacity: .35;
        filter: blur(10px);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-[#1b3fa7]" />,
      title: "Alamat",
      content: "Jl. Raya Imogiri-Yogya Km 15, Topyasan Dk, Paduresan",
      subContent: "Imogiri, Imogiri, Bantul 56782",
    },
    {
      icon: <Phone className="w-8 h-8 text-[#1b3fa7]" />,
      title: "Nomor Telepon",
      content: " ",
      link: true,
    },
    {
      icon: <Mail className="w-8 h-8 text-[#1b3fa7]" />,
      title: "Email",
      content: "desa.imogiri@bantuikab.go.id",
      link: true,
    },
    {
      icon: <Clock className="w-8 h-8 text-[#1b3fa7]" />,
      title: "Jam Kerja",
      content: "Senin - Jumat: 08:00 - 16:00",
      subContent: "Sabtu - Minggu: Libur",
    },
  ];

  return (
    <div id="contact" className="relative min-h-screen bg-white text-gray-800">
      <div className="contact-accent-circle hidden lg:block"></div>

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div
          ref={headerRef}
          className="max-w-6xl mx-auto text-center fade-in-item"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1b3fa7] mb-4">
            Kontak Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hubungi kami untuk mendapatkan informasi terkait Kelurahan Imogiri
            dan layanan UMKM lokal.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div
          ref={contactRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-item"
        >
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="
                bg-white 
                rounded-2xl 
                shadow-sm 
                border border-[#e4edff] 
                p-6 
                text-center 
                hover:shadow-xl 
                hover:-translate-y-1 
                transition-all 
                duration-300
              "
            >
              <div className="flex justify-center mb-4">{info.icon}</div>
              <h3 className="text-xl font-semibold text-[#1b3fa7]">
                {info.title}
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                {info.content?.trim() !== "" ? info.content : <span className="text-gray-300">-</span>}
              </p>

              {info.subContent && (
                <p className="text-xs text-gray-400 mt-2">{info.subContent}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div
  className="w-full mt-10 bg-white rounded-xl shadow-md p-5"
  data-aos="fade-up"
>
  <h2 className="text-2xl font-bold text-blue-700 mb-4">Lokasi Kami</h2>

  <div className="w-full h-[350px] rounded-lg overflow-hidden border border-blue-200 shadow-sm">
    <iframe
      title="maps"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.301686108736!2d106.82267477583924!3d-6.219219293773811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e5e2a492e5%3A0x23a74d06e5fdf801!2sUniversitas%20XYZ!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <div
          className="
            bg-gradient-to-r 
            from-[#e9f1ff] 
            to-white 
            rounded-2xl 
            p-10 
            shadow-sm 
            border border-[#e4edff] 
            text-center
          "
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1b3fa7] mb-4">
            Kunjungi Kami
          </h2>
          <p className="text-gray-600 mb-6">
            Datang langsung ke Imogiri dan lihat UMKM lokal dari dekat.
          </p>

          <button
            className="
              bg-[#3b4bc6] 
              text-white 
              px-7 py-3 
              rounded-full 
              font-semibold 
              shadow 
              hover:-translate-y-1 
              hover:shadow-lg 
              transition-all 
              duration-300
            "
          >
            Jadwalkan Kunjungan
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
