import React, { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';

/**
 * SurveyNotification Component
 * Displays a notification banner at the top center of the page
 * Auto-shows on page load and can be dismissed by user
 */
export default function SurveyNotification({ onTakeSurvey }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show notification after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleTakeSurvey = () => {
    handleClose();
    if (onTakeSurvey) {
      onTakeSurvey();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div
        className={`
          pointer-events-auto
          max-w-2xl w-full
          bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78]
          text-white
          rounded-2xl
          shadow-2xl
          p-4
          transform transition-all duration-300
          ${isClosing ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'}
        `}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Isi Survey UMKM Imogiri</h3>
            <p className="text-sm text-white/90">
              Bantu kami meningkatkan UMKM lokal dengan mengisi survey. Hanya 5-10 menit!
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTakeSurvey}
              className="
                bg-white text-[#17307a]
                px-4 py-2
                rounded-full
                font-bold
                text-sm
                hover:bg-white/90
                transition-all
                transform hover:scale-105
                shadow-lg
              "
            >
              Isi Sekarang
            </button>
            <button
              onClick={handleClose}
              className="
                w-8 h-8
                rounded-full
                hover:bg-white/20
                flex items-center justify-center
                transition-colors
              "
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
