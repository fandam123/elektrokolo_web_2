import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  ShoppingCart,
  Check,
  Heart,
} from "lucide-react";
import { configuratorData, detailedProducts } from "../data/data";

const ConfiguratorSection = ({ navigateTo, onOrder, favorites = [] }) => {
  const [selectedConfig, setSelectedConfig] = useState({
    motor: null,
    battery: null,
    display: null,
    brakes: null,
    assembly: null,
  });
  const [openSections, setOpenSections] = useState({
    motor: true,
    battery: false,
    display: false,
    brakes: false,
    assembly: false,
  });

  const isUnlocked = (section) => {
    if (section === "motor") return true;
    if (section === "battery") return selectedConfig.motor !== null;
    if (section === "display") return selectedConfig.battery !== null;
    if (section === "brakes") return selectedConfig.display !== null;
    if (section === "assembly") return selectedConfig.brakes !== null;
    return false;
  };

  const toggleSection = (section) => {
    if (!isUnlocked(section)) return;
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const selectItem = (category, item) => {
    setSelectedConfig((prev) => {
      const newConfig = { ...prev, [category]: item };
      if (
        category === "motor" &&
        newConfig.battery &&
        newConfig.battery.id !== "bat_none"
      ) {
        const is36V = newConfig.battery.name.includes("36V");
        if (item.id === "mot_250" && !is36V) newConfig.battery = null;
        if (item.id !== "mot_250" && is36V) newConfig.battery = null;
      }
      return newConfig;
    });

    const order = ["motor", "battery", "display", "brakes", "assembly"];
    const currentIndex = order.indexOf(category);
    if (currentIndex < order.length - 1) {
      const nextCategory = order[currentIndex + 1];
      setOpenSections((prev) => ({
        ...prev,
        [category]: false,
        [nextCategory]: true,
      }));
    }
  };

  const totalPrice =
    (selectedConfig.motor?.price || 0) +
    (selectedConfig.battery?.price || 0) +
    (selectedConfig.display?.price || 0) +
    (selectedConfig.brakes?.price || 0) +
    (selectedConfig.assembly?.price || 0);

  const isComplete =
    selectedConfig.motor &&
    selectedConfig.battery &&
    selectedConfig.display &&
    selectedConfig.brakes &&
    selectedConfig.assembly;

  const getFilteredData = (key, data) => {
    if (key === "battery" && selectedConfig.motor) {
      return data.filter((bat) => {
        if (bat.id === "bat_none") return true;
        const is36V = bat.name.includes("36V");
        return selectedConfig.motor.id === "mot_250" ? is36V : !is36V;
      });
    }
    return data;
  };

  const getMotorSubtitle = (name) => {
    if (name.includes("250W")) return "Ideální volba do města";
    if (name.includes("750W") || name.includes("500W"))
      return "Nejlepší poměr cena/výkon";
    if (name.includes("1000W") || name.includes("TSDZ16"))
      return "Absolutní bestie";
    return null;
  };

  const getLegality = (category, item) => {
    if (item.id === "bat_none") return null;

    if (category === "motor") {
      if (item.name.includes("250W"))
        return { legal: true, text: "Legální (na silnice)" };
      return { legal: false, text: "Mimo komunikace" };
    }
    if (category === "battery") {
      if (item.name.includes("52V"))
        return { legal: false, text: "Mimo komunikace" };
      return { legal: true, text: "Legální (na silnice)" };
    }
    if (category === "display" || category === "brakes") {
      return { legal: true, text: "Legální (na silnice)" };
    }
    return null;
  };

  return (
    <div
      id="configurator"
      className="max-w-5xl mx-auto px-4 py-12 scroll-mt-24 relative"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a3b4c]">
          Spočítejte si cenu přestavby
        </h2>
        <p className="text-slate-400 mt-2 text-lg">
          Vyberte jednotlivé díly a zjistěte přesnou cenu vaší přestavby
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-8">
        <h3 className="text-xl font-bold text-center text-[#2a3b4c] mb-6">
          Vyberte jednotlivé díly
        </h3>
        <div className="space-y-4">
          {[
            { key: "motor", title: "1. Motor", data: configuratorData.motors },
            {
              key: "battery",
              title: "2. Baterie",
              data: getFilteredData("battery", configuratorData.batteries),
            },
            {
              key: "display",
              title: "3. Displej",
              data: configuratorData.displays,
            },
            {
              key: "brakes",
              title: "4. Brzdový systém",
              data: configuratorData.brakes,
            },
            {
              key: "assembly",
              title: "5. Montáž",
              data: configuratorData.assembly,
            },
          ].map((section) => (
            <div
              key={section.key}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className={`w-full flex items-center justify-between p-4 transition-colors text-left ${
                  !isUnlocked(section.key)
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-[#2a3b4c] hover:bg-slate-50"
                }`}
              >
                {/* UPRAVENÝ NADPIS: Přidán název vybraného produktu */}
                <span className="font-bold text-base md:text-lg flex flex-wrap items-center gap-1 md:gap-2">
                  {section.title}
                  {selectedConfig[section.key] && (
                    <span className="text-green-600 text-sm md:text-base font-semibold">
                      – {selectedConfig[section.key].name}
                    </span>
                  )}
                </span>

                {openSections[section.key] ? (
                  <ChevronUp className="w-5 h-5 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 shrink-0 ml-2" />
                )}
              </button>

              {openSections[section.key] &&
                isUnlocked(section.key) &&
                (section.key === "assembly" ? (
                  <div className="p-4 md:p-6 border-t border-slate-100 flex flex-col gap-4">
                    {section.data.map((item) => {
                      const isSelected =
                        selectedConfig[section.key]?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => selectItem(section.key, item)}
                          className={`p-5 rounded-xl cursor-pointer transition flex flex-col md:flex-row justify-between items-start md:items-center border bg-white ${
                            isSelected
                              ? "border-green-500 ring-1 ring-green-500 shadow-md"
                              : "border-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <h4 className="font-bold text-[#2a3b4c] text-base">
                              {item.name}
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">
                              {item.desc}
                            </p>
                            {item.link && (
                              <p className="text-sm text-green-600 mt-1">
                                {item.link}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 md:ml-6 shrink-0 w-full md:w-auto">
                            <div className="font-extrabold text-[#2a3b4c] text-lg whitespace-nowrap">
                              {item.price === 0
                                ? item.priceText || "Zdarma"
                                : item.priceText ||
                                  `${item.price.toLocaleString()} Kč`}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                selectItem(section.key, item);
                              }}
                              className={`mt-3 px-6 py-2 font-bold text-sm rounded-md transition-colors w-full md:w-auto flex items-center justify-center gap-2 ${
                                isSelected
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4" />}
                              {isSelected ? "Vybráno" : "Vybrat"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 md:p-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {section.data.map((item) => {
                      const detailedProduct = detailedProducts[item.id];
                      const isSelected =
                        selectedConfig[section.key]?.id === item.id;

                      const imageUrl =
                        item.image ||
                        (detailedProduct &&
                          (detailedProduct.image ||
                            (detailedProduct.images &&
                              detailedProduct.images[0])));

                      const motorSubtitle =
                        section.key === "motor"
                          ? getMotorSubtitle(item.name)
                          : null;
                      const legality = getLegality(section.key, item);

                      return (
                        <div
                          key={item.id}
                          onClick={() => selectItem(section.key, item)}
                          className={`p-4 rounded-xl cursor-pointer transition flex flex-col items-center text-center border bg-white h-full relative ${
                            isSelected
                              ? "border-green-500 ring-1 ring-green-500 shadow-md"
                              : "border-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <div className="w-full h-32 md:h-40 mb-4 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden relative">
                            {/* SEMAFOR LEGALITY */}
                            {legality && (
                              <div
                                className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-sm border bg-white z-10 ${
                                  legality.legal
                                    ? "text-green-700 border-green-100"
                                    : "text-red-600 border-red-100"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-sm ${
                                    legality.legal
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                {legality.text}
                              </div>
                            )}

                            {/* SRDÍČKO OBLÍBENÝCH (Nové) */}
                            {favorites.includes(item.id) && (
                              <div
                                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm z-10 border border-red-100"
                                title="Tento produkt máte v oblíbených"
                              >
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                              </div>
                            )}

                            {item.id === "bat_none" ? (
                              <X className="w-24 h-24 text-red-500 stroke-[3]" />
                            ) : imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-50 text-slate-300 text-xs flex items-center justify-center">
                                Bez fotky
                              </div>
                            )}
                          </div>

                          <h4 className="font-bold text-sm text-[#2a3b4c] mb-1">
                            {item.name}
                          </h4>

                          {motorSubtitle && (
                            <div className="text-[11px] font-black text-amber-500 mb-2 uppercase tracking-wide bg-amber-50 px-2 py-0.5 rounded">
                              {motorSubtitle}
                            </div>
                          )}

                          <div className="font-extrabold text-lg text-green-600 mb-2">
                            {item.price === 0
                              ? item.priceText || "Zdarma"
                              : `${item.price.toLocaleString()} Kč`}
                          </div>
                          {item.desc && (
                            <div className="text-xs text-slate-400 mb-4 px-2 leading-tight">
                              {item.desc}
                            </div>
                          )}

                          <div className="flex flex-col xl:flex-row gap-2 mt-auto w-full pt-4 border-t border-slate-50">
                            {detailedProduct && item.id !== "bat_none" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateTo("productDetail", item.id);
                                }}
                                className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-md transition-colors w-full"
                              >
                                Zjistit více
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                selectItem(section.key, item);
                              }}
                              className={`flex-1 py-2 px-2 font-bold text-sm rounded-md transition-colors flex items-center justify-center gap-1.5 w-full ${
                                isSelected
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4" />}
                              {isSelected ? "Vybráno" : "Vybrat"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 md:p-12 bg-[#eefaf2] rounded-xl flex flex-col items-center justify-center text-center border border-green-100 shadow-inner">
          <h3 className="text-xl md:text-2xl font-bold text-[#2a3b4c] mb-2">
            Celková cena
          </h3>
          <div className="text-4xl md:text-5xl font-extrabold text-green-600 mb-8">
            {totalPrice.toLocaleString()} Kč
          </div>

          <button
            onClick={() => isComplete && onOrder(selectedConfig)}
            disabled={!isComplete}
            className={`px-12 py-4 rounded-xl font-extrabold text-lg transition-all duration-300 flex items-center gap-3 ${
              isComplete
                ? "bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-6 h-6" /> Přidat do košíku
          </button>

          {!isComplete && (
            <p className="text-slate-500 font-medium text-sm mt-5 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              Pro pokračování k objednávce prosím vyberte všechny komponenty
              nahoře ☝️
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorSection;
