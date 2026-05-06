import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // První otázka bude rovnou rozbalená

  const faqs = [
    {
      question: "Je přestavba legální pro provoz na pozemních komunikacích?",
      answer: (
        <>
          <p className="mb-2">
            <strong>Naše 250W sady jsou 100% legální</strong> a splňují
            evropskou normu pro elektrokola (EN 15194). Z vašeho kola se tak
            stává standardní elektrokolo (EPAC) a můžete s ním bez obav na
            silnice i cyklostezky. Motor pomáhá do rychlosti 25 km/h a
            nevyžaduje řidičský průkaz ani registraci.
          </p>
          <p>
            <strong>U sad s výkonem 750W a 1000W</strong> upozorňujeme, že svými
            parametry přesahují povolené limity pro provoz na pozemních
            komunikacích. Tyto sady jsou oficiálně určeny výhradně pro jízdu
            mimo veřejné komunikace (např. lesní cesty, soukromé pozemky,
            uzavřené okruhy).
          </p>
        </>
      ),
    },
    {
      question: "Zvládnu si sadu nainstalovat sám doma, nebo musím do servisu?",
      answer: (
        <>
          <p className="mb-2">
            Přestavbu{" "}
            <strong>
              zvládne průměrně zručný člověk v domácích podmínkách
            </strong>{" "}
            zhruba za 2 až 4 hodiny. Není potřeba žádné složité řezání nebo
            sváření rámu – motor se pouze zasune na místo původního středového
            složení a kabely se propojí pomocí nacvakávacích voděodolných
            konektorů (nelze je zapojit špatně).
          </p>
          <p>
            Budete potřebovat jen základní nářadí na kolo (stahovák na kliky a
            klíč na středové složení). Ke každé sadě navíc poskytujeme detailní
            návod. Pokud si na to přesto netroufáte, můžete využít naší služby
            odborné montáže.
          </p>
        </>
      ),
    },
    {
      question: "Jaký je reálný dojezd na jedno nabití a co ho ovlivňuje?",
      answer: (
        <>
          <p className="mb-2">
            Dojezd je velmi individuální a závisí hlavně na zvolené kapacitě
            baterie, váze jezdce, profilu trasy a úrovni přípomoci (eco vs.
            turbo).
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>
              <strong>Základní 36V 13Ah (468 Wh):</strong> Reálný dojezd cca
              60–80 km. Ideální pro běžné odpolední výlety.
            </li>
            <li>
              <strong>Střední 36V 17.5Ah (630 Wh):</strong> Reálný dojezd 90–120
              km. Skvělé pro celodenní ježdění.
            </li>
            <li>
              <strong>Extrémní 52V 20Ah (1040 Wh):</strong> Reálný dojezd
              120–180+ km. Pro ty, kteří nechtějí dělat kompromisy.
            </li>
          </ul>
          <p className="text-sm text-slate-500">
            * Uvedené hodnoty jsou průměrné reálné dojezdy při střední přípomoci
            a váze jezdce 80 kg. V rovinatém terénu na režim "Eco" mohou být
            hodnoty ještě podstatně vyšší.
          </p>
        </>
      ),
    },
    {
      question: "Vejde se středový motor opravdu na moje kolo?",
      answer: (
        <>
          <p className="mb-2">
            Naše středové motory jsou navrženy tak, aby pasovaly na{" "}
            <strong>99 % běžných jízdních kol</strong>.
          </p>
          <p>
            Rozhodujícím parametrem je středové složení kola. Motor je
            kompatibilní se standardním středem typu{" "}
            <strong>BSA se závitem o šířce 68 až 73 mm</strong>, což má naprostá
            většina kol na trhu. Pokud máte moderní karbonový rám s "PressFit"
            středem (bez závitu) nebo tzv. Fatbike s velmi širokým středem,
            instalace může vyžadovat speciální adaptér nebo dlouhou osu motoru.
            Pokud si nejste jistí, vyfoťte nám své kolo na e-mail a my vám
            obratem potvrdíme kompatibilitu.
          </p>
        </>
      ),
    },
    {
      question: "Jak se mám správně starat o baterii, aby mi vydržela roky?",
      answer: (
        <>
          <p className="mb-2">
            Moderní Li-Ion baterie nemají paměťový efekt, takže je{" "}
            <strong>
              můžete (a měli byste) nabíjet klidně i po krátké jízdě
            </strong>
            . Pro maximální životnost dodržujte tato 3 zlatá pravidla:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Nenechávejte baterii dlouho vybitou na 0 %.</strong> Pokud
              dojedete a baterie je prázdná, dejte ji co nejdříve na nabíječku.
            </li>
            <li>
              <strong>Zazimování:</strong> Pokud v zimě nejezdíte, uložte
              baterii doma v pokojové teplotě (nikdy v mrazivé garáži) nabitou
              zhruba na 50 až 70 % a jednou za 2 měsíce ji nechte chvíli na
              nabíječce oživit.
            </li>
            <li>
              <strong>Vyhněte se extrémům:</strong> Nevystavujte baterii přímému
              letnímu slunci po dlouhé hodiny a k nabíjení používejte výhradně
              originální nabíječku, kterou od nás dostanete v sadě.
            </li>
          </ol>
        </>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2a3b4c] flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-green-500" />
          Často kladené otázky
        </h2>
        <p className="text-slate-500 mt-4 text-lg">
          Vše, co potřebujete vědět před pořízením přestavbové sady.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
              openIndex === index
                ? "border-green-300 shadow-md ring-1 ring-green-100"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
            >
              <h3
                className={`font-bold text-lg md:text-xl pr-8 ${
                  openIndex === index ? "text-green-700" : "text-[#2a3b4c]"
                }`}
              >
                {faq.question}
              </h3>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            <div
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-[800px] opacity-100 pb-6"
                  : "max-h-0 opacity-0 pb-0"
              }`}
            >
              <div className="text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-4 mt-2">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
