import React, { useState, useEffect } from "react";
import { ArrowLeft, Repeat, Info, Zap, Settings, Battery } from "lucide-react";
import { detailedProducts } from "../data/data";

const ComparisonPage = ({ navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState("motor");
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");

  const allProducts = Object.values(detailedProducts);

  const categories = [
    { id: "motor", label: "Motory", icon: <Zap className="w-5 h-5" /> },
    { id: "battery", label: "Baterie", icon: <Battery className="w-5 h-5" /> },
    { id: "display", label: "Displeje", icon: <Settings className="w-5 h-5" /> },
  ];

  const productsInCategory = allProducts.filter(
    (p) => p.type === activeCategory
  );

  // Automatické předvybrání prvních dvou produktů při změně kategorie
  useEffect(() => {
    const filtered = allProducts.filter((p) => p.type === activeCategory);
    if (filtered.length > 0) {
      setItem1(filtered[0]?.id || "");
      setItem2(filtered.length > 1 ? filtered[1]?.id : filtered[0]?.id || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const p1 = detailedProducts[item1];
  const p2 = detailedProducts[item2];

  // Chytré vytažení obrázku
  const getProductImage = (product) => {
    if (!product) return null;
    return product.image || (product.images && product.images[0]);
  };

  // Získání všech unikátních klíčů z parametrů obou produktů
  const getSpecKeys = () => {
    const keys = new Set();
    const addKeys = (specs) => {
      if (!specs) return;
      // Podpora pro oba formáty (pokud je to objekt nebo pole)
      if (Array.isArray(specs)) {
        specs.forEach((s) => keys.add(s.name || s.label));
      } else {
        Object.keys(specs).forEach((k) => keys.add(k));
      }
    };
    addKeys(p1?.specsTable);
    addKeys(p2?.specsTable);
    return Array.from(keys);
  };

  // Bezpečné získání hodnoty parametru
  const getSpecValue = (product, key) => {
    if (!product?.specsTable) return "-";
    if (Array.isArray(product.specsTable)) {
      const spec = product.specsTable.find(
        (s) => s.name === key || s.label === key
      );
      return spec ? spec.value : "-";
    }
    return product.specsTable[key] || "-";
  };

  const specKeys = getSpecKeys();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* TLAČÍTKO ZPĚT A NADPIS */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-slate-500 hover:text-[#2a3b4c] font-bold transition-colors w-full md:w-auto justify-center md:justify-start"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět do e-shopu
        </button>
        <div className="text-center md:text-right">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2a3b4c] flex items-center justify-center md:justify-end gap-3">
            <Repeat className="w-8 h-8 text-green-500" />
            Srovnávač produktů
          </h1>
          <p className="text-slate-400 mt-2">
            Porovnejte si parametry a vyberte to nejlepší pro vaše kolo
          </p>
        </div>
      </div>

      {/* VÝBĚR KATEGORIE */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === cat.id
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-white text-slate-500 border border-slate-200 hover:border-green-400 hover:text-green-600"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* HLAVNÍ SROVNÁVACÍ BLOK */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Výběr konkrétních produktů */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50 border-b border-slate-100">
          {/* Produkt 1 */}
          <div className="p-6 md:p-8 flex flex-col items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Vyberte první produkt
            </label>
            <select
              value={item1}
              onChange={(e) => setItem1(e.target.value)}
              className="w-full max-w-xs p-3 rounded-lg border border-slate-300 bg-white font-bold text-[#2a3b4c] focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm text-center"
            >
              {productsInCategory.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="h-40 w-full mt-6 flex items-center justify-center p-4 bg-white rounded-xl border border-slate-100">
              {getProductImage(p1) ? (
                <img
                  src={getProductImage(p1)}
                  alt={p1?.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              ) : (
                <span className="text-slate-300 text-sm">Bez obrázku</span>
              )}
            </div>
            <div className="mt-4 text-2xl font-black text-green-600">
              {p1?.price ? `${p1.price.toLocaleString()} Kč` : "Není stanovena"}
            </div>
          </div>

          {/* Produkt 2 */}
          <div className="p-6 md:p-8 flex flex-col items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Vyberte druhý produkt
            </label>
            <select
              value={item2}
              onChange={(e) => setItem2(e.target.value)}
              className="w-full max-w-xs p-3 rounded-lg border border-slate-300 bg-white font-bold text-[#2a3b4c] focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm text-center"
            >
              {productsInCategory.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="h-40 w-full mt-6 flex items-center justify-center p-4 bg-white rounded-xl border border-slate-100 relative">
              {getProductImage(p2) ? (
                <img
                  src={getProductImage(p2)}
                  alt={p2?.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              ) : (
                <span className="text-slate-300 text-sm">Bez obrázku</span>
              )}
            </div>
            <div className="mt-4 text-2xl font-black text-green-600">
              {p2?.price ? `${p2.price.toLocaleString()} Kč` : "Není stanovena"}
            </div>
          </div>
        </div>

        {/* TABULKA PARAMETRŮ */}
        {specKeys.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {specKeys.map((key, index) => {
              const val1 = getSpecValue(p1, key);
              const val2 = getSpecValue(p2, key);
              const isDifferent = val1 !== val2;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-3 hover:bg-slate-50 transition-colors ${
                    isDifferent ? "bg-green-50/30" : ""
                  }`}
                >
                  <div className="p-4 md:p-5 font-bold text-slate-500 text-sm md:text-base flex items-center justify-center md:justify-start border-b md:border-b-0 border-slate-100 bg-slate-50/50 md:bg-transparent">
                    {key}
                  </div>
                  <div className="grid grid-cols-2 md:col-span-2 text-center md:divide-x divide-slate-100">
                    <div
                      className={`p-4 md:p-5 text-sm md:text-base ${
                        isDifferent
                          ? "font-bold text-[#2a3b4c]"
                          : "text-slate-600"
                      }`}
                    >
                      {val1}
                    </div>
                    <div
                      className={`p-4 md:p-5 text-sm md:text-base ${
                        isDifferent
                          ? "font-bold text-[#2a3b4c]"
                          : "text-slate-600"
                      }`}
                    >
                      {val2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
            <Info className="w-8 h-8 text-slate-300" />
            U těchto produktů zatím nemáme vyplněné detailní parametry.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;