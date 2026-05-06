import React from "react";
import { Star, Check } from "lucide-react";

const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Petr Novák",
      text: "Přestavba proběhla naprosto bez problémů. TSDZ2B 250W je do města a na polňačky úplně ideální. Dojezd s 15.6Ah baterií je reálně přes 80 km i v kopcovitém terénu!",
      type: "Sada Město (250W)",
    },
    {
      name: "Martin Dvořák",
      text: "Nejdřív jsem se bál, jestli zvládnu kolo přestavět sám, ale s video návodem to šlo úplně samo. 750W verze má brutální sílu, prudké kopce už pro mě neexistují.",
      type: "Sada Sport (750W)",
    },
    {
      name: "Jana Veselá",
      text: "Skvělá komunikace obchodu a velmi rychlé dodání. Motor i baterie fungují na jedničku. Ušetřila jsem 40 tisíc oproti novému elektrokolu v podobné výbavě.",
      type: "Sada Město (250W)",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a3b4c]">
            Zkušenosti našich zákazníků
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            Přidejte se k více než 1000 spokojeným jezdcům
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm relative hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">
                "{rev.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl shadow-sm flex-shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#2a3b4c]">{rev.name}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Check className="w-3 h-3 text-green-500" /> Ověřený nákup -{" "}
                    {rev.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
