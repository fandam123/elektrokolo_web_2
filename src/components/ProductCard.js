import React from "react";

const ProductCard = ({ product, navigateTo }) => {
  // Najde obrázek, ať už je v datech jako 'image' (text) nebo 'images' (pole)
  const imageUrl = product.image || (product.images && product.images[0]);

  return (
    <div
      onClick={() => navigateTo("productDetail", product.id)}
      className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer flex flex-col text-left w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm group"
    >
      <div className="h-48 bg-slate-50 flex items-center justify-center p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="text-slate-400 text-sm font-medium">Bez obrázku</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-sm text-[#2a3b4c] mb-2">
          {product.name}
        </h3>
        <div className="font-extrabold text-lg text-green-600 mb-4">
          {product.price === 0
            ? "0 Kč"
            : `${product.price.toLocaleString()} Kč`}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateTo("productDetail", product.id);
          }}
          className="w-full py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-sm font-medium text-slate-800 text-center rounded-lg transition mt-auto"
        >
          Zjistit více
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
