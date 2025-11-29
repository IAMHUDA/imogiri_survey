// src/pages/Survey.jsx
import React, { useEffect, useState } from "react";
import { FileText, HelpCircle } from "lucide-react";
import Footer from "../components/Footer";

/**
 * Survey page — uses the same blue-white visual system and fade-in animations.
 * - FAQ with simple accordion state
 * - Documents & news listing follow same card style
 */

export default function Survey() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const surveyDescription = {
    tujuan:
      "Mengumpulkan data tentang persepsi, kepuasan, dan kebutuhan masyarakat Imogiri terhadap UMKM lokal untuk pengembangan berkelanjutan.",
    manfaat: [
      "Memahami kebutuhan dan harapan komunitas",
      "Meningkatkan kualitas produk dan layanan UMKM",
      "Mengidentifikasi peluang pengembangan bisnis",
      "Memperkuat hubungan antara UMKM dan masyarakat",
    ],
    siapaDisurvei:
      "Masyarakat umum, konsumen UMKM, pelaku usaha lokal, dan pengunjung kawasan Imogiri",
    periode: "November 2025 - Desember 2025",
  };

  const faqs = [
    {
      id: 1,
      question: "Berapa lama waktu yang diperlukan untuk mengisi survei?",
      answer:
        "Rata-rata waktu pengisian survei adalah 5-10 menit, tergantung dari detail jawaban yang Anda berikan.",
    },
    {
      id: 2,
      question: "Apakah data saya akan dijaga kerahasiaannya?",
      answer:
        "Ya, semua data responden dijaga kerahasiaannya sesuai dengan pedoman etika survei. Data hanya digunakan untuk keperluan penelitian dan pengembangan UMKM.",
    },
    {
      id: 3,
      question: "Siapa yang bisa mengikuti survei ini?",
      answer:
        "Siapa saja yang pernah mengunjungi, berbelanja, atau memiliki pengalaman dengan UMKM Imogiri dapat mengikuti survei ini.",
    },
    {
      id: 4,
      question: "Bagaimana jika saya mengalami kesulitan dalam mengisi survei?",
      answer:
        "Silakan hubungi tim kami melalui email atau telepon yang tersedia di bagian Kontak Penanggung Jawab.",
    },
  ];

  const documents = [
    { id: 1, title: "Panduan Pelaksanaan Survei", description: "Panduan lengkap tentang cara mengikuti survei ini" },
    { id: 2, title: "Pedoman Etika Survei", description: "Peraturan dan etika yang berlaku dalam survei ini" },
    { id: 3, title: "Surat Rekomendasi", description: "Surat dari pemerintah daerah untuk pelaksanaan survei" },
  ];

  const news = [
    {
      id: 1,
      title: "Survei UMKM Imogiri Dimulai",
      date: "15 November 2025",
      description:
        "Pemerintah Kelurahan Imogiri secara resmi meluncurkan survei untuk mengukur kepuasan masyarakat terhadap produk dan layanan UMKM lokal.",
    },
    {
      id: 2,
      title: "Jadwal Pelaporan Hasil Survei",
      date: "20 November 2025",
      description:
        "Hasil survei UMKM Imogiri akan dilaporkan secara resmi pada akhir Desember 2025.",
    },
  ];

  // inject shared fade-in css (if not present)
  useEffect(() => {
    const id = "survey-inline-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.innerHTML = `
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
      .fade-in-item { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
      .fade-in-item.is-visible { opacity: 1; transform: translateY(0); animation: fadeInUp .6s ease both; }

      .doc-card { border-radius: 12px; padding: 12px; background: white; box-shadow: 0 6px 18px rgba(8,31,66,0.06); border: 1px solid #eef6ff; }
      `;
      document.head.appendChild(s);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".fade-in-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#17307a] mb-3">Survey UMKM Imogiri</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bantuan Anda sangat berharga untuk pengembangan UMKM lokal kami.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="fade-in-item doc-card">
            <h3 className="text-xl font-bold text-[#17307a] mb-3">Tujuan Survei</h3>
            <p className="text-gray-700">{surveyDescription.tujuan}</p>
          </div>

          <div className="fade-in-item doc-card">
            <h3 className="text-xl font-bold text-[#17307a] mb-3">Siapa yang Disurvei</h3>
            <p className="text-gray-700">{surveyDescription.siapaDisurvei}</p>
            <p className="text-sm text-gray-500 mt-2">Periode: {surveyDescription.periode}</p>
          </div>
        </div>
      </section>

      {/* Manfaat */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78] text-white rounded-2xl p-6 fade-in-item">
            <h4 className="text-xl font-extrabold mb-4">Manfaat Survei</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {surveyDescription.manfaat.map((m, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">✓</div>
                  <p className="text-white/90">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-extrabold text-[#17307a] mb-6 text-center">Pertanyaan yang Sering Diajukan</h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="fade-in-item doc-card">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center p-3"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#17307a]" />
                    <span className="font-bold text-[#17307a]">{faq.question}</span>
                  </div>
                  <div className="text-sm text-gray-500">{expandedFaq === faq.id ? "Tutup" : "Buka"}</div>
                </button>

                {expandedFaq === faq.id && (
                  <div className="px-3 pb-3 pt-0">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & News */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-extrabold text-[#17307a] mb-4">Dokumen</h4>
            <div className="grid gap-3">
              {documents.map((d) => (
                <div key={d.id} className="fade-in-item doc-card flex gap-4 items-center">
                  <FileText className="w-6 h-6 text-[#3b4bc6]" />
                  <div>
                    <div className="font-semibold text-[#17307a]">{d.title}</div>
                    <div className="text-sm text-gray-600">{d.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-[#17307a] mb-4">Berita</h4>
            <div className="grid gap-3">
              {news.map((n) => (
                <article key={n.id} className="fade-in-item doc-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-[#17307a]">{n.title}</h5>
                      <p className="text-sm text-gray-500">{n.date}</p>
                      <p className="text-sm text-gray-700 mt-2">{n.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78] text-white rounded-2xl p-8 text-center fade-in-item">
            <h4 className="text-2xl font-extrabold mb-3">Suara Anda Penting!</h4>
            <p className="mb-4 text-white/90">Terima kasih telah meluangkan waktu untuk mempelajari survei ini.</p>
            <a className="inline-block bg-white text-[#17307a] px-6 py-3 rounded-full font-bold">Mulai Mengisi Survei</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
