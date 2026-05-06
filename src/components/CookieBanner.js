import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Zkontrolujeme, jestli už uživatel dříve souhlasil
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Pokud ne, lištu zobrazíme
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Uložíme souhlas do paměti a lištu skryjeme
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  // Pokud je skrytá, nevykreslujeme vůbec nic
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 shadow-2xl z-[100] animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300">
          <p>
            <strong className="text-white">Používáme cookies 🍪</strong><br/>
            Abychom vám usnadnili procházení stránek, nabídli přizpůsobený obsah a mohli analyzovat návštěvnost, 
            používáme soubory cookie. Pokračováním v prohlížení webu souhlasíte s jejich použitím.
          </p>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-6 rounded-lg transition shadow-lg hover:shadow-green-500/30"
          >
            Rozumím a přijímám
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;