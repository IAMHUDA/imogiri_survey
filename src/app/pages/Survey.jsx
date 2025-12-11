// src/pages/Survey.jsx
import React, { useEffect, useState } from "react";
import { FileText, HelpCircle } from "lucide-react";
import Footer from "../components/Footer";
import SurveyForm from "../components/SurveyForm";
import { useSurveys } from "../../hooks/useSurveys";

/**
 * Survey page — uses the same blue-white visual system and fade-in animations.
 * - FAQ with simple accordion state
 * - Documents & news listing follow same card style
 * - Integrated with React Query to fetch surveys from backend
 * - Survey notification moved to Home page
 */

export default function Survey() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showSurveyList, setShowSurveyList] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  
  // Fetch surveys from backend using React Query
  const { data: surveysData, isLoading, isError, error } = useSurveys();
  
  const handleSelectSurvey = (surveyId) => {
    setSelectedSurveyId(surveyId);
    setShowSurveyList(false);
    setShowSurveyForm(true);
  };

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
      {/* Survey List Modal */}
      {showSurveyList && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#17307a]">Pilih Survey</h2>
              <button
                onClick={() => setShowSurveyList(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#17307a]"></div>
                  <p className="mt-2 text-gray-600">Memuat daftar survey...</p>
                </div>
              )}
              
              {isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">Gagal memuat survey</p>
                  <p className="text-red-600 text-sm mt-1">{error?.message}</p>
                </div>
              )}
              
              {surveysData && surveysData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Belum ada survey tersedia</p>
                </div>
              )}
              
              {surveysData && surveysData.length > 0 && (
                <div className="space-y-3">
                  {surveysData.map((survey) => (
                    <button
                      key={survey.id}
                      onClick={() => handleSelectSurvey(survey.id)}
                      className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-[#17307a] hover:bg-[#f6f9ff] transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#17307a] group-hover:text-[#1f2a78] text-lg">
                            {survey.namaSurvey}
                          </h3>
                          {survey.deskripsi && (
                            <p className="text-sm text-gray-600 mt-1">
                              {survey.deskripsi}
                            </p>
                          )}
                          {survey._count?.pertanyaan !== undefined && (
                            <p className="text-xs text-gray-500 mt-2">
                              {survey._count.pertanyaan} pertanyaan
                            </p>
                          )}
                        </div>
                        <svg className="w-6 h-6 text-[#17307a] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Survey Form Modal */}
      {showSurveyForm && selectedSurveyId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#17307a]">Survey UMKM Imogiri</h2>
              <button
                onClick={() => {
                  setShowSurveyForm(false);
                  setSelectedSurveyId(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <SurveyForm 
                surveyId={selectedSurveyId} 
                onClose={() => {
                  setShowSurveyForm(false);
                  setSelectedSurveyId(null);
                }} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Hero */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#17307a] mb-3">Survey UMKM Imogiri</h1>
          
          
          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 text-[#17307a]">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#17307a]"></div>
              <p className="mt-2">Memuat data survei...</p>
            </div>
          )}
          
          {/* Error State */}
          {isError && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-700 font-semibold">Gagal memuat data survei</p>
              <p className="text-red-600 text-sm mt-1">{error?.message || 'Terjadi kesalahan'}</p>
            </div>
          )}
          
          {/* CTA */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78] text-white rounded-2xl p-8 text-center fade-in-item">
            <h4 className="text-2xl font-extrabold mb-3">Suara Anda Penting!</h4>
            <p className="mb-4 text-white/90">Terima kasih telah meluangkan waktu untuk mempelajari survei ini.</p>
            <button 
              onClick={() => setShowSurveyList(true)}
              className="inline-block bg-white text-[#17307a] px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition cursor-pointer"
            >
              Mulai Mengisi Survei
            </button>
          </div>
        </div>
      </section>
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
      {/* <section className="py-12 px-6 md:px-12">
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
      </section> */}

      <Footer />
    </div>
  );
}
