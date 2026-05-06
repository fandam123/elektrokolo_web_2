import React, { useState, useEffect } from "react";
import {
  Check,
  ArrowRight,
  Trash2,
  Truck,
  CreditCard,
  User,
  MapPin,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const CheckoutPage = ({ cart, removeFromCart, updateQuantity, navigateTo }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [shipping, setShipping] = useState("dpd");
  const [payment, setPayment] = useState("card");
  const [packetaPoint, setPacketaPoint] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.packeta.com/v6/www/js/library.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const openPacketaWidget = () => {
    if (window.Packeta && window.Packeta.Widget) {
      window.Packeta.Widget.pick(
        "12345678",
        (point) => {
          if (point) {
            setPacketaPoint({ id: point.id, name: point.name });
          }
        },
        { country: "cz", language: "cs" }
      );
    } else {
      alert("Mapa Zásilkovny se ještě načítá, zkuste to prosím za vteřinku.");
    }
  };

  const shippingOptions = [
    { id: "dpd", name: "DPD Kurýr", price: 149 },
    {
      id: "packeta_address",
      name: "Zásilkovna (Doručení na adresu)",
      price: 109,
    },
    {
      id: "packeta_point",
      name: "Zásilkovna (Výdejní místo / Z-BOX)",
      price: 79,
    },
    { id: "pickup", name: "Osobní odběr (Praha)", price: 0 },
  ];

  const paymentOptions = [
    { id: "card", name: "Online platba kartou", price: 0 },
    { id: "applepay", name: "Apple Pay", price: 0 },
    { id: "googlepay", name: "Google Pay", price: 0 },
    { id: "transfer", name: "Bankovní převod předem", price: 0 },
    { id: "cod", name: "Dobírka (Platba při převzetí)", price: 49 },
  ];

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const selectedShipping =
    shippingOptions.find((s) => s.id === shipping) || shippingOptions[0];
  const selectedPayment =
    paymentOptions.find((p) => p.id === payment) || paymentOptions[0];
  const finalTotal = cartTotal + selectedShipping.price + selectedPayment.price;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const customerName = formData.get("fullName");
    const customerEmail = formData.get("email");

    // Formátování obsahu košíku pro hezčí e-mail
    const orderSummaryText = cart
      .map((cartItem) => {
        const qty = cartItem.quantity || 1;
        if (cartItem.type === "single") {
          return `📦 ${cartItem.product.name}\n   Počet: ${qty} ks — Cena: ${(
            cartItem.price * qty
          ).toLocaleString()} Kč\n`;
        } else {
          return `🚲 KOMPLETNÍ SADA NA MÍRU (${qty} ks)
   • Motor: ${cartItem.items.motor?.name || "-"}
   • Baterie: ${cartItem.items.battery?.name || "-"}
   • Displej: ${cartItem.items.display?.name || "-"}
   • Brzdy: ${cartItem.items.brakes?.name || "-"}
   • Montáž: ${cartItem.items.assembly?.name || "-"}
   Cena za tyto sady: ${(cartItem.price * qty).toLocaleString()} Kč\n`;
        }
      })
      .join("\n" + "—".repeat(30) + "\n\n");

    const templateParams = {
      customer_name: customerName,
      customer_email: customerEmail,
      order_summary: orderSummaryText,
      shipping_method:
        selectedShipping.name + (packetaPoint ? ` (${packetaPoint.name})` : ""),
      payment_method: selectedPayment.name,
      total_price: finalTotal.toLocaleString(),
    };

    emailjs
      .send(
        "service_0vwmdhx",
        "template_m3pveai",
        templateParams,
        "PkiNAdzSKNyLGGnqD"
      )
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Omlouváme se, e-mail se nepodařilo odeslat. Zkuste to prosím znovu."
        );
        setIsSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Objednávka přijata!
        </h1>
        <p className="text-slate-600 mb-8">
          Děkujeme za váš nákup. Na e-mail jsme vám právě zaslali potvrzení se
          shrnutím objednávky.
        </p>
        <button
          onClick={() => navigateTo("home")}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 transition text-white rounded-lg font-bold"
        >
          Zpět na hlavní stránku
        </button>
      </div>
    );
  }

  if (cart.length === 0)
    return (
      <div className="p-20 text-center text-slate-500 text-lg">
        Váš košík je momentálně prázdný.
        <br />
        <button
          onClick={() => navigateTo("products")}
          className="text-green-600 font-bold mt-4 hover:underline"
        >
          Přejít do E-shopu
        </button>
      </div>
    );

  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-8">
          Nákupní košík
        </h1>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 space-y-6">
            {cart.map((cartItem) => {
              const qty = cartItem.quantity || 1;
              return (
                <div
                  key={cartItem.cartId}
                  className="border-b border-slate-100 pb-6 last:border-0 last:pb-0 flex flex-col md:flex-row gap-4 md:items-center justify-between"
                >
                  <div className="flex-1">
                    {cartItem.type === "single" ? (
                      <div className="font-bold text-[#2a3b4c] text-lg">
                        {cartItem.product.name}
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold text-[#2a3b4c] text-lg mb-2">
                          Kompletní sada na míru
                        </div>
                        <ul className="text-sm text-slate-500 space-y-1 border-l-2 border-green-200 pl-3">
                          {cartItem.items.motor && (
                            <li>Motor: {cartItem.items.motor.name}</li>
                          )}
                          {cartItem.items.battery &&
                            cartItem.items.battery.id !== "bat_none" && (
                              <li>Baterie: {cartItem.items.battery.name}</li>
                            )}
                          {cartItem.items.display && (
                            <li>Displej: {cartItem.items.display.name}</li>
                          )}
                          {cartItem.items.brakes && (
                            <li>Brzdy: {cartItem.items.brakes.name}</li>
                          )}
                          {cartItem.items.assembly && (
                            <li>Montáž: {cartItem.items.assembly.name}</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-6 md:w-[350px] justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 shadow-sm">
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, -1)}
                        disabled={qty <= 1}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-green-600 disabled:opacity-30 font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-slate-700">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, 1)}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-green-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right flex-1 font-extrabold text-green-600 text-lg">
                      {(cartItem.price * qty).toLocaleString()} Kč
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.cartId)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-slate-500 font-medium block mb-1">
                Cena zboží celkem:
              </span>
              <span className="text-3xl font-black text-[#2a3b4c]">
                {cartTotal.toLocaleString()} Kč
              </span>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Pokračovat k objednávce <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
      <div className="lg:w-2/3">
        <button
          onClick={() => setStep(1)}
          className="mb-6 flex items-center text-sm font-bold text-slate-500 hover:text-green-600 transition w-fit"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Zpět do košíku
        </button>
        <h1 className="text-3xl font-bold text-[#2a3b4c] mb-8">
          Dokončení objednávky
        </h1>

        <form onSubmit={handleOrderSubmit} className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#2a3b4c]">
              <User className="w-5 h-5 text-green-600" /> Osobní údaje
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Jméno a příjmení
                </label>
                <input
                  name="fullName"
                  required
                  type="text"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Telefon
                </label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="+420 123 456 789"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  E-mail
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="jan.novak@email.cz"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-lg mb-4 text-[#2a3b4c]">
                {shipping === "dpd" || shipping === "packeta_address"
                  ? "Fakturační a doručovací adresa"
                  : "Fakturační adresa"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ulice a číslo popisné
                  </label>
                  <input
                    name="address"
                    required
                    type="text"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Nová 123/45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Město
                  </label>
                  <input
                    name="city"
                    required
                    type="text"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Praha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    PSČ
                  </label>
                  <input
                    name="zip"
                    required
                    type="text"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="110 00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#2a3b4c]">
              <Truck className="w-5 h-5 text-green-600" /> Způsob doručení
            </h2>
            <div className="space-y-3">
              {shippingOptions.map((option) => (
                <div key={option.id}>
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      shipping === option.id
                        ? "border-green-500 bg-green-50/50 ring-1 ring-green-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shipping === option.id}
                        onChange={() => setShipping(option.id)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <span className="font-bold text-slate-800">
                        {option.name}
                      </span>
                    </div>
                    <span className="font-bold text-slate-700">
                      {option.price === 0 ? "Zdarma" : `${option.price} Kč`}
                    </span>
                  </label>

                  {shipping === "packeta_point" &&
                    option.id === "packeta_point" && (
                      <div className="ml-8 mt-3 p-4 bg-slate-50 border border-slate-200 rounded-lg animate-in fade-in duration-300">
                        <button
                          type="button"
                          onClick={openPacketaWidget}
                          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition"
                        >
                          <MapPin className="w-5 h-5" /> Vybrat pobočku nebo
                          Z-BOX na mapě
                        </button>
                        {packetaPoint && (
                          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md font-medium flex items-center gap-2 border border-green-200">
                            <Check className="w-5 h-5 text-green-600" />{" "}
                            Vybráno: {packetaPoint.name}
                          </div>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#2a3b4c]">
              <CreditCard className="w-5 h-5 text-green-600" /> Způsob platby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentOptions.map((option) => {
                if (shipping === "pickup" && option.id === "cod") return null;
                return (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      payment === option.id
                        ? "border-green-500 bg-green-50/50 ring-1 ring-green-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={payment === option.id}
                        onChange={() => setPayment(option.id)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <span className="font-bold text-slate-800">
                        {option.name}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
            {payment === "cod" && (
              <div className="mt-3 text-sm text-amber-600 font-medium">
                Při platbě na dobírku je účtován poplatek 49 Kč.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting || (shipping === "packeta_point" && !packetaPoint)
            }
            className={`w-full py-4 text-white font-extrabold text-lg rounded-xl shadow-lg transition transform hover:scale-[1.01] ${
              isSubmitting || (shipping === "packeta_point" && !packetaPoint)
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting
              ? "Odesílám objednávku..."
              : shipping === "packeta_point" && !packetaPoint
              ? "Nejprve vyberte pobočku Zásilkovny"
              : "Závazně objednat"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/3">
        <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200 sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b pb-4 text-[#2a3b4c]">
            Shrnutí objednávky
          </h2>

          <div className="mb-6 space-y-4">
            {cart.map((cartItem) => {
              const qty = cartItem.quantity || 1;
              return (
                <div
                  key={cartItem.cartId}
                  className="flex justify-between items-start text-sm"
                >
                  <span className="text-slate-600 font-medium pr-4 leading-relaxed">
                    {qty}x{" "}
                    {cartItem.type === "single"
                      ? cartItem.product.name
                      : "Kompletní sada na míru"}
                  </span>
                  <span className="font-bold text-slate-800 whitespace-nowrap">
                    {(cartItem.price * qty).toLocaleString()} Kč
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 pt-6 pb-6 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Mezisoučet položek</span>
              <span className="font-bold text-slate-800">
                {cartTotal.toLocaleString()} Kč
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Doprava</span>
              <span className="font-bold text-slate-800">
                {selectedShipping.price === 0
                  ? "Zdarma"
                  : `${selectedShipping.price} Kč`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Platba</span>
              <span className="font-bold text-slate-800">
                {selectedPayment.price === 0
                  ? "Zdarma"
                  : `${selectedPayment.price} Kč`}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 flex justify-between items-end">
            <div>
              <span className="text-lg font-bold text-[#2a3b4c] block">
                Celkem k úhradě
              </span>
              <span className="text-xs text-slate-400">včetně DPH</span>
            </div>
            <span className="text-3xl font-black text-green-600">
              {finalTotal.toLocaleString()} Kč
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
