"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full py-16 md:py-20 px-6 md:px-10 bg-background transition-colors pb-32 md:pb-16">
      <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto text-center">
        {/* Brand Logo */}
        <div className="font-headline-md text-4xl text-on-surface mb-8 tracking-wide">
          {language === "ar" ? "ستيتش" : "STITCH"}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-8">
          <Link href="#" className="hover:text-primary transition-colors">
            PRIVACY
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            TERMS
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            ACCESSIBILITY
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            CAREERS
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="font-label-sm text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/70">
          © 2024 STITCH CLINIC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
