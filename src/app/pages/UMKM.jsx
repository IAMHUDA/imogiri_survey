// src/pages/UMKM.jsx
import React, { useEffect } from "react";
import Angkruksari from "../../assets/pasar/Angkruksari.jpg";
import Bantul from "../../assets/pasar/Bantul.jpg";
import Barongan from "../../assets/pasar/Barongan.jpg";
import Gatak from "../../assets/pasar/Gatak.jpg";
import Gumulan from "../../assets/pasar/Gumulan.jpg";
import HewanImogiri from "../../assets/pasar/HewanImogiri.jpg";
import ImogiriImg from "../../assets/pasar/Imogiri.jpg";
import Janten from "../../assets/pasar/Janten.jpg";
import { useCounterAnimation } from "../../hooks/useCounterAnimation";
import { useUMKMs } from "../../hooks/useUMKM";
import Footer from "../components/Footer";

/**
 * UMKM page — blue-white theme, consistent with Home & Contact.
 * - fade-in animation using IntersectionObserver (CSS injected below)
 * - decorative circles subtle (only hero + about if used)
 * - Integrated with React Query to fetch UMKM data from backend
 */

const UmkmStatCard = ({ number, label, from = "#3b4bc6", to = "#1f2a78" }) => {
  const { count, elementRef } = useCounterAnimation(number);

  return (
    <div
      ref={elementRef}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      className="rounded-2xl shadow-lg p-8 text-center text-white fade-in-item"
    >
      <div className="text-4xl md:text-5xl font-extrabold mb-2">
        {count}
        {number.replaceAll(/\d/g, "")}
      </div>
      <div className="text-lg font-semibold">{label}</div>
    </div>
  );
};

