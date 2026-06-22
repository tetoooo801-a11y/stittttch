"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { api, EditorialPost } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditorialDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, language } = useLanguage();
  const [post, setPost] = useState<EditorialPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api.editorial
      .get(slug)
      .then((res) => setPost(res.data.post))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [slug, t]);

  const getTitle = (p: EditorialPost) => {
    if (language === "ar" && p.titleAr) return p.titleAr;
    const translated = t(p.titleKey);
    return translated !== p.titleKey ? translated : p.titleEn;
  };

  const getDesc = (p: EditorialPost) =>
    language === "ar" && p.descAr ? p.descAr : p.descEn;

  if (loading) {
    return <div className="pt-[120px] pb-24 text-center text-on-surface-variant">{t("loading")}</div>;
  }

  if (error || !post) {
    return <div className="pt-[120px] pb-24 text-center text-red-600">{error || t("error_loading")}</div>;
  }

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <article className="max-w-[900px] mx-auto px-6 md:px-10">
        <Link
          href="/editorial"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm text-xs uppercase tracking-widest mb-8"
        >
          <span className="material-symbols-outlined text-[18px] rtl:rotate-180">arrow_back</span>
          {t("back_to_editorial")}
        </Link>

        <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-semibold block mb-4">
          {post.readTime}
        </span>
        <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-8 leading-tight">
          {getTitle(post)}
        </h1>

        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg mb-12">
          <img alt={getTitle(post)} className="w-full h-full object-cover" src={post.imageUrl} />
        </div>

        <div className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed space-y-6">
          <p>{getDesc(post)}</p>
          <p>
            {language === "ar"
              ? "في ستيتش، نؤمن بأن العناية بالبشرة ليست مجرد روتين — بل طقس يعيد الاتصال بالذات. كل منتج وكل جلسة علاجية مصممة بعناية لتمنحك تجربة فاخرة هادئة."
              : "At Stitch, we believe skincare is more than a routine — it is a ritual that reconnects you with yourself. Every product and treatment is thoughtfully designed to deliver a calm, luxurious experience."}
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link
            href="/services"
            className="bg-on-surface text-white px-8 py-3 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-colors"
          >
            {t("hero_services")}
          </Link>
          <Link
            href="/book"
            className="border border-outline-variant px-8 py-3 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-surface-container transition-colors"
          >
            {t("hero_book")}
          </Link>
        </div>
      </article>
    </div>
  );
}
