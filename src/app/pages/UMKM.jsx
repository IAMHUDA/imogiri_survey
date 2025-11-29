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
import Footer from "../components/Footer";

/**
 * UMKM page — blue-white theme, consistent with Home & Contact.
 * - fade-in animation using IntersectionObserver (CSS injected below)
 * - decorative circles subtle (only hero + about if used)
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
  // images / data
  const umkmData = [
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

  // inject minimal CSS + intersection observer to add .is-visible on elements with .fade-in-item
  useEffect(() => {
    const id = "umkm-inline-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.innerHTML = `
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
      .fade-in-item { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
      .fade-in-item.is-visible { opacity: 1; transform: translateY(0); animation: fadeInUp .6s ease both; }

      .decor-hero { position: absolute; width: 320px; height: 320px; right: -80px; top: -80px; border-radius: 9999px; background: radial-gradient(circle at 30% 30%, #dfe7ff, transparent 45%); filter: blur(16px); opacity: .12; pointer-events:none; }

      .umkm-card-badge { display: inline-block; background: #eef6ff; color: #17307a; font-weight:700; padding: .25rem .6rem; border-radius:9999px; font-size: .75rem; }
      `;
      document.head.appendChild(s);
    }

    // intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // uncomment next line to stop observing after visible:
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in-item").forEach((el) => observer.observe(el));

    // cleanup
    return () => observer.disconnect();
  }, []);

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
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-[#f6f9ff] p-4">
              <img src={ImogiriImg} alt="Imogiri" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </section>
      </div>

      {/* STATS */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="fade-in-item">
              <UmkmStatCard number="50+" label="UMKM Terdaftar" from="#3b4bc6" to="#6d85f0" />
            </div>
            <div className="fade-in-item">
              <UmkmStatCard number="500+" label="Pengrajin Profesional" from="#6d85f0" to="#3b4bc6" />
            </div>
            <div className="fade-in-item">
              <UmkmStatCard number="1000+" label="Pelanggan Puas" from="#9bb0ff" to="#6d85f0" />
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#17307a] mb-8">Daftar UMKM</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {umkmData.map((u) => (
              <article
                key={u.id}
                className="fade-in-item bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:-translate-y-2"
              >
                <div className="h-44 relative overflow-hidden">
                  <img src={u.image} alt={u.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="p-4">
                  <span className="umkm-card-badge mb-3 inline-block">{u.category}</span>
                  <h3 className="text-lg font-bold text-[#17307a] mt-2">{u.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{u.description}</p>
                </div>
              </article>
            ))}
          </div>
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
