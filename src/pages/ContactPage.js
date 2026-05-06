import React from "react";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
    <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-12 text-center">
      Kontakt a firemní údaje
    </h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-[#2a3b4c] mb-6">
            Spojte se s námi
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="font-semibold text-green-600">
                  info@elektrokit.cz
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="text-slate-500 text-sm">Telefon</p>
                <p className="font-semibold text-green-600">+420 123 456 789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="text-slate-500 text-sm">Sídlo a výdejní místo</p>
                <p className="font-semibold text-slate-800">
                  Novákových 123/45
                  <br />
                  110 00 Praha 1
                </p>
                <p className="text-xs text-amber-600 mt-1 font-medium">
                  Osobní odběr pouze po předchozí domluvě.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-[#2a3b4c]">
              Fakturační údaje
            </h2>
          </div>
          <div className="space-y-3 text-slate-600 text-sm md:text-base">
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span>Společnost:</span>{" "}
              <strong className="text-slate-800">ElektroKit s.r.o.</strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span>IČO:</span>{" "}
              <strong className="text-slate-800">12345678</strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span>DIČ:</span>{" "}
              <strong className="text-slate-800">CZ12345678</strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span>Spisová značka:</span>{" "}
              <strong className="text-slate-800 text-right">
                C 12345 vedená
                <br />u MS v Praze
              </strong>
            </p>
            <p className="flex justify-between pt-1">
              <span>Bankovní spojení:</span>{" "}
              <strong className="text-slate-800">123456789/0100</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-2xl font-bold text-[#2a3b4c] mb-6">
          Kde nás najdete
        </h2>
        <div className="flex-grow min-h-[350px] w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50 mb-6">
          <iframe
            title="Mapa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src="https://maps.google.com/maps?q=Praha%201,%20110%2000&t=&z=14&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <button
          onClick={() =>
            window.open("https://maps.google.com/?q=Praha+1", "_blank")
          }
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition border border-slate-300 mt-auto"
        >
          <MapPin className="w-5 h-5" /> Otevřít v Google Mapách
        </button>
      </div>
    </div>
  </div>
);

export default ContactPage;
