import React from "react";
import { Check, X, AlertTriangle } from "lucide-react";

const ComparisonSection = () => {
  const comparisonData = [
    {
      label: "Cena",
      kit250: "15 000 – 18 000 Kč",
      kit1000: "19 000 – 23 000 Kč",
      classic: "Běžně 50 000 – 100 000 Kč",
      k250: "good",
      k1000: "good",
      c: "bad",
    },
    {
      label: "Výkon motoru",
      kit250: "250W",
      kit1000: "1000W (Peak přes 2 kW)",
      classic: "250W",
      k250: "neutral",
      k1000: "good",
      c: "neutral",
    },
    {
      label: "Kroutící moment",
      kit250: "80 Nm",
      kit1000: "160 Nm",
      classic: "Obvykle 40 – 50 Nm",
      k250: "good",
      k1000: "good",
      c: "bad",
    },
    {
      label: "Dojezd",
      kit250: "90 – 180 km (v eco módu)",
      kit1000: "90 – 200 km (v eco módu)",
      classic: "Obvykle 60 – 100 km",
      k250: "good",
      k1000: "good",
      c: "bad",
    },
    {
      label: "Přidaná váha",
      kit250: "+ 6 kg (k váze kola)",
      kit1000: "+ 8 kg (k váze kola)",
      classic: "Celé kolo 25–30 kg",
      k250: "good",
      k1000: "neutral",
      c: "bad",
    },
    {
      label: "Legislativa",
      kit250: "Na silnice (EN 15194)",
      kit1000: "Pouze mimo komunikace",
      classic: "Na silnice (EN 15194)",
      k250: "good",
      k1000: "warn",
      c: "good",
    },
    {
      label: "Servis",
      kit250: "Levné díly, zvládnete doma",
      kit1000: "Levné díly, zvládnete doma",
      classic: "Drahý autorizovaný servis",
      k250: "good",
      k1000: "good",
      c: "bad",
    },
  ];

  const StatusIcon = ({ status }) => {
    if (status === "good")
      return (
        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-1 md:mr-2 flex-shrink-0" />
      );
    if (status === "bad")
      return (
        <X className="w-4 h-4 md:w-5 md:h-5 text-red-400 mr-1 md:mr-2 flex-shrink-0 hidden sm:block" />
      );
    if (status === "warn")
      return (
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500 mr-1 md:mr-2 flex-shrink-0" />
      );
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 border-b border-slate-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a3b4c]">
          Proč si vybrat přestavbu právě u nás?
        </h2>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
          Hledáte to nejlevnější elektrokolo s absolutně nejlepším poměrem
          cena/výkon? Pak jste na správném místě!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] lg:min-w-full">
            <div className="grid grid-cols-4 items-end bg-slate-50 border-b border-slate-200">
              <div className="col-span-1 p-6 hidden lg:block">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Srovnání parametrů
                </h3>
              </div>
              <div className="col-span-1 lg:hidden"></div>

              <div className="col-span-1 text-center bg-green-50 pt-6 pb-4 px-2 border-x border-t border-green-500/30 rounded-tl-xl mt-4 md:ml-2 shadow-[0_-4px_10px_rgba(34,197,94,0.1)]">
                <h3 className="font-bold text-sm md:text-base text-green-700">
                  ElektroKit 250W
                </h3>
              </div>

              <div className="col-span-1 text-center bg-red-50 relative pt-6 pb-4 px-2 border-r border-t border-red-500/30 rounded-tr-xl mt-4 md:mr-2 shadow-[0_-4px_10px_rgba(239,68,68,0.1)]">
                <h3 className="font-bold text-sm md:text-base text-red-700">
                  ElektroKit 1000W
                </h3>
              </div>

              <div className="col-span-1 text-center pt-6 pb-4 px-2">
                <h3 className="font-bold text-sm md:text-base text-slate-500">
                  Běžné e-kolo
                </h3>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {comparisonData.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 group hover:bg-slate-50/80 transition duration-150"
                >
                  <div className="col-span-1 flex items-center p-3 md:p-5 text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                    {row.label}
                  </div>
                  <div
                    className={`col-span-1 p-2 md:p-4 flex items-center justify-center text-center text-[11px] md:text-sm border-x border-green-500/30 bg-green-50/50 md:ml-2 ${
                      row.k250 === "good"
                        ? "text-green-800 font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    <StatusIcon status={row.k250} /> <span>{row.kit250}</span>
                  </div>
                  <div
                    className={`col-span-1 p-2 md:p-4 flex items-center justify-center text-center text-[11px] md:text-sm border-r border-red-500/30 bg-red-50/50 md:mr-2 ${
                      row.k1000 === "good"
                        ? "text-red-800 font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    <StatusIcon status={row.k1000} /> <span>{row.kit1000}</span>
                  </div>
                  <div
                    className={`col-span-1 p-2 md:p-4 flex items-center justify-center text-center text-[11px] md:text-sm ${
                      row.c === "good"
                        ? "text-green-700 font-bold"
                        : "text-slate-500"
                    }`}
                  >
                    <StatusIcon status={row.c} /> <span>{row.classic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
