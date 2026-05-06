import React from "react";
import { Settings, Star, ShieldCheck, Zap, Heart, User } from "lucide-react";

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a3b4c] mb-6">
        O nás
      </h1>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Jsme <span className="font-bold text-green-600">ElektroKit.cz</span> –
        parta nadšenců do cyklistiky a moderních technologií. Věříme, že
        špičkové elektrokolo nemusí stát majlant.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
      <div>
        <h2 className="text-3xl font-bold text-[#2a3b4c] mb-6">
          Kdo jsme a jak to začalo
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
          <p>
            Na začátku byla jednoduchá myšlenka:{" "}
            <strong>
              Proč vyhazovat skvělé jízdní kolo jen proto, že mu chybí motor?
            </strong>{" "}
            Když jsme si poprvé sami přestavěli svá kola, byli jsme ohromeni
            výkonem a dojezdem, který hravě překonal i mnohem dražší tovární
            e-kola.
          </p>
          <p>
            Z osobní vášně se brzy stal projekt, jehož cílem je zpřístupnit
            kvalitní elektrocyklistiku úplně každému. Od té doby jsme pomohli
            stovkám zákazníků vdechnout jejich starým kolům nový, elektrický
            život.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
          <Settings className="w-8 h-8 text-green-500 mb-3" />
          <div className="text-3xl md:text-4xl font-black text-slate-800 mb-1">
            1000+
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Prodaných sad
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-200 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
          <Star className="w-8 h-8 text-amber-500 mb-3 fill-current" />
          <div className="text-3xl md:text-4xl font-black text-green-700 mb-1">
            99 %
          </div>
          <div className="text-sm text-green-800 font-medium">
            Spokojených cyklistů
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl text-center border border-slate-700 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
          <ShieldCheck className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-3xl md:text-4xl font-black text-white mb-1">
            2 roky
          </div>
          <div className="text-sm text-slate-300 font-medium">
            Záruka a servis
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
          <Zap className="w-8 h-8 text-green-500 mb-3" />
          <div className="text-3xl md:text-4xl font-black text-slate-800 mb-1">
            Až 1kW
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Extrémní výkon
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-800 rounded-3xl p-8 md:p-12 mb-20 shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Naše mise a hodnoty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Maximální výkon</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Nabízíme pouze prověřené a silné komponenty, které vás nezklamou ani
            v tom nejprudším kopci a prodlouží váš dojezd na maximum.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Ekologie a udržitelnost</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Nevyhazujte své oblíbené staré kolo. Jeho přestavbou šetříte nejen
            svou peněženku, ale i životní prostředí a přírodní zdroje.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Férový přístup</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Jsme tu pro vás. Poradíme s výběrem sady, pomůžeme s instalací a
            postavíme se čelem k případným záručním opravám.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
