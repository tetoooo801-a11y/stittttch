"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { api, Service, serviceTitle, serviceDesc, ApiError } from "@/lib/api";

export default function SearchPage() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.services
      .list()
      .then((res) => setServices(res.data.services))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (serviceId: string) => {
    setAddingId(serviceId);
    try {
      await api.cart.add(serviceId);
      window.dispatchEvent(new Event("cart-updated"));
      setAddedId(serviceId);
      setTimeout(() => setAddedId(null), 2000);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : t("error_loading"));
    } finally {
      setAddingId(null);
    }
  };

  const filteredServices = services.filter((s) => {
    const q = query.toLowerCase();
    const titleEn = s.titleEn?.toLowerCase() || "";
    const titleAr = s.titleAr?.toLowerCase() || "";
    const descEn = s.descEn?.toLowerCase() || "";
    const descAr = s.descAr?.toLowerCase() || "";
    return titleEn.includes(q) || titleAr.includes(q) || descEn.includes(q) || descAr.includes(q);
  });

  return (
    <div className="pt-[140px] md:pt-[160px] pb-24 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-on-surface-variant text-2xl ${language === "ar" ? "right-6" : "left-6"}`}>
              search
            </span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === "ar" ? "ابحث عن خدمة، علاج، أو منتج..." : "Search for a service, treatment, or product..."}
              className="w-full bg-surface-container-low text-on-surface font-body-lg text-lg py-6 rounded-full border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors shadow-sm"
              style={{ paddingLeft: language === "ar" ? "24px" : "64px", paddingRight: language === "ar" ? "64px" : "24px" }}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-on-surface-variant py-12">{t("loading")}</p>
        ) : query && filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
            <h2 className="font-headline-md text-2xl text-on-surface mb-2">
              {language === "ar" ? "لم نجد أي نتائج" : "No results found"}
            </h2>
            <p className="text-on-surface-variant">
              {language === "ar" ? "حاول البحث بكلمات مختلفة أو تصفح الخدمات المتاحة." : "Try searching with different keywords or browse our services."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
            {filteredServices.map((product) => (
              <div key={product._id} className="group flex flex-col">
                <div className="relative bg-surface-container-low rounded-xl aspect-[3/4] mb-6 overflow-hidden img-zoom-container cursor-pointer">
                  {product.badgeKey && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {product.badgeKey}
                    </div>
                  )}
                  <Link href={`/services/treatment-details?id=${product._id}`}>
                    <img
                      alt={serviceTitle(product, language, t)}
                      className="w-full h-full object-cover img-zoom"
                      src={product.imageUrl}
                    />
                  </Link>
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex gap-2">
                    <Link
                      href={`/book?serviceId=${product._id}`}
                      className="flex-1 bg-on-surface text-white font-label-sm text-center text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary transition-colors"
                    >
                      {t("book_now")}
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={addingId === product._id || addedId === product._id}
                      className={`flex-1 font-label-sm text-xs uppercase py-3 rounded-lg transition-colors cursor-pointer ${
                        addedId === product._id 
                          ? "bg-green-700 text-white disabled:opacity-100" 
                          : "bg-primary text-white hover:bg-on-surface disabled:opacity-60"
                      }`}
                    >
                      {addingId === product._id ? "..." : addedId === product._id ? `✓ ${language === "ar" ? "تم" : "Added"}` : t("add_to_cart")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: `"FILL" ${i < Math.floor(product.rating) ? 1 : 0}` }}
                      >
                        {i < Math.floor(product.rating) ? "star" : "star_border"}
                      </span>
                    ))}
                    <span className="font-body-md text-xs text-on-surface-variant ml-1">({product.reviewsCount})</span>
                  </div>
                  <Link href={`/services/treatment-details?id=${product._id}`}>
                    <h4 className="font-headline-md text-lg leading-tight text-on-surface mb-1 hover:text-primary transition-colors">
                      {serviceTitle(product, language, t)}
                    </h4>
                  </Link>
                  <p className="font-body-md text-xs text-on-surface-variant mb-3 flex-grow line-clamp-2">
                    {serviceDesc(product, language, t)}
                  </p>
                  <p className="font-body-lg text-sm font-semibold text-on-surface">
                    {product.duration} Mins | ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