export default function UMKM() {
  // Fetch UMKM data from backend using React Query
  const { data: umkmData, isLoading, isError, error } = useUMKMs();
  
  // Fallback data for display (will be replaced by backend data)
  const fallbackUmkmData = [
    {
      id: 1,
      name: "Pasar Angkruksari",
      description: "Pusat kerajinan tradisional dengan produk lokal berkualitas tinggi",
      image: Angkruksari,
      category: "Kerajinan Tangan",
    },
    {
      id: 2,
      name: "Pasar Bantul",
      description: "Pasar dengan koleksi lengkap hasil produksi lokal Bantul",
      image: Bantul,
      category: "Produk Lokal",
    },
    {
      id: 3,
      name: "Kerajinan Barongan",
      description: "Spesialisasi pembuatan topeng dan kerajinan barongan tradisional",
      image: Barongan,
      category: "Seni Tradisional",
    },
    {
      id: 4,
      name: "Industri Gatak",
      description: "Pusat penghasil produk keramik dan gerabah berkualitas",
      image: Gatak,
      category: "Keramik",
    },
    {
      id: 5,
      name: "Kerajinan Gumulan",
      description: "Usaha mikro dengan produk kerajinan khas Gumulan",
      image: Gumulan,
      category: "Kerajinan",
    },
    {
      id: 6,
      name: "Peternakan Hewan Imogiri",
      description: "Usaha peternakan dengan standar kebersihan dan kesehatan terjamin",
      image: HewanImogiri,
      category: "Peternakan",
    },
    {
      id: 7,
      name: "Pasar Imogiri",
      description: "Pasar tradisional pusat perdagangan masyarakat Imogiri",
      image: ImogiriImg,
      category: "Pasar Tradisional",
    },
    {
      id: 8,
      name: "Kerajinan Janten",
      description: "Produksi kerajinan tangan dengan desain inovatif dan unik",
      image: Janten,
      category: "Desain Inovatif",
    },
  ];
  
  // Use backend data if available and not empty, otherwise use fallback
  const displayData = (umkmData && umkmData.length > 0) ? umkmData : fallbackUmkmData;
  
  // Helper to get image URL from backend or fallback
  const getImageUrl = (umkm) => {
    if (umkm.fotoProduk) {
      // Backend image URL
      return `${import.meta.env.VITE_API_BASE_URL}${umkm.fotoProduk}`;
    }
    // Fallback to local images based on name
    const imageMap = {
      'Angkruksari': Angkruksari,
      'Bantul': Bantul,
      'Barongan': Barongan,
      'Gatak': Gatak,
      'Gumulan': Gumulan,
      'Hewan': HewanImogiri,
      'Imogiri': ImogiriImg,
      'Janten': Janten,
    };
    const key = Object.keys(imageMap).find(k => umkm.nama?.includes(k) || umkm.name?.includes(k));
    return imageMap[key] || ImogiriImg;
  };

  // Advanced parallax and animation effects
  useEffect(() => {
    const id = "umkm-inline-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.innerHTML = `
      @keyframes fadeInUp { 
        from { opacity: 0; transform: translateY(40px) scale(0.95); } 
        to { opacity: 1; transform: translateY(0) scale(1); } 
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      
      @keyframes floatReverse {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(20px) rotate(-5deg); }
      }
      
      .fade-in-item { 
        opacity: 0; 
        transform: translateY(40px) scale(0.95); 
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .fade-in-item.is-visible { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
        animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; 
      }

      .decor-hero { 
        position: absolute; 
        width: 320px; 
        height: 320px; 
        right: -80px; 
        top: -80px; 
        border-radius: 9999px; 
        background: radial-gradient(circle at 30% 30%, #dfe7ff, transparent 45%); 
        filter: blur(16px); 
        opacity: .12; 
        pointer-events:none; 
      }
      
      .parallax-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      }
      
      .floating-shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(59, 75, 198, 0.1), rgba(157, 176, 255, 0.1));
        animation: float 6s ease-in-out infinite;
      }
      
      .floating-shape:nth-child(2) {
        animation: floatReverse 8s ease-in-out infinite;
        animation-delay: 1s;
      }
      
      .floating-shape:nth-child(3) {
        animation: float 10s ease-in-out infinite;
        animation-delay: 2s;
      }

      .umkm-card-badge { 
        display: inline-block; 
        background: linear-gradient(135deg, #eef6ff, #dfe7ff); 
        color: #17307a; 
        font-weight:700; 
        padding: .25rem .6rem; 
        border-radius:9999px; 
        font-size: .75rem; 
        box-shadow: 0 2px 8px rgba(23, 48, 122, 0.1);
      }
      
      .umkm-card {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .umkm-card:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 20px 40px rgba(23, 48, 122, 0.15);
      }
      `;
      document.head.appendChild(s);
    }

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-layer');
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.3;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      // Floating shapes parallax
      const shapes = document.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
      });
    };

    // Intersection observer with staggered delay
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, index * 100); // Staggered animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    document.querySelectorAll(".fade-in-item").forEach((el) => observer.observe(el));

    // 3D tilt effect on mouse move
    const cards = document.querySelectorAll('.umkm-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    window.addEventListener('scroll', handleScroll);

    // cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayData]); // Re-run when displayData changes

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <div className="relative">
        <div className="decor-hero hidden lg:block" />
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 items-center gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#17307a] mb-4">UMKM Imogiri</h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Jelajahi keindahan dan kualitas produk lokal dari berbagai usaha mikro kecil menengah di kawasan Imogiri.
              </p>
              
              {/* Loading State */}
              {isLoading && (
                <div className="mt-4 text-[#17307a]">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#17307a]"></div>
                  <span className="ml-2">Memuat data UMKM...</span>
                </div>
              )}
              
              {/* Error State */}
              {isError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm font-semibold">Gagal memuat data UMKM</p>
                  <p className="text-red-600 text-xs mt-1">{error?.message || 'Terjadi kesalahan'}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-[#f6f9ff] p-4">
              <img src={ImogiriImg} alt="Imogiri" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </section>
      </div>

      {/* GRID */}
      <section className="py-12 px-6 md:px-12 relative overflow-hidden">
        {/* Parallax Background */}
        <div className="parallax-bg">
          <div className="floating-shape" style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '5%',
            opacity: 0.6
          }}></div>
          <div className="floating-shape" style={{
            width: '200px',
            height: '200px',
            top: '40%',
            right: '10%',
            opacity: 0.4
          }}></div>
          <div className="floating-shape" style={{
            width: '250px',
            height: '250px',
            bottom: '20%',
            left: '50%',
            opacity: 0.5
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#17307a] mb-8 parallax-layer">Daftar UMKM</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#17307a]"></div>
              <p className="mt-4 text-[#17307a]">Memuat data UMKM...</p>
            </div>
          )}
          
          {/* Error State */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 font-semibold">Gagal memuat data UMKM</p>
              <p className="text-red-600 text-sm mt-2">{error?.message || 'Terjadi kesalahan'}</p>
            </div>
          )}
          
          {/* UMKM Grid */}
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayData?.map((u) => (
                <article
                  key={u.id}
                  className="fade-in-item umkm-card bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={getImageUrl(u)} 
                      alt={u.namaUsaha || u.nama || u.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    {/* Jangkauan Pemasaran Badge */}
                    {(u.jangkauanPemasaran || u.kategori || u.category) && (
                      <span className="umkm-card-badge mb-3 inline-block">
                        {u.jangkauanPemasaran || u.kategori || u.category}
                      </span>
                    )}
                    
                    {/* Nama Usaha */}
                    <h3 className="text-xl font-bold text-[#17307a] mt-2 mb-3">
                      {u.namaUsaha || u.nama || u.name}
                    </h3>
                    
                    {/* Info Grid */}
                    <div className="space-y-2 mb-3">
                      {/* Nama Pemilik */}
                      {(u.namaPemilik || u.pemilik) && (
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#17307a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            <strong>Pemilik:</strong> {u.namaPemilik || u.pemilik}
                          </span>
                        </div>
                      )}
                      
                      {/* Tahun Berdiri */}
                      {u.tahunBerdiri && (
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#17307a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            <strong>Berdiri:</strong> {u.tahunBerdiri}
                          </span>
                        </div>
                      )}
                      
                      {/* Jumlah Karyawan */}
                      {u.jumlahKaryawan && (
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#17307a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            <strong>Karyawan:</strong> {u.jumlahKaryawan} orang
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Description (fallback) */}
                    {(u.deskripsi || u.description) && (
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {u.deskripsi || u.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78] text-white rounded-2xl p-10 shadow-lg text-center fade-in-item">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Dukung UMKM Lokal</h3>
            <p className="mb-6 text-white/90">Dengan membeli produk lokal, Anda turut mendukung perkembangan ekonomi masyarakat Imogiri.</p>
            <button className="bg-white text-[#17307a] px-6 py-3 rounded-full font-bold shadow hover:-translate-y-1 transition">Hubungi UMKM</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
