import React from "react";
import { ArrowLeft, Tool } from "lucide-react";

const ComplaintsPage = ({ navigateTo }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <button
        onClick={() => navigateTo("home")}
        className="mb-6 flex items-center text-sm font-bold text-slate-500 hover:text-green-600 transition w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Zpět na hlavní stránku
      </button>

      <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
          <Tool className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-[#2a3b4c]">Reklamační řád</h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Záruční doba
            </h2>
            <p>
              Na veškeré nové zboží poskytujeme zákonnou záruku 24 měsíců.
              Záruka se nevztahuje na běžné opotřebení způsobené používáním
              (např. snížení kapacity baterie vlivem běžného nabíjení) nebo na
              poškození způsobené nesprávnou montáží, pokud si kupující sadu
              montoval sám.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Jak reklamovat zboží
            </h2>
            <ol className="list-decimal pl-5 space-y-3 mt-2">
              <li>
                Napište nám e-mail na <strong>elektrokit@seznam.cz</strong> s
                popisem závady a číslem objednávky.
              </li>
              <li>
                Následně se domluvíme na odeslání vadného dílu nebo celého kola
                na naši adresu <strong>[DOPLNÍŠ ADRESU POZDĚJI]</strong>.
              </li>
              <li>
                K reklamovanému zboží vždy přiložte kopii dokladu o koupi a
                průvodní dopis s popisem závady.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Vyřízení reklamace
            </h2>
            <p>
              O přijetí reklamace vás budeme informovat e-mailem. Reklamaci
              vyřídíme bez zbytečného odkladu, nejpozději však do 30
              kalendářních dnů. V případě uznané reklamace vám zboží opravíme,
              vyměníme za nové, nebo vám vrátíme peníze.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
