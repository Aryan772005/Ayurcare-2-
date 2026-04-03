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
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-emerald-50/10 hover:bg-emerald-50/20 text-emerald-100 transition-colors border border-emerald-500/20"
        aria-label="Switch Language"
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{currentLang === 'hi' ? 'हिंदी' : 'English'}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-forest border border-emerald-500/20 rounded-lg shadow-xl py-1 z-50 overflow-hidden transform origin-top-right transition-all">
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'en' ? 'bg-emerald-500/20 text-white' : 'text-emerald-100/70 hover:bg-emerald-50/10 hover:text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('hi')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'hi' ? 'bg-emerald-500/20 text-white' : 'text-emerald-100/70 hover:bg-emerald-50/10 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>
        </>
      )}
    </div>
  );
}
