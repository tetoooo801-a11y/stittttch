"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingBookingButton: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <>
      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[360px] bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] px-6 py-3 flex justify-between items-center border border-outline-variant/20">
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">spa</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">star</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        </button>
        <button className="w-8 h-8 rounded-full bg-on-surface text-white flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
        </button>
      </div>

      {/* Floating Booking Button */}
      <Link
        href="/book"
        className={`dark-invert fixed bottom-[90px] md:bottom-8 w-14 h-14 bg-[#6f6050] text-white rounded-full flex justify-center items-center shadow-2xl hover:scale-110 active:scale-95 transition-transform z-50 group ${
          dir === "rtl" ? "left-6 md:left-8" : "right-6 md:right-8"
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">event_available</span>
      </Link>
    </>
  );
};
