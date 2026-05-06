import React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const TermsPage = ({ navigateTo }) => {
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
          <ShieldCheck className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-[#2a3b4c]">
            Obchodní podmínky a GDPR
          </h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Základní ustanovení
            </h2>
            <p>
              Tyto obchodní podmínky upravují vzájemná práva a povinnosti mezi
              prodávajícím:{" "}
              <strong>[TVÉ JMÉNO, DOPLNÍŠ POZDĚJI IČO A ADRESU]</strong> a
              kupujícím, který uzavírá kupní smlouvu prostřednictvím e-shopu
              Elektrokit.cz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Objednávka a uzavření smlouvy
            </h2>
            <p>
              Kupní smlouva vzniká odesláním objednávky kupujícím a jejím
              přijetím prodávajícím (potvrzením na e-mail). Kupující se zavazuje
              zaplatit celkovou cenu uvedenou v objednávce.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Cena a platba
            </h2>
            <p>
              Všechny ceny jsou konečné. Platbu je možné provést převodem na
              účet, případně dobírkou při převzetí zboží. Zboží zůstává majetkem
              prodávajícího až do úplného zaplacení.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Odstoupení od smlouvy (Vrácení zboží)
            </h2>
            <p>
              Kupující má právo odstoupit od smlouvy bez udání důvodu do 14 dnů
              od převzetí zboží. Zboží musí být vráceno nepoškozené a bez známek
              běžného užívání. Náklady na vrácení nese kupující. V případě
              montáže sad na míru (zboží upravené podle přání spotřebitele)
              nelze od smlouvy odstoupit.
            </p>
          </section>

          <hr className="border-slate-200" />

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Ochrana osobních údajů (GDPR)
            </h2>
            <p className="mb-4">
              Správcem vašich osobních údajů je{" "}
              <strong>[TVÉ JMÉNO, DOPLNÍŠ POZDĚJI IČO]</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Jaká data zpracováváme a proč:</strong> Zpracováváme
                vaše jméno, příjmení, doručovací/fakturační adresu, e-mail a
                telefonní číslo. Tyto údaje potřebujeme výhradně pro vyřízení a
                doručení vaší objednávky a pro plnění zákonných povinností
                (např. účetnictví).
              </li>
              <li>
                <strong>Kdo má k datům přístup:</strong> Vaše údaje předáváme
                pouze dopravcům za účelem doručení zásilky. Nikomu jinému vaše
                data neprodáváme ani neposkytujeme.
              </li>
              <li>
                <strong>Vaše práva:</strong> Máte právo požádat o výpis svých
                dat, jejich opravu, nebo úplné vymazání z naší databáze. Pro
                uplatnění práv nás kontaktujte na elektrokit@seznam.cz.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
