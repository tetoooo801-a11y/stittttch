"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 transition-content">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1600px] mx-auto min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center mb-24 overflow-hidden">
        {/* Split Background */}
        <div className="absolute inset-0 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f9f8f6]"></div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80"
              alt="Salon Background"
              className="w-full h-full object-cover opacity-60 blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9f8f6] via-transparent to-transparent hidden md:block"></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-12 mt-10">
          
          {/* Left Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-8 md:p-12 shadow-2xl max-w-lg w-full transform transition hover:-translate-y-1 duration-500">
            <h3 className="text-on-surface-variant text-xs uppercase tracking-[0.3em] font-semibold mb-6">
              {t("home_discover")}
            </h3>
            <h1 className="font-headline-lg text-4xl md:text-5xl text-on-surface leading-tight mb-6">
              {t("home_passion").split(",")[0]}, <br />
              <span className="italic font-serif text-primary">
                {t("home_passion").split(",")[1]}
              </span>
            </h1>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed mb-10">
              {t("home_inspired")}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/book"
                className="bg-[#6b5a4d] text-white px-8 py-3.5 rounded-full font-body-md text-sm hover:bg-[#5a4a3e] transition-colors duration-300 shadow-md flex items-center gap-2"
              >
                {t("hero_book")}
                <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
              <Link
                href="/services"
                className="border border-outline text-on-surface px-8 py-3.5 rounded-full font-body-md text-sm hover:bg-surface-container transition-colors duration-300"
              >
                {t("home_explore")}
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/30">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100" alt="Client 1"/>
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="Client 2"/>
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="Client 3"/>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold">+500</div>
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase">{t("home_trusted")}</p>
                <p className="text-xs font-bold text-on-surface">{t("home_clients")} ✨</p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-4 shadow-2xl max-w-sm w-full relative transform transition hover:-translate-y-2 duration-500">
            <div className="absolute top-8 right-8 rtl:left-8 rtl:right-auto z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-semibold">
              -15% OFF
            </div>
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
              alt="Signature Facial"
              className="w-full h-80 object-cover rounded-[32px] mb-6"
            />
            <div className="px-4 pb-4">
              <h3 className="font-headline-md text-2xl text-on-surface mb-1">Signature Facial</h3>
              <p className="text-xs text-on-surface-variant mb-6">Luminous Renewal Serum</p>
              <Link href="/services/face" className="flex items-center justify-between text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
                SHOP NOW
                <div className="w-8 h-8 rounded-full border border-outline flex items-center justify-center bg-white shadow-sm">
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </Link>
            </div>
          </div>
          
        </div>

        {/* Floating Bottom Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-4xl hidden lg:flex items-center justify-between bg-white/90 backdrop-blur-lg rounded-full py-4 px-8 shadow-xl">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-[16px] text-primary">spa</span>
             <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">{t("home_premium")}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-[16px] text-primary">diversity_1</span>
             <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">{t("home_specialists")}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-[16px] text-primary">stars</span>
             <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">{t("home_luxury")}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
             <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">{t("home_easy")}</span>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-on-surface text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
          </div>
        </div>

        {/* Floating Calendar Button (Bottom Right) */}
        <Link href="/book" className="absolute bottom-10 right-10 rtl:left-10 rtl:right-auto z-20 w-14 h-14 bg-[#eadbce] rounded-full flex items-center justify-center shadow-xl hover:bg-[#dccbc0] transition-colors duration-300">
           <span className="material-symbols-outlined text-on-surface">calendar_month</span>
        </Link>
      </section>

      {/* Brand Mission Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-32 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-3">
            <h2 className="font-label-sm uppercase tracking-[0.3em] text-sm text-on-surface font-bold">
              BRAND MISSION
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-6">
            <p className="font-body-lg text-lg md:text-xl text-on-surface leading-relaxed mb-8 font-serif">
              The brand's goal is to give a feeling of luxury spa care without being over the top. We want to focus on the skincare experience and packaging should not be distracting.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-outline text-on-surface px-8 py-3 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-surface-container transition-colors"
            >
              {t("home_learn_more") || "LEARN MORE"}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-12" id="services">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category - Body */}
          <Link
            href="/services/body"
            className="rounded-[32px] hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[500px] relative overflow-hidden shadow-lg"
          >
            <img
              alt="Body Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
            <div className="relative z-10 p-8">
              <span className="font-label-sm text-sm uppercase tracking-[0.2em] text-white font-semibold shadow-black drop-shadow-md">
                [ BODY ]
              </span>
            </div>
          </Link>

          {/* Category - Face */}
          <Link
            href="/services/face"
            className="rounded-[32px] hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[500px] relative overflow-hidden shadow-lg"
          >
            <img
              alt="Face Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
            <div className="relative z-10 p-8">
              <span className="font-label-sm text-sm uppercase tracking-[0.2em] text-white font-semibold shadow-black drop-shadow-md">
                [ {t("cat_face")} ]
              </span>
            </div>
          </Link>

          {/* Category - Hair */}
          <Link
            href="/services/hair"
            className="rounded-[32px] hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[500px] relative overflow-hidden shadow-lg"
          >
            <img
              alt="Hair Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
            <div className="relative z-10 p-8">
              <span className="font-label-sm text-sm uppercase tracking-[0.2em] text-white font-semibold shadow-black drop-shadow-md">
                [ HAIR ]
              </span>
            </div>
          </Link>

          {/* Category - Other / Specialty */}
          <Link
            href="/services/specialty"
            className="rounded-[32px] hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[500px] relative overflow-hidden shadow-lg"
          >
            <img
              alt="Other Specialty"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
            <div className="relative z-10 p-8 flex justify-between">
              <span className="font-label-sm text-sm uppercase tracking-[0.2em] text-white font-semibold shadow-black drop-shadow-md">
                [ OTHER ]
              </span>
            </div>
            <div className="absolute bottom-8 left-8 rtl:left-auto rtl:right-8 z-10">
              <span className="font-headline-md text-lg text-white/90 transform -rotate-90 rtl:rotate-90 origin-bottom-left rtl:origin-bottom-right inline-block uppercase tracking-widest font-semibold">
                {language === "ar" ? "الفعل" : "the act"}
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
