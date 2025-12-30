import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, Menu, X, MapPin, Mail, Phone, ExternalLink, Star, Activity, User, Calendar, Users } from 'lucide-react';
import SurveyForm from '../components/SurveyForm';
import Footer from '../components/Footer';
import { useSurveys } from '../../hooks/useSurveys';
import { useUMKMs } from '../../hooks/useUMKM';
import Swal from 'sweetalert2';

// Import images
import Angkruksari from '../../assets/pasar/Angkruksari.jpg';
import ImogiriImg from '../../assets/pasar/Imogiri.jpg';
import Janten from '../../assets/pasar/Janten.jpg';
import BantulImg from '../../assets/pasar/Bantul.jpg';
import Barongan from '../../assets/pasar/Barongan.jpg';
import Gatak from '../../assets/pasar/Gatak.jpg';
import Gumulan from '../../assets/pasar/Gumulan.jpg';
import HewanImogiri from '../../assets/pasar/HewanImogiri.jpg';
import logo from '../../assets/logo/nav-log.png';
import Sigar from '../../assets/logo/sigar.png';
import Awan from '../../assets/logo/awan.png';
import Awan2 from '../../assets/logo/awan2.png';

export default function OnePage() {
  const [activeSection, setActiveSection] = useState('Beranda');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [showSurveyList, setShowSurveyList] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { nama, email, subjek, pesan } = contactForm;

    if (!nama || !email || !subjek || !pesan) {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: 'Harap isi semua kolom formulir!',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    // Construct mailto link
    const mailtoLink = `mailto:desa.imogiri@bantulkab.go.id?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(`Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    Swal.fire({
      icon: 'success',
      title: 'Terkirim!',
      text: 'Aplikasi email Anda telah dibuka untuk mengirim pesan ini.',
      confirmButtonColor: '#3b82f6',
    });
    
    setContactForm({ nama: '', email: '', subjek: '', pesan: '' });
  };
  
  // Refs for parallax
  const heroRef = useRef(null);
  const umkmRef = useRef(null);
  const surveyRef = useRef(null);
  const KontakRef = useRef(null);

  // Fetch data
  const { data: surveysData } = useSurveys();
  const { data: umkmData } = useUMKMs();
  
  // Get survey layanan for notification
  const surveyLayanan = surveysData?.find(s => 
    s.namaSurvey?.toLowerCase().includes('kepuasan masyarakat')
  ) || surveysData?.find(s => 
    s.namaSurvey?.toLowerCase().includes('kepuasan layanan')
  );
  
  // UMKM display data
  const fallbackUmkmData = [
    { id: 1, name: "Pasar Angkruksari", description: "Pusat kerajinan tradisional", image: Angkruksari, category: "Kerajinan" },
    { id: 2, name: "Pasar Bantul", description: "Produk lokal Bantul", image: BantulImg, category: "Produk Lokal" },
    { id: 3, name: "Kerajinan Barongan", description: "Topeng barongan tradisional", image: Barongan, category: "Seni" },
    { id: 4, name: "Industri Gatak", description: "Keramik berkualitas", image: Gatak, category: "Keramik" },
    { id: 5, name: "Kerajinan Gumulan", description: "Kerajinan khas Gumulan", image: Gumulan, category: "Kerajinan" },
    { id: 6, name: "Peternakan Imogiri", description: "Peternakan terjamin", image: HewanImogiri, category: "Peternakan" },
    { id: 7, name: "Pasar Imogiri", description: "Pasar tradisional", image: ImogiriImg, category: "Pasar" },
    { id: 8, name: "Kerajinan Janten", description: "Desain inovatif", image: Janten, category: "Desain" },
  ];
  
  const displayUmkmData = (umkmData && umkmData.length > 0) ? umkmData : fallbackUmkmData;
  
  const getImageUrl = (umkm) => {
    if (umkm.fotoProduk) return `${import.meta.env.VITE_API_BASE_URL}${umkm.fotoProduk}`;
    const imageMap = { 'Angkruksari': Angkruksari, 'Bantul': BantulImg, 'Barongan': Barongan, 'Gatak': Gatak, 'Gumulan': Gumulan, 'Hewan': HewanImogiri, 'Imogiri': ImogiriImg, 'Janten': Janten };
    const key = Object.keys(imageMap).find(k => umkm.nama?.includes(k) || umkm.name?.includes(k));
    return imageMap[key] || ImogiriImg;
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parallax and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setScrolled(scrollY);
      setShowScrollTop(scrollY > 500);
    };

    // Observer for Active Section (Navigation)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    // Observer for Reveal Animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      revealObserver.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayUmkmData]);

  // Typewriter effect
  const [typedText, setTypedText] = useState('');
  const fullText = "Portal Resmi Kecamatan Imogiri";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="one-page-container font-sans text-gray-800 bg-gray-50">
      
      {/* Fixed Navbar with Glassmorphism */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled > 50 ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo Bantul" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className={`text-xs font-medium ${scrolled > 50 ? 'text-gray-600' : 'text-gray-600'}`}>
                  Pemerintah Kabupaten Bantul
                </span>
                <span className={`text-base font-bold ${scrolled > 50 ? 'text-[#3b4bc6]' : 'text-[#3b4bc6]'}`}>
                  Kalurahan Imogiri
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 shadow-sm">
              {['Beranda', 'umkm', 'survey', 'Kontak'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {section === 'umkm' ? 'UMKM' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-900 p-2 bg-white/50 rounded-lg backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 animate-scale-in">
              <div className="flex flex-col gap-2">
                {['Beranda', 'umkm', 'survey', 'Kontak'].map(section => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activeSection === section
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section === 'umkm' ? 'UMKM' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Survey Badge */}
      {!showSurveyForm && surveyLayanan && (
        <div className="fixed top-28 right-6 z-40 animate-float">
          <button
            onClick={() => {
              setSelectedSurveyId(surveyLayanan.id);
              setShowSurveyForm(true);
            }}
            className="group relative flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pr-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 hover:scale-105 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Activity size={20} />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Kepuasan Layanan</div>
              <div className="text-sm font-bold text-gray-800">Isi Survey</div>
            </div>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>
        </div>
      )}

      {/* ========== SECTION 1: Beranda ========== */}
      <section id="Beranda" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -top-40 -right-40 mix-blend-multiply animate-blob"
            style={{ transform: `translate3d(0, ${scrolled * 0.2}px, 0)` }}
          ></div>
          <div 
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl top-40 -left-20 mix-blend-multiply animate-blob animation-delay-2000"
            style={{ transform: `translate3d(0, ${scrolled * 0.1}px, 0)` }}
          ></div>
          <div 
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-3xl bottom-0 right-1/4 mix-blend-multiply animate-blob animation-delay-4000"
            style={{ transform: `translate3d(0, ${scrolled * 0.15}px, 0)` }}
          ></div>
          
          {/* Additional Parallax Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-xl opacity-40 animate-float" style={{ transform: `translateY(${scrolled * 0.05}px)` }}></div>
          <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-green-200 rounded-full blur-xl opacity-40 animate-float animation-delay-2000" style={{ transform: `translateY(${-scrolled * 0.08}px)` }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-lg">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="font-handwriting text-2xl">{typedText}</span><span className="animate-pulse">|</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Jelajahi <br/>
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-handwriting text-5xl lg:text-8xl leading-normal pr-4">
                  Potensi Lokal
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Temukan ragam produk unggulan, kerajinan tangan, dan kuliner otentik dari jantung budaya Yogyakarta.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowSurveyList(true)}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Daftar Survey
                </button>
                <button 
                  onClick={() => scrollToSection('Kontak')}
                  className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  Hubungi Kami
                </button>
              </div>

              <div className="pt-8 flex items-center gap-8 text-gray-500">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm">UMKM Terdaftar</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm">Produk Lokal</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm">Karya Asli</div>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center animate-slide-left mt-10 lg:mt-0">
              <div className="relative w-full max-w-[320px] md:max-w-[500px] aspect-[4/5] md:aspect-auto md:h-[550px]">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-400/5 rounded-full blur-3xl transform scale-125"></div>
                
                {/* Main Container - No Border */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  
                  {/* Top Right Cloud */}
                  <img 
                    src={Awan2}
                    alt="Cloud Decoration"
                    className="absolute -top-4 -right-12 md:-top-10 md:-right-24 w-48 md:w-80 opacity-90 animate-float object-contain brightness-100 drop-shadow-sm z-20"
                    style={{ animationDelay: '1s' }}
                  />

                  {/* Siger Usage - Centered & Enlarged */}
                  <div className="relative z-10 p-0 transform hover:scale-110 transition-transform duration-700 w-full flex justify-center">
                     <img 
                       src={Sigar} 
                       alt="Siger Motif" 
                       className="w-full md:w-auto md:min-w-[550px] drop-shadow-2xl filter contrast-125 saturate-110 object-contain"
                     />
                  </div>
                  
                  {/* Bottom Left Cloud */}
                  <img 
                    src={Awan}
                    alt="Cloud Decoration"
                    className="absolute -bottom-4 -left-16 md:-bottom-10 md:-left-32 w-48 md:w-80 opacity-90 animate-float object-contain brightness-100 drop-shadow-sm z-20"
                  />

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 md:-bottom-10 left-0 w-full text-center z-30">
                    <div className="text-2xl md:text-4xl font-handwriting text-yellow-600 mb-2 drop-shadow-sm">Kalurahan</div>
                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 drop-shadow-sm tracking-wide">
                      IMOGIRI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: UMKM ========== */}
      <section id="umkm" className="relative py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        {/* Background Elements */}
        <div className="absolute top-40 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ transform: `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.05}deg)` }}></div>
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ transform: `translateY(${-scrolled * 0.05}px) scale(${1 + scrolled * 0.0002})` }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
            <h2 className="text-blue-600 font-handwriting text-3xl mb-3">Katalog Digital</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">UMKM Unggulan</h3>
            <p className="text-xl text-gray-600">
              Temukan produk-produk berkualitas hasil karya tangan terampil masyarakat Imogiri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayUmkmData.map((umkm, idx) => (
              <div 
                key={umkm.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="h-64 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={getImageUrl(umkm)} 
                    alt={umkm.namaUsaha || umkm.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ImogiriImg;
                    }}
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-blue-900 shadow-sm">
                      {umkm.jangkauanPemasaran || umkm.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {umkm.namaUsaha || umkm.name}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {umkm.deskripsi || umkm.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                        <User size={14} />
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wide">Pemilik</div>
                      <div className="text-xs font-bold text-gray-800 truncate w-full px-1">{umkm.namaPemilik || "Owner"}</div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center border-l border-r border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-1">
                        <Calendar size={14} />
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wide">Sejak</div>
                      <div className="text-xs font-bold text-gray-800">{umkm.tahunBerdiri || "-"}</div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-1">
                        <Users size={14} />
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wide">Karyawan</div>
                      <div className="text-xs font-bold text-gray-800">{umkm.jumlahKaryawan || "0"}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: SURVEY ========== */}
      <section id="survey" className="relative py-32 bg-blue-900 overflow-hidden text-white">
        {/* Parallax Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', transform: `translateY(${scrolled * 0.1}px)` }}></div>
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-on-scroll">
              <h2 className="text-blue-300 font-handwriting text-3xl mb-3">Suara Anda</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Bantu Kami <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Tumbuh Bersama
                </span>
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Pilih topik survey di bawah ini untuk memberikan masukan Anda. Partisipasi Anda sangat berarti bagi kemajuan UMKM Imogiri.
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowSurveyList(true)}
                  className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-3 w-fit"
                >
                  <Activity size={24} />
                  Lihat Daftar Survey
                </button>
                <p className="text-blue-200 text-sm">
                  * Klik tombol di atas untuk melihat semua topik survey yang tersedia
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-blue-800 pt-8">
                <div>
                  <div className="text-3xl font-bold">5m</div>
                  <div className="text-blue-300 text-sm">Waktu Pengisian</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-blue-300 text-sm">Anonim</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-300 text-sm">Akses Online</div>
                </div>
              </div>
            </div>

            <div className="relative reveal-on-scroll lg:sticky lg:top-32">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">?</span>
                  FAQ Survey
                </h4>
                <div className="space-y-4">
                  {[
                    { q: "Apakah data saya aman?", a: "Ya, data Anda dijaga kerahasiaannya." },
                    { q: "Berapa lama survey berlangsung?", a: "Hanya membutuhkan waktu sekitar beberapa menit." },
                    { q: "Apa manfaat bagi saya?", a: "Membantu meningkatkan kualitas produk yang Anda konsumsi." }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-blue-950/50 rounded-xl p-4 border border-blue-800/50 hover:bg-blue-900/50 transition-colors">
                      <div className="font-bold text-blue-100 mb-1">{faq.q}</div>
                      <div className="text-sm text-blue-300">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: Kontak ========== */}
      <section id="Kontak" className="relative py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
            <h2 className="text-blue-600 font-handwriting text-3xl mb-3">Hubungi Kami</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Tetap Terhubung</h3>
            <p className="text-xl text-gray-600">
              Punya pertanyaan atau ingin berkolaborasi? Tim kami siap membantu Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4 reveal-on-scroll">
              {[
                { icon: MapPin, title: "Alamat", desc: "Jl. Raya Imogiri Km 15, Toprayan RT 002, Imogiri, Imogiri, Bantul 55782", color: "text-blue-600" },
                { icon: Mail, title: "Email", desc: " desa.imogiri@bantulkab.go.id", color: "text-indigo-600" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.title}</div>
                    <div className="text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 reveal-on-scroll">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="nama"
                      value={contactForm.nama}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Subjek</label>
                  <input 
                    type="text" 
                    name="subjek"
                    value={contactForm.subjek}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
                    placeholder="Tanya seputar UMKM" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Pesan</label>
                  <textarea 
                    rows={4} 
                    name="pesan"
                    value={contactForm.pesan}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" 
                    placeholder="Tulis pesan Anda disini..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Survey List Modal */}
      {showSurveyList && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Pilih Topik Survey</h2>
                <p className="text-sm text-gray-500">Silakan pilih salah satu survey untuk diisi</p>
              </div>
              <button
                onClick={() => setShowSurveyList(false)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4">
                {surveysData && surveysData.length > 0 ? (
                  surveysData.map((survey) => (
                    <button
                      key={survey.id}
                      onClick={() => {
                        setSelectedSurveyId(survey.id);
                        setShowSurveyList(false);
                        setShowSurveyForm(true);
                      }}
                      className="group flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300 text-left w-full"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{survey.namaSurvey}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{survey.deskripsi || "Klik untuk mengisi survey ini"}</p>
                      </div>
                      <div className="ml-auto text-gray-300 group-hover:text-blue-600 transition-colors">
                        <ExternalLink size={20} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>Belum ada survey yang tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Survey Form Modal */}
      {showSurveyForm && selectedSurveyId && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Survey UMKM Imogiri</h2>
              <button
                onClick={() => {
                  setShowSurveyForm(false);
                  setSelectedSurveyId(null);
                }}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
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

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 bg-white text-blue-600 p-4 rounded-full shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ChevronUp size={24} />
      </button>

      <Footer />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
