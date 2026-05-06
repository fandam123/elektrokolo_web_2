import React, { useState } from "react";
import { MessageCircle, X, Check, Send } from "lucide-react";

const QuickContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setIsSent(false), 300);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[90vw] max-w-[320px] mb-4 overflow-hidden transition-all transform origin-bottom-right">
          <div className="bg-[#2a3b4c] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-400" /> Rychlý dotaz
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5">
            {isSent ? (
              <div className="text-center py-6 animate-pulse">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800">Zpráva odeslána</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Brzy se vám ozveme zpět.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Váš e-mail
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition"
                    placeholder="vas@email.cz"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Dotaz
                  </label>
                  <textarea
                    required
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none min-h-[100px] resize-none transition"
                    placeholder="S čím vám můžeme pomoci?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" /> Odeslat dotaz
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 z-50 ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-700 text-white rotate-90"
            : "bg-green-600 hover:bg-green-500 text-white hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 -rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>
    </div>
  );
};

export default QuickContactWidget;
