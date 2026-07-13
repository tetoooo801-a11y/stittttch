"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user || user.role !== "admin") {
      router.push("/admin");
    }
  }, [user, loading, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-400">
        جاري التحقق...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <nav className="border-b border-neutral-800 px-6 py-4 flex gap-6">
        <a href="/admin/bookings" className="text-neutral-300 hover:text-white text-sm">
          الحجوزات
        </a>
        <a href="/admin/content" className="text-neutral-300 hover:text-white text-sm">
          المحتوى
        </a>
      </nav>
      {children}
    </div>
  );
}
