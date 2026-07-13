"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin/bookings");
    } catch {
      setError("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-900 rounded-2xl p-8 space-y-5 border border-neutral-800"
      >
        <h1 className="text-xl font-semibold text-white text-center">دخول الأدمن</h1>

        <div>
          <label className="text-sm text-neutral-400">الإيميل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-neutral-500"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
