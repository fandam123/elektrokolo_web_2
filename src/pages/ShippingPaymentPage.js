import React from "react";
import { Truck, ShoppingBag } from "lucide-react";

const ShippingPaymentPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
    <h1 className="text-3xl md:text-4xl font-bold text-[#2a3b4c] mb-12">
      Doprava a platba
    </h1>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Truck className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-6">Možnosti dopravy</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">DPD Kurýr (Sady bez montáže)</span>{" "}
            <span className="font-bold">149 Kč</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Osobní odběr Praha (Po domluvě)</span>{" "}
            <span className="font-bold text-green-600">Zdarma</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-6">Způsoby platby</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Bankovní převod předem</span>{" "}
            <span className="font-bold text-green-600">Zdarma</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Dobírka (Platba kurýrovi)</span>{" "}
            <span className="font-bold">49 Kč</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">
              Hotově / Kartou při osobním odběru
            </span>{" "}
            <span className="font-bold text-green-600">Zdarma</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ShippingPaymentPage;
