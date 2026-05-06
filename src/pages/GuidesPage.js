import React from "react";
import { Play } from "lucide-react";

const GuidesPage = ({ navigateTo }) => (
  <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
    <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-6">
      Návody k montáži
    </h1>
    <p className="text-lg text-slate-600 mb-10">
      Zde najdete podrobné video návody, jak si sadu krok za krokem nainstalovat
      sami doma.
    </p>

    <div className="space-y-8">
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="aspect-video bg-slate-800 flex items-center justify-center relative rounded-lg">
          <Play className="w-16 h-16 text-white/80" />
          <span className="absolute bottom-4 left-4 text-white font-medium bg-black/50 px-3 py-1 rounded">
            Video: Jak sundat starý střed a kliky
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">Krok 1: Příprava kola</h3>
          <p className="text-slate-500 text-sm mt-1">
            Co budete potřebovat za nářadí a jak kolo připravit pro instalaci
            motoru.
          </p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="aspect-video bg-slate-800 flex items-center justify-center relative rounded-lg">
          <Play className="w-16 h-16 text-white/80" />
          <span className="absolute bottom-4 left-4 text-white font-medium bg-black/50 px-3 py-1 rounded">
            Video: Instalace motoru TSDZ
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">Krok 2: Montáž motoru</h3>
          <p className="text-slate-500 text-sm mt-1">
            Správné uchycení motoru a dotažení jistící matice.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default GuidesPage;
