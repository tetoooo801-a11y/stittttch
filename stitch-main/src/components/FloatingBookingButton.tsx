"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingBookingButton: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <Link
      href="/book"
      className={`dark-invert fixed bottom-8 w-16 h-16 bg-rose-gold text-on-surface rounded-full flex justify-center items-center shadow-2xl hover:scale-110 active:scale-95 transition-transform z-50 group ${
        dir === "rtl" ? "left-8" : "right-8"
      }`}
    >
      <svg className="w-8 h-8 group-hover:animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </Link>
  );
};
