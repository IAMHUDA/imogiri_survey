import React from "react";

const Footer = () => {
  return (
    <footer className="pt-16 pb-10 bg-gradient-to-b from-[#3b4bc6] to-[#1f2a78] text-white relative overflow-hidden">
      
      {/* Decorative Waves */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white/10 backdrop-blur-sm rounded-b-[40%]"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <h3 className="font-semibold text-xl mb-3">Kelurahan Imogiri</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Layanan informasi dan pelayanan masyarakat Kelurahan Imogiri.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Kontak</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>+62 123 456 789</li>
              <li>email@imogiri.go.id</li>
              <li>Imogiri, Bantul, Yogyakarta</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Layanan</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Survey</li>
              <li>UMKM</li>
              <li>Informasi Publik</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Tautan</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Tentang Kami</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-white/70 text-sm">
          © 2025 Kelurahan Imogiri. Semua Hak Dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
