"use client";
import { useEffect, useState } from "react";
import { api, Booking } from "@/lib/api";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.bookings.allAdmin(filter || undefined);
      setBookings(res.data.bookings);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleConfirm = async (id: string) => {
    await api.bookings.confirm(id);
    load();
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt("سبب الرفض (اختياري):") || "";
    await api.bookings.reject(id, reason);
    load();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-lg font-semibold">الحجوزات</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-neutral-800 text-white text-sm rounded-lg px-3 py-2 border border-neutral-700"
        >
          <option value="">كل الحالات</option>
          <option value="pending_deposit">قيد الانتظار</option>
          <option value="confirmed">مؤكد</option>
          <option value="rejected">مرفوض</option>
        </select>
      </div>

      {loading ? (
        <p className="text-neutral-400">جاري التحميل...</p>
      ) : bookings.length === 0 ? (
        <p className="text-neutral-400">مفيش حجوزات</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">{b.customerName}</p>
                <p className="text-neutral-400 text-sm">
                  {b.service?.titleEn} · {b.date} {b.time}
                </p>
                <p className="text-neutral-500 text-xs">{b.customerPhone} · {b.customerEmail}</p>
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    b.status === "confirmed"
                      ? "bg-green-900 text-green-300"
                      : b.status === "rejected"
                      ? "bg-red-900 text-red-300"
                      : "bg-yellow-900 text-yellow-300"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {b.status === "pending_deposit" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfirm(b._id)}
                    className="px-3 py-1.5 rounded-lg bg-green-700 text-white text-sm hover:bg-green-600"
                  >
                    قبول
                  </button>
                  <button
                    onClick={() => handleReject(b._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-sm hover:bg-red-600"
                  >
                    رفض
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
