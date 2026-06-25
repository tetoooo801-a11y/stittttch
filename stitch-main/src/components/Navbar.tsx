"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export const Navbar: React.FC = () => {
  const { toggleLanguage, language, t } = useLanguage();
  const { user, logout, loading: authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadCart = () => {
      api.cart
        .get()
        .then((res) => {
          const count = res.data.cart.items.reduce((s: number, i: any) => s + i.quantity, 0);
          setCartCount(count);
        })
        .catch(() => setCartCount(0));
    };
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const navLinkClass = "text-on-surface-variant hover:text-primary transition-all duration-300 hover:underline decoration-rose-gold decoration-2 underline-offset-[6px]";

  return (
    <nav
      className={`dark-invert fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/80 shadow-md py-4 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="font-headline-md text-3xl font-semibold text-on-surface hover:opacity-80 transition-opacity"
        >
          {language === "ar" ? "ستيتش" : "Stitch"}
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body-md text-sm uppercase tracking-widest text-primary">
          <Link href="/" className={navLinkClass}>{t("nav_home")}</Link>
          <Link href="/about" className={navLinkClass}>
            {t("nav_about")}
          </Link>

          <div
            className="relative"
            ref={servicesDropdownRef}
          >
            <button 
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`${navLinkClass} flex items-center gap-1 cursor-pointer`}
            >
              {t("nav_services")}
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 rtl:right-0 rtl:left-auto mt-2 w-48 bg-white/95 backdrop-blur-xl border border-outline-variant/30 rounded-xl shadow-2xl z-50 p-2">
                <Link href="/services/face" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_face")}</Link>
                <Link href="/services/hair" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_hair")}</Link>
                <Link href="/services/body" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_body")}</Link>
                <Link href="/services/specialty" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_specialty")}</Link>
                <Link href="/services" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("view_all")}</Link>
              </div>
            )}
          </div>

          <Link href="/book" className={navLinkClass}>{t("nav_booking")}</Link>
          <Link href="/contact" className={navLinkClass}>{t("nav_contact")}</Link>
        </div>

        <div className="flex items-center gap-4 text-primary">
          <Link href="/search" className="flex items-center justify-center hover:text-primary-container transition-colors cursor-pointer p-2">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </Link>

          <Link href="/cart" className="relative hover:text-primary-container transition-all p-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {!user && (
            <Link href="/signin" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary-container">
              {t("nav_signin")}
            </Link>
          )}

          {!authLoading && user && (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/bookings" className="text-xs uppercase tracking-widest hover:text-primary-container">
                {t("nav_my_bookings")}
              </Link>
              <span className="text-xs text-on-surface-variant normal-case tracking-normal">{user.name}</span>
              <button onClick={handleLogout} className="text-xs uppercase tracking-widest hover:text-primary-container cursor-pointer">
                {t("nav_logout")}
              </button>
            </div>
          )}

          {!authLoading && !user && (
            <Link href="/signup" className="hidden md:block text-xs uppercase tracking-widest bg-on-surface text-white px-4 py-2 rounded-full hover:bg-primary transition-colors">
              {t("nav_signup")}
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center hover:text-primary-container transition-colors cursor-pointer p-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 font-label-sm uppercase hover:text-primary-container transition-colors cursor-pointer p-2"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>{language === "en" ? "AR" : "EN"}</span>
          </button>

          <button
            className="md:hidden hover:text-primary transition-all duration-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-surface/95 backdrop-blur-2xl border-t border-outline-variant/30 py-6 px-8 flex flex-col gap-6 font-body-md text-sm uppercase tracking-widest shadow-2xl max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">{t("nav_home")}</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">{t("nav_about")}</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_services")}</Link>
          <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_booking")}</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_contact")}</Link>
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>{t("cart_title")}</Link>
          {user ? (
            <>
              <Link href="/bookings" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_my_bookings")}</Link>
              <button onClick={handleLogout} className="text-start cursor-pointer">{t("nav_logout")}</button>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_signin")}</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_signup")}</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
