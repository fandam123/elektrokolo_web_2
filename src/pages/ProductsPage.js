import React, { useState } from "react";
import {
  PackageCheck,
  Settings,
  Wrench,
  Zap,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { detailedProducts } from "../data/data";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ navigateTo }) => {
  const [viewMode, setViewMode] = useState("sets");
  const [partFilter, setPartFilter] = useState("all");

  const allProducts = Object.values(detailedProducts);
  const motors = allProducts.filter((p) => p.type === "motor");
  const batteries = allProducts.filter((p) => p.type === "battery");
  const displays = allProducts.filter((p) => p.type === "display");
  const brakes = allProducts.filter((p) => p.type === "brake");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-8">
        E-shop
      </h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 max-w-xl mx-auto">
        <button
          onClick={() => setViewMode("sets")}
          className={`px-8 py-3.5 rounded-xl font-bold transition flex-1 flex items-center justify-center gap-2 ${
            viewMode === "sets"
              ? "bg-[#2a3b4c] text-white shadow-lg scale-105"
              : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          <PackageCheck className="w-5 h-5" /> Kompletní sady
        </button>
        <button
          onClick={() => setViewMode("parts")}
          className={`px-8 py-3.5 rounded-xl font-bold transition flex-1 flex items-center justify-center gap-2 ${
            viewMode === "parts"
              ? "bg-[#2a3b4c] text-white shadow-lg scale-105"
              : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          <Settings className="w-5 h-5" /> Samostatné díly
        </button>
      </div>

      {viewMode === "sets" && (
        <div className="space-y-16 animate-in fade-in duration-500">
          {/* HLAVNÍ BANNER PRO KONFIGURÁTOR */}
          <div className="bg-gradient-to-br from-green-50 to-[#e6f7ed] rounded-3xl p-8 md:p-12 border border-green-100 shadow-sm text-left max-w-5xl mx-auto relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex-1 z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <Gift className="w-3 h-3" /> Akce
                </span>
                <span className="text-green-800 font-semibold text-sm">
                  Pro všechny kompletní sady
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2a3b4c] mb-4 leading-tight">
                Nevíte si rady s výběrem komponentů?
              </h2>

              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Náš chytrý pomocník vás krok za krokem provede výběrem. Vyberete
                si motor, baterii i displej přesně na míru vašemu kolu.
              </p>

              <button
                onClick={() => {
                  navigateTo("home");
                  setTimeout(
                    () =>
                      document
                        .getElementById("configurator")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    100
                  );
                }}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg rounded-xl shadow-lg transition transform hover:scale-105 inline-flex items-center gap-2"
              >
                <Wrench className="w-5 h-5" /> Sestavit sadu na míru
              </button>
            </div>

            {/* ILUSTRAČNÍ BLOK VPRAVO: Samostatné čtverečky pro každý díl */}
            <div className="w-full md:w-1/3 flex flex-col gap-3 z-10 shrink-0">
              <h3 className="font-bold text-green-900 uppercase text-sm tracking-wider mb-1 ml-2">
                Obsah sady
              </h3>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="font-bold text-[#2a3b4c] text-lg">Motor</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="font-bold text-[#2a3b4c] text-lg">
                  Baterie
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Settings className="w-6 h-6 text-blue-500" />
                </div>
                <span className="font-bold text-[#2a3b4c] text-lg">
                  Displej
                </span>
              </div>

              {/* ZELENÝ RÁMEČEK PRO DÁREK */}
              <div className="bg-green-600 p-4 rounded-xl shadow-lg border border-green-500 flex items-center gap-4 mt-2 transform hover:scale-[1.02] transition-transform relative overflow-hidden">
                {/* Jemný grafický prvek v pozadí zeleného bloku */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
                <div className="p-2 bg-green-500 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-yellow-300 uppercase text-xs tracking-wider">
                    Dárek zdarma
                  </span>
                  <span className="font-bold text-white text-lg">
                    Brzdový systém
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#2a3b4c] mb-8">
              Nebo si vyberte z oblíbených předpřipravených sad
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Městská sada */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 text-left flex flex-col group">
                <div className="h-56 bg-slate-50 flex items-center justify-center p-6 relative">
                  <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10 shadow-sm">
                    Bestseller
                  </div>
                  <img
                    src="https://placehold.co/400x300/f0fdf4/16a34a?text=Městská+Sada"
                    alt="Městská sada"
                    className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-[#2a3b4c] mb-2">
                    Sada Město (250W + 13Ah)
                  </h4>
                  <p className="text-slate-500 text-sm mb-6">
                    Nejoblíbenější volba pro dojíždění a výlety po
                    cyklostezkách. Plně schváleno pro provoz na pozemních
                    komunikacích.
                  </p>
                  <ul className="text-sm text-slate-700 space-y-3 mb-8 font-medium list-disc pl-5">
                    <li>Motor TSDZ2B 250W</li>
                    <li>Baterie 36V 13Ah (dojezd až 65 km)</li>
                    <li>Displej DZ40</li>
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="text-3xl font-black text-green-600">
                      15 147 Kč
                    </div>
                    <button
                      onClick={() => {
                        navigateTo("home");
                        setTimeout(
                          () =>
                            document
                              .getElementById("configurator")
                              ?.scrollIntoView({ behavior: "smooth" }),
                          100
                        );
                      }}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition shadow-md"
                    >
                      Koupit sadu
                    </button>
                  </div>
                </div>
              </div>

              {/* Offroad sada */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 text-left flex flex-col group">
                <div className="h-56 bg-slate-50 flex items-center justify-center p-6 relative">
                  <img
                    src="https://placehold.co/800x600/f8fafc/475569?text=Offroad+Sada"
                    alt="Offroad sada"
                    className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-[#2a3b4c] mb-2">
                    Sada Extrém (1000W + 20Ah)
                  </h4>
                  <p className="text-slate-500 text-sm mb-6">
                    Nekompromisní výkon do těžkého terénu a masivní dojezd pro
                    velmi náročné jezdce.
                  </p>
                  <ul className="text-sm text-slate-700 space-y-3 mb-8 font-medium list-disc pl-5">
                    <li>Motor TSDZ16 1000W</li>
                    <li>Baterie 52V 20Ah (dojezd až 150 km)</li>
                    <li>Barevný displej EKD01</li>
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="text-3xl font-black text-green-600">
                      23 047 Kč
                    </div>
                    <button
                      onClick={() => {
                        navigateTo("home");
                        setTimeout(
                          () =>
                            document
                              .getElementById("configurator")
                              ?.scrollIntoView({ behavior: "smooth" }),
                          100
                        );
                      }}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition shadow-md"
                    >
                      Koupit sadu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "parts" && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {[
              { id: "all", label: "Všechny díly" },
              { id: "motors", label: "Motory" },
              { id: "batteries", label: "Baterie" },
              { id: "displays", label: "Displeje" },
              { id: "brakes", label: "Brzdy" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setPartFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  partFilter === filter.id
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            {(partFilter === "all" || partFilter === "motors") &&
              motors.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#2a3b4c] mb-8">
                    Motory
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {motors.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                </section>
              )}

            {(partFilter === "all" || partFilter === "batteries") &&
              batteries.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#2a3b4c] mb-8">
                    Baterie
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {batteries.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                </section>
              )}

            {(partFilter === "all" || partFilter === "displays") &&
              displays.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#2a3b4c] mb-8">
                    Displeje
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {displays.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                </section>
              )}

            {(partFilter === "all" || partFilter === "brakes") &&
              brakes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#2a3b4c] mb-8">
                    Brzdové systémy
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {brakes.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                </section>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
