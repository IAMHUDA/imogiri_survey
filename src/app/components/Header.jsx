import logo from "../../assets/logo/nav-log.png";
import { Menu, X } from "lucide-react";
import { useScroll } from "../../hooks/useScroll";
import { Link } from "react-router-dom";

const Header = () => {
  const { isScrolled, toggleMenu, setIsMenuOpen, isMenuOpen } = useScroll();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 transition-all duration-300"
            />

            <div className="flex flex-col">
              <span className="text-gray-600 text-xs sm:text-sm font-medium">
                Pemerintah Kabupaten Bantul
              </span>
              <span className="text-[#3b4bc6] text-base sm:text-lg font-semibold">
                Kelurahan Imogiri
              </span>
            </div>
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#3b4bc6] hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-10">
            {[
              { to: "/", label: "Beranda" },
              { to: "/survey", label: "Survey" },
              { to: "/umkm", label: "UMKM" },
              { to: "/kontak", label: "Kontak Kami" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#3b4bc6] transition relative group font-medium"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b4bc6] rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col bg-white px-4 py-3 shadow-sm animate-fadeSlideDown">
            {[
              { to: "/", label: "Home" },
              { to: "/umkm", label: "UMKM" },
              { to: "/survey", label: "Survey" },
              { to: "/kontak", label: "Kontak Kami" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="h-[70px]"></div>
    </>
  );
};

export default Header;
