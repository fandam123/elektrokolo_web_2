// --- AKTIVACE DESIGNU (Tailwind CSS) ---
if (typeof document !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(script);
}
// ----------------------------------------

import React, { useState, useEffect } from "react";

// Tady jsou už jen ty ikony, které reálně používá samotný App.js (menu a toasty)
import { Menu, X, ShoppingCart, Heart, Info, Check } from "lucide-react";

// Tvoje data (potřebujeme je v App.js pro přidávání do oblíbených)
import { detailedProducts } from "./data/data";

// Všechny tvoje krásně oddělené stránky
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShippingPaymentPage from "./pages/ShippingPaymentPage";
import GuidesPage from "./pages/GuidesPage";
import QuickContactWidget from "./components/QuickContactWidget";

// ==========================================
// HLAVNÍ APLIKACE (Root Component)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inicializace košíku z localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("elektrokit_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Chyba při načítání košíku z paměti", error);
      return [];
    }
  });

  // Inicializace oblíbených z localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem("elektrokit_favorites");
      return savedFavs ? JSON.parse(savedFavs) : [];
    } catch (error) {
      console.error("Chyba při načítání oblíbených z paměti", error);
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  // --- Historie prohlížeče (Tlačítko Zpět) ---
  useEffect(() => {
    // Nastavení výchozího stavu při prvním načtení
    if (!window.history.state) {
      window.history.replaceState({ page: "home", param: null }, "", "#home");
    }

    // Posluchač pro kliknutí na tlačítko Zpět/Vpřed
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page);
        setSelectedProductId(event.state.param || null);
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Ukládání košíku do localStorage při každé jeho změně
  useEffect(() => {
    try {
      localStorage.setItem("elektrokit_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Chyba při ukládání košíku", error);
    }
  }, [cart]);

  // Ukládání oblíbených do localStorage při každé jejich změně
  useEffect(() => {
    try {
      localStorage.setItem("elektrokit_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Chyba při ukládání oblíbených", error);
    }
  }, [favorites]);

  const showToast = (message, icon = "check") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const product = detailedProducts[id];
      if (isFav) {
        showToast(
          `${product?.name || "Produkt"} odebrán z oblíbených.`,
          "info"
        );
        return prev.filter((fId) => fId !== id);
      } else {
        showToast(
          `${product?.name || "Produkt"} přidán do oblíbených.`,
          "heart"
        );
        return [...prev, id];
      }
    });
  };

  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    if (param) setSelectedProductId(param);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);

    // Přidání do historie prohlížeče
    window.history.pushState(
      { page, param },
      "",
      `#${page}${param ? `/${param}` : ""}`
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Pokud přidáváme samostatný produkt, podíváme se, jestli už v košíku není
      if (item.type === "single") {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) =>
            cartItem.type === "single" &&
            cartItem.product.id === item.product.id
        );
        if (existingItemIndex >= 0) {
          const newCart = [...prevCart];
          newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: (newCart[existingItemIndex].quantity || 1) + 1,
          };
          return newCart;
        }
      }
      // Pokud produkt v košíku není, nebo jde o sadu na míru, přidáme nový záznam
      return [...prevCart, { ...item, cartId: Date.now(), quantity: 1 }];
    });

    const itemName =
      item.type === "single" ? item.product.name : "Kompletní sada";
    showToast(`${itemName} přidán do košíku.`, "cart");
  };

  const updateQuantity = (cartId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = Math.max(1, (item.quantity || 1) + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartIdToRemove) => {
    setCart(cart.filter((item) => item.cartId !== cartIdToRemove));
  };

  const handleOrderSet = (configData) => {
    const totalPrice =
      (configData.motor?.price || 0) +
      (configData.battery?.price || 0) +
      (configData.display?.price || 0) +
      (configData.brakes?.price || 0) +
      (configData.assembly?.price || 0);

    addToCart({ type: "set", items: configData, price: totalPrice });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigateTo("home")}
            >
              <span className="font-extrabold text-2xl text-green-600 tracking-tight">
                ElektroKit.cz
              </span>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => navigateTo("products")}
                  className={`text-sm font-medium transition ${
                    currentPage === "products"
                      ? "text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  E-shop
                </button>
                <button
                  onClick={() => navigateTo("about")}
                  className={`text-sm font-medium transition ${
                    currentPage === "about"
                      ? "text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  O nás
                </button>
                <button
                  onClick={() => navigateTo("terms")}
                  className={`text-sm font-medium transition ${
                    currentPage === "terms"
                      ? "text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Obchodní podmínky
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className={`text-sm font-medium transition ${
                    currentPage === "contact"
                      ? "text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Kontakt
                </button>
              </nav>

              <div className="flex items-center">
                <button
                  onClick={() => navigateTo("favorites")}
                  className="relative p-2 text-slate-600 hover:text-red-500 transition mr-2"
                >
                  <Heart className="w-6 h-6" />
                  {favorites.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigateTo("checkout")}
                  className="relative p-2 text-slate-600 hover:text-green-600 transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                      {cart.reduce(
                        (sum, item) => sum + (item.quantity || 1),
                        0
                      )}
                    </span>
                  )}
                </button>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-slate-500 p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            {/* Tmavé pozadí pod menu (Click Outside pro zavření) */}
            <div
              className="md:hidden fixed inset-0 top-20 bg-slate-900/20 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Samotné mobilní menu */}
            <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 shadow-xl absolute w-full left-0 z-50">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => navigateTo("products")}
                  className="px-4 py-3 text-left font-medium text-slate-700 bg-slate-50 rounded-lg"
                >
                  E-shop
                </button>
                <button
                  onClick={() => navigateTo("guides")}
                  className="px-4 py-3 text-left font-medium text-slate-700 bg-slate-50 rounded-lg"
                >
                  Návody
                </button>
                <button
                  onClick={() => navigateTo("about")}
                  className="px-4 py-3 text-left font-medium text-slate-700 bg-slate-50 rounded-lg"
                >
                  O nás
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="px-4 py-3 text-left font-medium text-slate-700 bg-slate-50 rounded-lg"
                >
                  Kontakt
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      <main>
        {currentPage === "home" && (
          <HomePage navigateTo={navigateTo} onOrder={handleOrderSet} />
        )}
        {currentPage === "products" && <ProductsPage navigateTo={navigateTo} />}
        {currentPage === "productDetail" && (
          <ProductDetailPage
            productId={selectedProductId}
            navigateTo={navigateTo}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "complaints" && <ComplaintsPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "checkout" && (
          <CheckoutPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            navigateTo={navigateTo}
          />
        )}
        {currentPage === "shipping" && <ShippingPaymentPage />}
        {currentPage === "favorites" && (
          <FavoritesPage
            navigateTo={navigateTo}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        {currentPage === "guides" && <GuidesPage navigateTo={navigateTo} />}
      </main>

      <footer className="bg-[#334155] text-slate-300 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold text-green-500 mb-4">
                ElektroKit.cz
              </h3>
              <p className="text-sm">
                Přestavbové sady pro elektrokola - kvalita, výkon a spolehlivost
                pro vaše cyklistické dobrodružství.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produkty</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigateTo("products")}
                    className="hover:text-white transition"
                  >
                    E-shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("products")}
                    className="hover:text-white transition"
                  >
                    Motory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("products")}
                    className="hover:text-white transition"
                  >
                    Baterie
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("products")}
                    className="hover:text-white transition"
                  >
                    Displeje
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Podpora</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigateTo("shipping")}
                    className="hover:text-white transition"
                  >
                    Doprava a platba
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("complaints")}
                    className="hover:text-white transition"
                  >
                    Reklamační řád
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="hover:text-white transition"
                  >
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">O společnosti</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigateTo("about")}
                    className="hover:text-white transition"
                  >
                    O nás
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("terms")}
                    className="hover:text-white transition"
                  >
                    Obchodní podmínky
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-600 mt-12 pt-8 text-sm text-center">
            <p>
              &copy; 2024 ElektroKit.cz. Všechna práva vyhrazena. Optimalizovaná
              nativní React verze.
            </p>
          </div>
        </div>
      </footer>

      <QuickContactWidget />

      {/* Toast Notifikace */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 pointer-events-none items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-slate-800 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 fade-in duration-300"
          >
            {toast.icon === "cart" && (
              <ShoppingCart className="w-5 h-5 text-green-400" />
            )}
            {toast.icon === "heart" && (
              <Heart className="w-5 h-5 text-red-400 fill-current" />
            )}
            {toast.icon === "info" && (
              <Info className="w-5 h-5 text-slate-400" />
            )}
            {toast.icon === "check" && (
              <Check className="w-5 h-5 text-green-400" />
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
