import React from "react";
import logo from "../../assets/logo/nav-log.png";

const Footer = () => {
  return (
    <footer className="pt-16 pb-10 bg-gradient-to-b from-[#3b4bc6] to-[#1f2a78] text-white relative overflow-hidden">
      
      {/* Decorative Waves */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white/10 backdrop-blur-sm rounded-b-[40%]"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo Bantul" className="h-12 w-auto" />
                <div>
                  <h3 className="font-bold text-xl">Kelurahan Imogiri</h3>
                  <p className="text-white/70 text-sm">Kabupaten Bantul</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                Layanan informasi dan pelayanan masyarakat Kelurahan Imogiri. Berkomitmen untuk memajukan potensi lokal dan kesejahteraan warga.
              </p>
            </div>

            <div className="md:text-right">
              <h3 className="font-semibold mb-3 text-lg">Hubungi Kami</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>+62 123 456 789</li>
                <li>info@imogiri.go.id</li>
                <li>Jl. Imogiri Timur Km 10, Bantul, Yogyakarta</li>
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
