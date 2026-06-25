"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-0 md:pt-[140px] pb-[120px] transition-content bg-background relative">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[1600px] mx-auto min-h-screen md:min-h-[80vh] flex flex-col justify-center mb-[100px] md:mb-[160px] overflow-hidden pt-24 md:pt-0">
        {/* Split Background (Desktop) / Full Background (Mobile) */}
        <div className="absolute inset-0 flex flex-col md:flex-row bg-surface">
          {/* Mobile Image BG */}
          <div className="md:hidden absolute inset-0">
             <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80" alt="Salon" className="w-full h-full object-cover opacity-80 blur-[1px]" />
             <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface"></div>
          </div>
          
          {/* Desktop Left Half bg-surface */}
          <div className="hidden md:block w-full md:w-1/2 h-full bg-surface"></div>
          {/* Desktop Right Half Image */}
          <div className="w-full h-full md:w-1/2 relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80"
              alt="Salon Background"
              className="w-full h-full object-cover opacity-60 blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mt-4 md:mt-10">
          
          {/* Left Card (Mobile Glass Card) */}
          <div className="glass-card bg-white/60 md:bg-white/70 backdrop-blur-3xl rounded-[40px] py-16 px-8 md:p-12 max-w-lg w-full transform transition hover:-translate-y-1 duration-500 flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right border border-white/50 shadow-2xl">
            <h3 className="text-on-surface-variant font-label-sm uppercase tracking-[0.2em] font-bold mb-4 md:mb-6 text-[10px] md:text-xs">
              DISCOVER YOUR BEST SELF
            </h3>
            <h1 className="font-headline-md text-4xl md:text-5xl text-on-surface leading-tight mb-4 md:mb-6">
              Your Beauty, <br />
              <span className="italic font-light">
                Our Passion
              </span>
            </h1>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed mb-8 md:mb-10 text-center md:text-left rtl:md:text-right px-2 md:px-0">
              Inspired by you and created to bring out your natural beauty. Experience sophisticated self-care redefined.
            </p>
            
            <div className="flex flex-col items-center gap-4 mb-8 md:mb-10 w-full">
              <Link
                href="/book"
                className="w-full justify-center bg-[#6f6050] text-white px-8 py-4 rounded-full font-label-sm text-[11px] hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 shadow-md uppercase tracking-widest font-bold flex items-center"
              >
                BOOK APPOINTMENT
              </Link>
              <Link
                href="/services"
                className="w-full justify-center bg-white/90 text-on-surface px-8 py-4 rounded-full font-label-sm text-[11px] hover:bg-surface-container transition-colors duration-300 shadow-sm uppercase tracking-widest font-bold border border-outline-variant/30 flex items-center text-center"
              >
                EXPLORE SERVICES
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 w-full pt-2">
              <div className="flex -space-x-3 rtl:space-x-reverse justify-center">
                <img className="w-12 h-12 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100" alt="Client 1"/>
                <img className="w-12 h-12 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="Client 2"/>
                <img className="w-12 h-12 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="Client 3"/>
                <div className="w-12 h-12 rounded-full border-[3px] border-white bg-[#1a1c1b] text-white flex items-center justify-center text-[10px] font-bold shadow-sm z-10">+500</div>
              </div>
              <p className="text-[9px] text-on-surface-variant uppercase font-label-sm tracking-widest mt-3 font-semibold">TRUSTED BY 500+ HAPPY CLIENTS</p>
            </div>
          </div>

          {/* Right Card (Desktop only, hidden on mobile to match design) */}
          <div className="hidden md:block glass-card rounded-[32px] p-4 max-w-sm w-full relative transform transition hover:-translate-y-2 duration-500 mt-8 md:mt-0">
             <div className="absolute top-8 right-8 rtl:left-8 rtl:right-auto z-20 bg-on-surface backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-semibold font-label-sm">
               -15% OFF
             </div>
             <img
               src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
               alt="Signature Facial"
               className="w-full h-80 object-cover rounded-[24px] mb-6"
             />
             <div className="px-4 pb-4">
               <h3 className="font-headline-md text-2xl text-on-surface mb-1 font-medium">Signature Facial</h3>
               <p className="text-xs text-on-surface-variant mb-6 font-body-md">Luminous Renewal Serum</p>
               <Link href="/services/face" className="flex items-center justify-between text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors font-label-sm">
                 SHOP NOW
                 <div className="w-8 h-8 rounded-full border border-rose-gold flex items-center justify-center bg-white shadow-sm">
                   <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                 </div>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE COLLECTION (Mobile Featured Treatment) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-[100px] md:mb-[160px]">
        <div className="text-center md:text-left rtl:md:text-right mb-8">
           <h4 className="font-label-sm text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3 font-semibold">SIGNATURE COLLECTION</h4>
           <h2 className="font-headline-md text-4xl text-on-surface">Featured Treatment</h2>
        </div>
        <div className="relative w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-xl group">
          <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" alt="Facial" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
            <div>
              <h3 className="font-headline-md text-4xl text-white mb-3 leading-tight">Signature<br/>Facial</h3>
              <p className="font-label-sm text-[10px] font-bold uppercase tracking-widest text-white/90">60 MINUTES OF PURE BLISS</p>
            </div>
            <Link href="/services/face" className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-[100px] md:mb-[160px]">
        <div className="text-center mb-10">
          <h2 className="font-headline-md text-4xl text-on-surface mb-4">OUR SERVICES</h2>
          <p className="font-body-md text-on-surface-variant text-sm">Bespoke care for every part of you.</p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-4 md:gap-6">
          {/* Face */}
          <Link href="/services/face" className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group shadow-xl hover:-translate-y-1 transition-transform z-40">
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80" alt="Face" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-6 left-6 flex items-center justify-between w-[calc(100%-48px)]">
               <div className="bg-white/40 backdrop-blur-lg rounded-full px-8 py-3 border border-white/50 shadow-sm">
                 <span className="font-headline-md text-white text-2xl">Face</span>
               </div>
               <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">arrow_forward</span>
            </div>
          </Link>
          {/* Hair */}
          <Link href="/services/hair" className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group shadow-xl hover:-translate-y-1 transition-transform -mt-24 md:mt-0 z-30">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" alt="Hair" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-6 left-6 flex items-center justify-between w-[calc(100%-48px)]">
               <div className="bg-white/40 backdrop-blur-lg rounded-full px-8 py-3 border border-white/50 shadow-sm">
                 <span className="font-headline-md text-white text-2xl">Hair</span>
               </div>
               <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">arrow_forward</span>
            </div>
          </Link>
          {/* Body */}
          <Link href="/services/body" className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group shadow-xl hover:-translate-y-1 transition-transform -mt-24 md:mt-0 z-20">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80" alt="Body" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-6 left-6 flex items-center justify-between w-[calc(100%-48px)]">
               <div className="bg-white/40 backdrop-blur-lg rounded-full px-8 py-3 border border-white/50 shadow-sm">
                 <span className="font-headline-md text-white text-2xl">Body</span>
               </div>
               <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">arrow_forward</span>
            </div>
          </Link>
          {/* Other */}
          <Link href="/services/specialty" className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group shadow-xl hover:-translate-y-1 transition-transform -mt-24 md:mt-0 z-10">
            <img src="https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=600&q=80" alt="Other" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-6 left-6 flex items-center justify-between w-[calc(100%-48px)]">
               <div className="bg-white/40 backdrop-blur-lg rounded-full px-8 py-3 border border-white/50 shadow-sm">
                 <span className="font-headline-md text-white text-2xl">Other</span>
               </div>
               <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">arrow_forward</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-[800px] mx-auto px-6 text-center mb-[100px] flex flex-col items-center">
        <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-6 opacity-60">local_florist</span>
        <p className="font-headline-md text-3xl md:text-4xl italic text-on-surface leading-snug mb-8">
          "The brand's goal is to give a feeling of luxury spa care without being over the top."
        </p>
        <Link href="/about" className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold border-b border-outline-variant pb-1 hover:text-primary hover:border-primary transition-colors">
          LEARN MORE
        </Link>
      </section>
    </div>
  );
}
