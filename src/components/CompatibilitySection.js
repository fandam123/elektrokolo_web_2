import React from "react";
import { Settings, BatteryCharging, Wrench } from "lucide-react";

const CompatibilitySection = ({ navigateTo }) => {
  const steps = [
    {
      title: "1. Středový motor",
      description:
        "Pasuje na 95 % všech jízdních kol. Motor se jednoduše zasune místo vašeho stávajícího středového složení (standardní šířka 68–73 mm).",
      icon: <Settings className="w-6 h-6 text-green-600" />,
      // Pokud máš vlastní obrázek, uprav odkaz v uvozovkách (např. "/images/motor-stred.jpg")
      image: "https://placehold.co/600x400/f0fdf4/16a34a?text=Středový+motor",
    },
    {
      title: "2. Pasování baterie",
      description:
        "Baterie se montuje přímo na rám do míst, kde běžně vozíte láhev na pití. Zajišťuje to ideální těžiště a skvělou ovladatelnost kola.",
      icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
      image: "https://placehold.co/600x400/f0fdf4/16a34a?text=Umístění+baterie",
    },
    {
      title: "3. Snadná montáž",
      description:
        "Kabeláž má voděodolné konektory, které do sebe zacvaknete podle barev. Není potřeba nic pájet ani složitě nastavovat.",
      icon: <Wrench className="w-6 h-6 text-green-600" />,
      image:
        "https://placehold.co/600x400/f0fdf4/16a34a?text=Jednoduchá+montáž",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2a3b4c]">
            Přestavba je jednodušší, než si myslíte
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Nemusíte být profesionální mechanik. Vše je navrženo jako jednoduchá
            stavebnice, kterou zvládne složit každý.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
            >
              {/* OBLAST PRO OBRÁZEK - Tady je to kouzlo s object-contain */}
              <div className="h-56 w-full bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-sm z-10 border border-slate-100">
                  {step.icon}
                </div>
                <img
                  src={step.image}
                  alt={step.title}
                  // ZDE JE OPRAVA: max-h-full, max-w-full a object-contain zaručí, že obrázek nebude nikdy oříznutý
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* OBLAST PRO TEXT */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-bold text-[#2a3b4c] mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => {
              if (navigateTo) navigateTo("guides");
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-[#2a3b4c] font-bold rounded-xl transition-colors"
          >
            <Wrench className="w-5 h-5" />
            Podívat se na detailní návody k montáži
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompatibilitySection;
