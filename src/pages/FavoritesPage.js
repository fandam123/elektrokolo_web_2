import React from "react";
import { Heart } from "lucide-react";
import { detailedProducts } from "../data/data";

const FavoritesPage = ({ navigateTo, favorites, toggleFavorite }) => {
  const favoriteItems = favorites
    .map((id) => detailedProducts[id])
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-[60vh]">
      <div className="flex items-center gap-3 mb-10">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c]">
          Moje oblíbené
        </h1>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <Heart className="w-20 h-20 text-slate-200 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Zatím tu nic nemáte
          </h2>
          <button
            onClick={() => navigateTo("products")}
            className="mt-4 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Přejít do obchodu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col relative"
            >
              <div className="h-48 p-4 flex justify-center items-center bg-slate-50 relative group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full z-10"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </button>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="max-h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/200x150/e2e8f0/475569";
                  }}
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm text-[#2a3b4c]">
                  {item.name}
                </h3>
                <div className="mt-2 mb-4 font-bold text-lg text-green-600">
                  {item.price} Kč
                </div>
                <button
                  onClick={() => navigateTo("productDetail", item.id)}
                  className="mt-auto w-full py-2 bg-slate-50 hover:bg-slate-100 text-sm font-medium rounded border"
                >
                  Zjistit více
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
