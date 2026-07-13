"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-0 md:pt-[100px] transition-content bg-background relative">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img alt="Gallery Hero" className="w-full h-full object-cover object-center scale-105 blur-[2px]" src="https://lh3.googleusercontent.com/aida/AP1WRLvQDJv0HADN3V8EYees9a2KQrRzFnjRpITX2JnB6FDEhQg9KaGGEEV8a8ks5WGc7d8ijPt6ePEKJtvdfGnIE3qJloLmPHAL7hqMRZ5rK5XNql8rL6OATjzZ6kQNrldGa-enQxxyOgTpP_bXfSfBbZNMFYH1CwIOUTzlFzmtONVhIiJjiG2ZDintZ0eOUVyT0RAwrjCmYBQdAYR7j1r241iq53D5JZTZWr_BF0k4f_zHvw4eJ_ax6SzVdT6i"/>
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <span className="font-label-sm text-xs uppercase tracking-[0.4em] text-on-surface/60 dark:text-inverse-on-surface/60 mb-4 block">{t("gallery_subtitle")}</span>
          <h1 className="font-serif text-6xl md:text-[100px] text-on-surface dark:text-inverse-on-surface mb-6 font-medium italic leading-[1.1]">{t("gallery_title")}</h1>
          <p className="font-body-md text-base text-on-surface-variant dark:text-surface-variant max-w-lg mx-auto">{t("gallery_desc")}</p>
        </div>
      </section>

      {/* Filter and Heading */}
      <section className="pt-20 pb-12 px-6 md:px-10 max-w-7xl mx-auto text-center">
        <span className="font-label-sm text-xs uppercase tracking-[0.2em] text-on-surface/60 dark:text-inverse-on-surface/60 mb-3 block">{t("gallery_intro_pretitle")}</span>
        <h2 className="font-serif text-4xl md:text-5xl text-on-surface dark:text-inverse-on-surface mb-10 italic">{t("gallery_intro_title")}</h2>
        
        {/* Centered Pill Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button className="px-8 py-2 rounded-full bg-on-surface text-surface dark:bg-inverse-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest transition-all">{t("filter_all")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_hair")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_skin")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_massage")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_nails")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_bridal")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_makeup")}</button>
          <button className="px-8 py-2 rounded-full bg-surface-container-high dark:bg-surface-dim text-on-surface dark:text-inverse-on-surface font-label-sm text-xs uppercase tracking-widest hover:bg-secondary-container dark:hover:bg-inverse-surface transition-all">{t("filter_spa")}</button>
        </div>
      </section>

      {/* Gallery Grid / Carousel Section */}
      <section className="pb-[120px] px-6 md:px-10 max-w-[1440px] mx-auto relative">
        <div className="flex items-center gap-6 overflow-hidden">
          {/* Navigation Arrow Left */}
          <button className="hidden md:flex flex-none w-12 h-12 rounded-full border border-outline-variant items-center justify-center hover:bg-surface-container-high dark:hover:bg-surface-dim transition-colors">
            <span className="material-symbols-outlined text-on-surface dark:text-inverse-on-surface text-xl rtl:rotate-180">arrow_back</span>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="aspect-[4/5] rounded-xl overflow-hidden group">
              <img alt="Salon Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLv2APULV7PKtpOYb5PZRx8EUbo17NgV0LWXspETOC0-tSjmnOIRir3CtjUXA4qCBnvM1UDJzLkS9QmaVojsVa3N6o6hHa780qHGiRJKI95_nk2aAOWBv6lR4ecRV-xkh8QGHalIl1vR9g7ja_SrF-1pHOxOtHA19CZHqDrfLfvr7GcPA5bYFBYaMd-XiktQNgeXHOs4FBMVWiSeD5sxocAs5pT7vERWBD9sVeduwDAnT1TBq58apfLaQb6v"/>
            </div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden group">
              <img alt="Treatment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLvQDJv0HADN3V8EYees9a2KQrRzFnjRpITX2JnB6FDEhQg9KaGGEEV8a8ks5WGc7d8ijPt6ePEKJtvdfGnIE3qJloLmPHAL7hqMRZ5rK5XNql8rL6OATjzZ6kQNrldGa-enQxxyOgTpP_bXfSfBbZNMFYH1CwIOUTzlFzmtONVhIiJjiG2ZDintZ0eOUVyT0RAwrjCmYBQdAYR7j1r241iq53D5JZTZWr_BF0k4f_zHvw4eJ_ax6SzVdT6i"/>
            </div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden group">
              <img alt="Spa Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLuuiqfURlfI8go8MTs4JmiEgr0rKn9gNtOhTHXROSdeOrDT4pxcbkOajYz-M7h-3m7BdkDwxjPpuml8EpBYst5hilmPBGNu2wFipxoOk6PP_kHUml_DGRUht1fA0HqOyPBJmr1RDfN2-Wj8SNBTewuKu-wAIvVGmcUbDc4S1FyBdfLlAa9OrVizTxT2mausV1QJwRmF1Y_HtrQ0ecgvTlgc_VBAQDjggujwV3pySl1Opi3Srijysi9Ns87o"/>
            </div>
          </div>
          
          {/* Navigation Arrow Right */}
          <button className="hidden md:flex flex-none w-12 h-12 rounded-full border border-outline-variant items-center justify-center hover:bg-surface-container-high dark:hover:bg-surface-dim transition-colors">
            <span className="material-symbols-outlined text-on-surface dark:text-inverse-on-surface text-xl rtl:rotate-180">arrow_forward</span>
          </button>
        </div>
        
        {/* Carousel Pagination Dots */}
        <div className="flex justify-center mt-10 gap-2">
          <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
          <span className="w-2 h-2 rounded-full bg-on-surface dark:bg-inverse-on-surface"></span>
          <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="py-12 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="relative w-full h-auto min-h-[400px] rounded-[2rem] overflow-hidden shadow-sm bg-surface-container-low dark:bg-surface-dim flex flex-col md:flex-row items-center">
          <div className="absolute inset-0 w-full h-full opacity-30">
            <img alt="Background Pattern" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLuuiqfURlfI8go8MTs4JmiEgr0rKn9gNtOhTHXROSdeOrDT4pxcbkOajYz-M7h-3m7BdkDwxjPpuml8EpBYst5hilmPBGNu2wFipxoOk6PP_kHUml_DGRUht1fA0HqOyPBJmr1RDfN2-Wj8SNBTewuKu-wAIvVGmcUbDc4S1FyBdfLlAa9OrVizTxT2mausV1QJwRmF1Y_HtrQ0ecgvTlgc_VBAQDjggujwV3pySl1Opi3Srijysi9Ns87o"/>
          </div>
          <div className="relative z-10 w-full px-8 md:px-20 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right">
              <div className="w-16 h-16 bg-white dark:bg-inverse-surface rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-3xl">calendar_month</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-on-surface dark:text-inverse-on-surface mb-2">{t("gallery_cta_title")}</h2>
              <p className="font-body-md text-on-surface-variant dark:text-surface-variant">{t("gallery_cta_desc")}</p>
            </div>
            <Link href="/book" className="bg-on-surface text-surface dark:bg-inverse-on-surface dark:text-inverse-surface px-10 py-4 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-inverse-primary transition-all flex items-center gap-3 shadow-md group">
              {t("gallery_cta_btn")} <span className="material-symbols-outlined text-sm rtl:rotate-180 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
