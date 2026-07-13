"use client";
import { useEffect, useState } from "react";
import { api, Service, EditorialPost } from "@/lib/api";

export default function AdminContentPage() {
  const [tab, setTab] = useState<"services" | "editorials">("services");
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<EditorialPost[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<EditorialPost> | null>(null);

  const loadServices = async () => {
    const res = await api.services.list();
    setServices(res.data.services);
  };
  const loadPosts = async () => {
    const res = await api.editorial.list();
    setPosts(res.data.posts);
  };

  useEffect(() => {
    loadServices();
    loadPosts();
  }, []);

  const saveService = async () => {
    if (!editingService) return;
    if (editingService._id) {
      await api.services.update(editingService._id, editingService);
    } else {
      await api.services.create(editingService);
    }
    setEditingService(null);
    loadServices();
  };

  const deleteService = async (id: string) => {
    if (!window.confirm("متأكدة عايزة تمسحي الخدمة دي؟")) return;
    await api.services.remove(id);
    loadServices();
  };

  const savePost = async () => {
    if (!editingPost) return;
    if (editingPost._id) {
      await api.editorial.update(editingPost._id, editingPost);
    } else {
      await api.editorial.create(editingPost);
    }
    setEditingPost(null);
    loadPosts();
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("متأكدة عايزة تمسحي المقال ده؟")) return;
    await api.editorial.remove(id);
    loadPosts();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("services")}
          className={`px-4 py-2 rounded-lg text-sm ${
            tab === "services" ? "bg-white text-black" : "bg-neutral-800 text-neutral-300"
          }`}
        >
          الخدمات
        </button>
        <button
          onClick={() => setTab("editorials")}
          className={`px-4 py-2 rounded-lg text-sm ${
            tab === "editorials" ? "bg-white text-black" : "bg-neutral-800 text-neutral-300"
          }`}
        >
          المقالات
        </button>
      </div>

      {tab === "services" && (
        <div>
          <button
            onClick={() => setEditingService({})}
            className="mb-4 px-4 py-2 rounded-lg bg-green-700 text-white text-sm"
          >
            + خدمة جديدة
          </button>

          <div className="space-y-2">
            {services.map((s) => (
              <div
                key={s._id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white">{s.titleEn}</p>
                  <p className="text-neutral-400 text-sm">
                    {s.category} · {s.price} ج.م
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingService(s)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-700 text-white text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteService(s._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-sm"
                  >
                    مسح
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingService && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
              <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md space-y-3 border border-neutral-800">
                <h3 className="text-white font-medium">
                  {editingService._id ? "تعديل خدمة" : "خدمة جديدة"}
                </h3>
                <input
                  placeholder="الاسم"
                  value={editingService.titleEn || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, titleEn: e.target.value, name: e.target.value } as any)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <input
                  placeholder="الفئة (face/hair/body)"
                  value={editingService.category || ""}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <input
                  type="number"
                  placeholder="السعر"
                  value={editingService.price || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <input
                  placeholder="slug (مثال: face-serum)"
                  value={editingService.slug || ""}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={saveService}
                    className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-medium"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="flex-1 py-2 rounded-lg bg-neutral-700 text-white text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "editorials" && (
        <div>
          <button
            onClick={() => setEditingPost({})}
            className="mb-4 px-4 py-2 rounded-lg bg-green-700 text-white text-sm"
          >
            + مقال جديد
          </button>

          <div className="space-y-2">
            {posts.map((p) => (
              <div
                key={p._id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between"
              >
                <p className="text-white">{p.titleEn}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPost(p)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-700 text-white text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => deletePost(p._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-sm"
                  >
                    مسح
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingPost && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
              <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md space-y-3 border border-neutral-800">
                <h3 className="text-white font-medium">
                  {editingPost._id ? "تعديل مقال" : "مقال جديد"}
                </h3>
                <input
                  placeholder="العنوان"
                  value={editingPost.titleEn || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, titleEn: e.target.value, title: e.target.value } as any)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <input
                  placeholder="slug"
                  value={editingPost.slug || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700"
                />
                <textarea
                  placeholder="المحتوى"
                  value={(editingPost as any).content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value } as any)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 h-24"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={savePost}
                    className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-medium"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="flex-1 py-2 rounded-lg bg-neutral-700 text-white text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
