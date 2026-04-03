import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check current cookie to initialize state
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match && match[2]) {
      const parts = match[2].split('/');
      if (parts.length > 2 && parts[2] === 'hi') {
        setCurrentLang('hi');
      }
    }
  }, []);

  const switchLanguage = (lang: string) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    // The format is domain dependent: path=/; domain=...
    // simpler to let browser handle the host. Setting both versions just in case.
    document.cookie = `googtrans=/en/${lang};expires=${expires.toUTCString()};path=/`;
    document.cookie = `googtrans=/en/${lang};expires=${expires.toUTCString()};path=/;domain=${window.location.host}`;
    
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Reload to apply translation
    window.location.reload();
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-moss/20 hover:bg-moss/30 text-cream transition-colors border border-moss/30 shadow-sm"
        aria-label="Switch Language"
      >
        <Globe size={18} className="text-emerald-accent border-none" />
        <span className="text-sm font-semibold">{currentLang === 'hi' ? 'हिंदी' : 'English'}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-36 bg-forest border border-moss/50 rounded-xl shadow-2xl py-2 z-50 overflow-hidden transform origin-top-right transition-all">
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${currentLang === 'en' ? 'bg-moss/40 text-emerald-accent' : 'text-cream hover:bg-moss/20 hover:text-emerald-accent'}`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('hi')}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${currentLang === 'hi' ? 'bg-moss/40 text-emerald-accent' : 'text-cream hover:bg-moss/20 hover:text-emerald-accent'}`}
            >
              हिंदी
            </button>
          </div>
        </>
      )}
    </div>
  );
}
