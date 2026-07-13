"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api, Booking, serviceTitle } from "@/lib/api";

const statusLabels: Record<string, { en: string; ar: string }> = {
  draft: { en: "Draft", ar: "مسودة" },
  pending_deposit: { en: "Pending Deposit", ar: "في انتظار العربون" },
  pending: { en: "Pending Confirmation", ar: "في انتظار التأكيد" },
  confirmed: { en: "Confirmed", ar: "مؤكد" },
  cancelled: { en: "Cancelled", ar: "ملغي" },
};

export default function MyBookingsPage() {
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/signin");
      return;
    }
    api.bookings
      .mine()
      .then((res) => setBookings(res.data.bookings))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [user, authLoading, router, t]);

  const statusLabel = (status: string) => {
    const labels = statusLabels[status];
    if (!labels) return status;
    return language === "ar" ? labels.ar : labels.en;
  };

  if (authLoading || loading) {
    return <div className="pt-[120px] pb-24 text-center text-on-surface-variant">{t("loading")}</div>;
  }

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 max-w-4xl mx-auto px-6">
      <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-2">{t("my_bookings")}</h1>
      <p className="font-body-md text-sm text-on-surface-variant mb-10">{t("my_bookings_subtitle")}</p>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      {!bookings.length ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-on-surface-variant mb-6">{t("my_bookings_empty")}</p>
          <Link
            href="/book"
            className="text-primary underline text-sm uppercase tracking-widest"
          >
            {t("hero_book")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
              <img
                src={booking.service.imageUrl}
                alt={serviceTitle(booking.service, language, t)}
                className="w-full sm:w-28 h-32 sm:h-28 object-cover rounded-xl shrink-0"
              />
              <div className="flex-grow">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="font-headline-md text-lg">{serviceTitle(booking.service, language, t)}</h3>
                  <span className="text-xs uppercase tracking-widest bg-secondary-container px-3 py-1 rounded-full">
                    {statusLabel(booking.status)}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mb-1">
                  #{booking.reference} · {booking.date} · {booking.time}
                </p>
                <p className="text-sm font-semibold">${booking.total.toFixed(2)}</p>
                {booking.status === "pending_deposit" && (
                  <Link
                    href={`/book/deposit?id=${booking._id}`}
                    className="inline-block mt-4 text-xs uppercase tracking-widest text-primary underline"
                  >
                    {t("checkout")}
                  </Link>
                )}
                {booking.status === "confirmed" && (
                  <Link
                    href={`/book/confirmed?id=${booking._id}`}
                    className="inline-block mt-4 text-xs uppercase tracking-widest text-primary underline"
                  >
                    {t("confirm_title")}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
