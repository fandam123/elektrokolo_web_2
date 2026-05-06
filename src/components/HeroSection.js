import React from "react";
import { Play } from "lucide-react";

const HeroSection = ({ navigateTo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 border-b border-slate-100">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2a3b4c] leading-tight tracking-tight">
          Z vašeho kola
          <br />
          <span className="text-green-600">
            elektrokolo za zlomek
            <br className="hidden md:block" />
            ceny
          </span>
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          <span className="font-bold text-green-600">
            Ušetřete více než 50 % a získejte lepší parametry!
          </span>{" "}
          Naše přestavbové sady promění vaše běžné kolo v elektrokolo s výkonem
          a vlastnostmi, které klasická elektrokola nenabízejí.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => {
              const configSection = document.getElementById("configurator");
              if (configSection)
                configSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
          >
            Spočítat cenu
          </button>
          <button
            onClick={() => navigateTo("guides")}
            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> Přehrát video
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 transform hover:scale-[1.01] transition duration-300 relative group">
          {/* TADY JE ZMĚNĚNÝ OBRÁZEK */}
          <img
            src="/images/uvodkolo.png"
            alt="Přestavba kola na elektrokolo"
            className="w-full h-auto rounded-xl mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
