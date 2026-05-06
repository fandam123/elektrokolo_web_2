import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  PackageCheck,
} from "lucide-react";
import { detailedProducts } from "../data/data";

const ProductDetailPage = ({
  productId,
  navigateTo,
  favorites,
  toggleFavorite,
  addToCart,
}) => {
  const product = detailedProducts[productId];
  const [activeImage, setActiveImage] = useState(0);
  const [isPackageOpen, setIsPackageOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPackageOpen(false);
  }, [productId]);

  if (!product)
    return (
      <div className="p-20 text-center">
        Produkt nenalezen.{" "}
        <button
          onClick={() => navigateTo("products")}
          className="text-green-600 underline"
        >
          Zpět na E-shop
        </button>
      </div>
    );

  const isFav = favorites?.includes(product.id);

  // CHYTRÉ NAČTENÍ OBRÁZKŮ:
  // Zvládne to, i když v datech použiješ jen `image: "neco.jpg"` místo `images: ["neco.jpg"]`
  const productImages =
    product.images || (product.image ? [product.image] : []);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <button
        onClick={() => navigateTo("products")}
        className="mb-6 flex items-center text-sm font-bold text-slate-500 hover:text-green-600 transition w-fit"
      >
        <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Zpět na E-shop
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
        <div className="lg:w-5/12 flex flex-col">
          <div className="bg-[#f8f9fa] rounded-xl border border-slate-100 p-8 aspect-square flex items-center justify-center relative mb-4">
            {productImages.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 bg-white/80 hover:bg-white rounded-md shadow-sm border border-slate-200 z-10"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}

            {productImages.length > 0 ? (
              <img
                src={productImages[activeImage]}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            ) : (
              <div className="text-slate-400 font-medium">
                Zatím bez obrázku
              </div>
            )}

            {productImages.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 bg-white/80 hover:bg-white rounded-md shadow-sm border border-slate-200 z-10"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            )}

            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      activeImage === idx ? "bg-green-600" : "bg-slate-300"
                    }`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {productImages.length > 1 && (
            <div className="flex gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 bg-white rounded-lg border flex items-center justify-center p-2 flex-shrink-0 transition-colors ${
                    activeImage === idx
                      ? "border-green-600 ring-1 ring-green-600"
                      : "border-slate-200 hover:border-green-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Náhled ${idx + 1}`}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-7/12 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-6">
            {product.name}
          </h1>

          <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
            <div className="bg-white p-4 font-bold text-[#2a3b4c] border-b border-slate-200">
              Technické specifikace
            </div>
            <div className="bg-white flex flex-col">
              {product.specsTable &&
                product.specsTable.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-4 border-b border-slate-100 last:border-0 text-sm even:bg-slate-50/50"
                  >
                    <span className="text-[#2a3b4c] font-medium">
                      {spec.label}
                    </span>
                    <span className="text-slate-600">{spec.value}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="text-4xl font-extrabold text-green-600 mb-6">
            {product.price === 0
              ? "Zdarma"
              : `${product.price.toLocaleString()} Kč`}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                addToCart({
                  type: "single",
                  product: product,
                  price: product.price,
                })
              }
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold flex items-center justify-center gap-2 w-full sm:w-auto transition"
            >
              <ShoppingCart className="w-5 h-5" /> Přidat do košíku
            </button>
            <button
              onClick={() => toggleFavorite && toggleFavorite(product.id)}
              className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold flex items-center justify-center gap-2 w-full sm:w-auto transition"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? "fill-red-500 text-red-500" : ""
                }`}
              />{" "}
              {isFav ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        {product.about && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#2a3b4c] mb-6">
                {product.type === "motor"
                  ? "O motoru"
                  : product.type === "battery"
                  ? "Důležité informace o baterii"
                  : "O produktu"}
              </h3>
              <div
                className="text-[#8c98a4] leading-relaxed space-y-4 text-[15px]"
                dangerouslySetInnerHTML={{ __html: product.about }}
              />
            </div>
          </div>
        )}

        {product.legalInfo && (
          <div
            className={`p-6 md:p-8 rounded-xl border flex gap-4 items-start ${
              product.legalInfo.type === "green"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            {product.legalInfo.type === "green" ? (
              <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h3
                className={`text-lg font-bold mb-3 ${
                  product.legalInfo.type === "green"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {product.legalInfo.title}
              </h3>
              <p
                className={`text-[15px] leading-relaxed ${
                  product.legalInfo.type === "green"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {product.legalInfo.text}
              </p>
            </div>
          </div>
        )}

        {product.tips && (
          <div className="bg-[#fff9e6] border border-[#f3e1a5] rounded-xl p-6 md:p-8 flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#2a3b4c] mb-3 flex items-center gap-2">
                💡 Tip pro maximální životnost:
              </h3>
              <div
                className="text-slate-500 text-[15px] space-y-3"
                dangerouslySetInnerHTML={{ __html: product.tips }}
              />
            </div>
          </div>
        )}

        {product.packageContents && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsPackageOpen(!isPackageOpen)}
              className="w-full p-6 flex justify-between items-center bg-white hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <PackageCheck className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-[#2a3b4c]">
                  Obsah balíčku
                </h3>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                  isPackageOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {isPackageOpen && (
              <div className="px-6 pb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                {product.packageContents.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-6 border-t border-slate-100 first:border-0"
                  >
                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-slate-100 shadow-sm">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2a3b4c] text-lg mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[15px] text-[#8c98a4] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
