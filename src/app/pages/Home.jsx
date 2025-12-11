// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import SurveyNotification from "../components/SurveyNotification";
import SurveyForm from "../components/SurveyForm";
import { MapPin, Users, Store, TrendingUp } from "lucide-react";
import { useFadeInOnScroll } from "../../hooks/useFadeInOnScroll";
import { useParallax } from "../../hooks/useParallax";
import { useSurveys } from "../../hooks/useSurveys";

import Angkruksari from "../../assets/pasar/Angkruksari.jpg";
import ImogiriImg from "../../assets/pasar/Imogiri.jpg";
import Janten from "../../assets/pasar/Janten.jpg";
import BantulImg from "../../assets/pasar/Bantul.jpg";

import Footer from "../components/Footer";

function Home() {
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const featuresRef = useFadeInOnScroll();
  const aboutRef = useFadeInOnScroll();
  const ctaRef = useFadeInOnScroll();
  const parallaxAbout = useParallax(0.25);
  
  // Fetch surveys from backend
  const { data: surveysData } = useSurveys();
  
  // Filter to only show "survey layanan"
  const surveyLayanan = surveysData?.find(s => 
    s.namaSurvey?.toLowerCase().includes('survey layanan') ||
    s.namaSurvey?.toLowerCase().includes('layanan')
  );

  const fadeItemsRef = useRef([]);

useEffect(() => {
  const id = "home-inline-styles";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = `
    @keyframes fadeInUp { 
      from { opacity: 0; transform: translateY(12px);} 
      to { opacity: 1; transform: translateY(0);} 
    }
    .fade-in-item { 
      opacity: 0; 
      transform: translateY(12px); 
      transition: opacity .6s ease, transform .6s ease; 
    }
    .fade-in-item.is-visible { 
      opacity: 1 !important; 
      transform: translateY(0) !important; 
      animation: fadeInUp .6s ease both; 
    }

    /* PERBAIKAN: circle opacity sangat kecil agar tidak menutupi konten */
    .decor-circle { 
      position: absolute; 
      border-radius: 9999px; 
      pointer-events: none; 
      filter: blur(14px); 
      opacity: .05 !important; 
      z-index: 0; 
    }
    .hero-circle { width: 360px; height: 360px; right: -80px; top: -80px;
      background: radial-gradient(circle at 30% 30%, #dfe7ff, transparent 40%);
    }
    .about-circle { width: 260px; height: 260px; left: -100px; bottom: -60px;
      background: radial-gradient(circle at 30% 30%, #dfe7ff, transparent 40%);
    }
  `;

  document.head.appendChild(style);
}, []);


  const features = [
    {
      icon: <MapPin className="w-12 h-12 text-[#294baf]" />,
      title: "Lokasi Strategis",
      desc: "Akses mudah dan berada di pusat Kabupaten Bantul.",
    },
    {
      icon: <Store className="w-12 h-12 text-[#314fc7]" />,
      title: "UMKM Berkualitas",
      desc: "Ratusan UMKM unggulan dengan produk pilihan.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#5073ff]" />,
      title: "Komunitas Solid",
      desc: "Jaringan pengrajin yang saling mendukung.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#294baf]" />,
      title: "Terus Berkembang",
      desc: "Inovasi untuk penguatan ekonomi lokal.",
    },
  ];

  const stats = [
    { number: "45+", label: "UMKM Aktif" },
    { number: "12K+", label: "Penduduk" },
    { number: "30+", label: "Kegiatan Tahunan" },
  ];

  return (
    <div className="bg-white text-gray-800">
      
      {/* Survey Notification Banner */}
      {!showSurveyForm && surveyLayanan && (
        <SurveyNotification onTakeSurvey={() => setShowSurveyForm(true)} />
      )}
      
      {/* Survey Form Modal */}
      {showSurveyForm && surveyLayanan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#17307a]">Survey UMKM Imogiri</h2>
              <button
                onClick={() => setShowSurveyForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <SurveyForm 
                surveyId={surveyLayanan.id} 
                onClose={() => setShowSurveyForm(false)} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Carousel */}
      <section className="w-full">
        <Carousel />
      </section>

      {/* Hero */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#17307a] leading-tight">
              Pusat UMKM Imogiri
            </h1>

            <p className="text-gray-600 text-lg max-w-xl">
              Jelajahi UMKM lokal dan temukan produk terbaik dari para pengrajin Imogiri.
            </p>

            <div className="flex gap-4 flex-wrap mt-4">
              <Link
                to="/umkm"
                className="bg-[#294baf] text-white px-6 py-3 rounded-full font-bold hover:opacity-90"
              >
                Jelajahi Sekarang
              </Link>
              <Link
                to="/about"
                className="border border-[#d4ddff] text-[#17307a] px-6 py-3 rounded-full font-bold hover:bg-[#f4f6ff]"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          <div className="shadow-xl rounded-2xl overflow-hidden">
            <img src={ImogiriImg} alt="Imogiri" className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
<section 
  ref={featuresRef} 
  className="py-20 px-6 md:px-12 relative z-[2]"
>
  <div className="max-w-6xl mx-auto">
    
    <h2 className="text-3xl md:text-4xl font-black text-[#17307a] mb-10">
      Keunggulan Imogiri
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {features.map((f) => (
        <div
          key={f.title}
          className="fade-in-item is-visible group bg-white rounded-2xl p-8 border border-[#e5eaff] shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-2"
        >
          <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {f.icon}
          </div>
          <h3 className="text-2xl font-black text-[#17307a] mb-3 text-center">
            {f.title}
          </h3>
          <p className="text-gray-600 text-center font-medium">
            {f.description}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* Stats */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#294baf] to-[#17307a] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">Statistik Imogiri</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="fade-item bg-white/10 p-10 rounded-2xl border border-white/20 backdrop-blur"
              >
                <h3 className="text-4xl font-extrabold">{s.number}</h3>
                <p className="text-white/80 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h3 className="text-4xl font-extrabold text-[#17307a] mb-6">
              Tentang Imogiri
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Imogiri adalah pusat UMKM dan kerajinan tangan di Bantul. Daerah ini menjadi tempat berkembangnya berbagai pengrajin dan pedagang lokal.
            </p>

            <div className="flex gap-4">
              <Link to="/umkm" className="bg-[#294baf] text-white px-6 py-3 rounded-full font-bold">
                Pelajari Lebih Lanjut
              </Link>
              <Link to="/kontak" className="border border-[#d4ddff] text-[#17307a] px-6 py-3 rounded-full font-bold">
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div
            ref={parallaxAbout.elementRef}
            style={parallaxAbout.style}
            className="shadow-xl rounded-2xl overflow-hidden"
          >
            <img src={Angkruksari} alt="angkruksari" className="w-full h-72 object-cover" />
          </div>

        </div>
      </section>

      {/* Survey CTA */}
      <section className="py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white shadow-lg border border-[#eef2ff] rounded-2xl p-10 text-center">
          <h4 className="text-3xl font-extrabold text-[#17307a] mb-4">
            Dukung Survei UMKM Imogiri
          </h4>

          <p className="text-gray-600 mb-6">
            Bantu kami mengumpulkan data untuk meningkatkan kualitas UMKM lokal.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/survey" className="bg-[#294baf] text-white px-6 py-3 rounded-full font-bold">
              Ikuti Survei
            </Link>
            <Link to="/kontak" className="border border-[#d4ddff] px-6 py-3 rounded-full font-bold text-[#17307a]">
              Butuh Bantuan?
            </Link>
          </div>
        </div>
      </section>

      {/* UMKM Unggulan */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">

          <h3 className="text-3xl font-black text-[#17307a] mb-8 text-center">
            UMKM Unggulan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { img: ImogiriImg, title: "Pasar Imogiri", desc: "Pusat perdagangan lokal." },
              { img: Angkruksari, title: "Pasar Angkruksari", desc: "Kerajinan tradisional." },
              { img: Janten, title: "Kerajinan Janten", desc: "Desain inovatif lokal." },
              { img: BantulImg, title: "Pasar Bantul", desc: "Produk lengkap Bantul." }
            ].map((u, i) => (
              <Link
                to="/umkm"
                key={i}
                className="bg-white border border-[#eef2ff] rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img src={u.img} alt={u.title} className="w-full h-44 object-cover" />

                <div className="p-4">
                  <h4 className="font-bold text-[#17307a]">{u.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{u.desc}</p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={ctaRef}
        className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#294baf] to-[#17307a] text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Siap Bergabung?
          </h3>
          <p className="mb-8 text-white/90">
            Dukung UMKM lokal dan bantu ekonomi kreatif tumbuh.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/umkm" className="bg-white text-[#17307a] px-6 py-3 rounded-full font-bold">
              Jelajahi UMKM
            </Link>
            <Link to="/kontak" className="border border-white px-6 py-3 rounded-full">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
