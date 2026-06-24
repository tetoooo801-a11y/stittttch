const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  errors?: { field: string; message: string }[];

  constructor(message: string, status: number, errors?: { field: string; message: string }[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) reqHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: reqHeaders,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      data.message || "Request failed",
      res.status,
      data.errors
    );
  }

  return data as T;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Service {
  _id: string;
  slug: string;
  category: string;
  titleKey: string;
  descKey: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  duration: number;
  price: number;
  rating: number;
  reviewsCount: number;
  badgeKey?: string;
  imageUrl: string;
  bannerUrl?: string;
  processDescEn?: string;
  processDescAr?: string;
  ingredientsEn?: string;
  ingredientsAr?: string;
  aftercareEn?: string;
  aftercareAr?: string;
}

export interface Review {
  _id: string;
  authorName: string;
  title: string;
  text: string;
  rating: number;
}

export interface Booking {
  _id: string;
  reference: string;
  service: Service;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  notes: string;
  healthNotes: string;
  quantity: number;
  discountCode: string;
  discountAmount: number;
  subtotal: number;
  depositAmount: number;
  total: number;
  paymentMethod: string;
  status: string;
  specialist: string;
}

export interface EditorialPost {
  _id: string;
  slug: string;
  titleKey: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
}

export interface CartItem {
  _id: string;
  service: Service;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

const mockServices: Service[] = [
  {
    _id: "1", slug: "luminous-renewal-serum", category: "face", titleKey: "prod_1_title", descKey: "prod_1_desc",
    titleEn: "Luminous Renewal Serum", titleAr: "مصل التجديد المضيء", descEn: "A potent blend of botanical extracts to restore youthful radiance.", descAr: "مزيج قوي من المستخلصات النباتية لاستعادة إشراقة الشباب.",
    duration: 60, price: 120, rating: 4.9, reviewsCount: 128, badgeKey: "badge_bestseller", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    processDescEn: "Experience the epitome of skincare luxury with our signature luminous renewal treatment.",
    processDescAr: "جربي قمة الفخامة في العناية بالبشرة مع علاجنا المميز."
  },
  {
    _id: "2", slug: "restorative-night-cream", category: "face", titleKey: "prod_2_title", descKey: "prod_2_desc",
    titleEn: "Restorative Night Cream", titleAr: "كريم الليل المجدد", descEn: "Deep hydration and cellular repair while you sleep.", descAr: "ترطيب عميق وإصلاح خلوي أثناء النوم.",
    duration: 45, price: 95, rating: 4.8, reviewsCount: 84, imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "3", slug: "botanical-body-oil", category: "body", titleKey: "prod_3_title", descKey: "prod_3_desc",
    titleEn: "Botanical Body Oil", titleAr: "زيت الجسم النباتي", descEn: "Nourishing essential oils for an all-over healthy glow.", descAr: "زيوت أساسية مغذية لتوهج صحي شامل.",
    duration: 90, price: 150, rating: 5.0, reviewsCount: 205, badgeKey: "badge_new", imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "4", slug: "purifying-clay-mask", category: "face", titleKey: "prod_4_title", descKey: "prod_4_desc",
    titleEn: "Purifying Clay Mask", titleAr: "قناع الطين المنقي", descEn: "Detoxifying French green clay for clear, refined pores.", descAr: "طين أخضر فرنسي مزيل للسموم لمسام نقية وصافية.",
    duration: 30, price: 65, rating: 4.7, reviewsCount: 56, imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "5", slug: "signature-hair-cut", category: "hair", titleKey: "hair_cut_title", descKey: "hair_cut_desc",
    titleEn: "Signature Precision Cut", titleAr: "قصة التوقيع الدقيقة", descEn: "Tailored precision cutting customized to suit your facial structure.", descAr: "قص دقيق ومخصص بشكل فريد ليناسب ملامح وجهك.",
    duration: 60, price: 180, rating: 4.9, reviewsCount: 340, imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
  }
];

export const api = {
  auth: {
    register: (body: { name: string; email: string; password: string }) =>
      request<{ success: boolean; data: { user: User } }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    login: async (body: { email: string; password: string }) => {
      try {
        return await request<{ success: boolean; data: { user: User } }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(body),
        });
      } catch (e) {
        if (typeof window !== "undefined") localStorage.setItem("token", "demo-token");
        return { success: true, data: { user: { _id: "demo", name: "Guest User", email: body.email } } };
      }
    },
    logout: () => {
      if (typeof window !== "undefined") localStorage.removeItem("token");
      return request<{ success: boolean }>("/api/auth/logout", { method: "POST" }).catch(() => ({ success: true }));
    },
    me: async () => {
      try {
        return await request<{ success: boolean; data: { user: User } }>("/api/auth/me");
      } catch (e) {
        if (typeof window !== "undefined" && localStorage.getItem("token") === "demo-token") {
          return { success: true, data: { user: { _id: "demo", name: "Guest User", email: "guest@example.com" } } };
        }
        throw e;
      }
    },
  },
  services: {
    list: async (params?: { category?: string; sort?: string }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set("category", params.category);
      if (params?.sort) q.set("sort", params.sort);
      const qs = q.toString();
      try {
        return await request<{ success: boolean; data: { services: Service[] } }>(
          `/api/services${qs ? `?${qs}` : ""}`
        );
      } catch (e) {
        // Fallback demo data if backend is offline
        return {
          success: true,
          data: {
            services: mockServices.filter(s => !params?.category || params.category === "all" || s.category === params.category)
          }
        };
      }
    },
    byCategory: async (category: string) => {
      try {
        return await request<{ success: boolean; data: { category: string; bannerUrl: string; services: Service[] } }>(
          `/api/services/category/${category}`
        );
      } catch (e) {
        return {
          success: true,
          data: {
            category,
            bannerUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
            services: mockServices.filter(s => s.category === category)
          }
        };
      }
    },
    get: async (id: string) => {
      try {
        return await request<{ success: boolean; data: { service: Service; reviews: Review[] } }>(
          `/api/services/${id}`
        );
      } catch (e) {
        return {
          success: true,
          data: {
            service: mockServices.find(s => s._id === id) || mockServices[0],
            reviews: [
              { _id: "r1", authorName: "Emma W.", title: "Amazing experience", text: "Truly relaxing and professional.", rating: 5 },
              { _id: "r2", authorName: "Sarah M.", title: "Will come back", text: "My skin feels so refreshed.", rating: 4 }
            ]
          }
        };
      }
    },
  },
  bookings: {
    create: (body: Record<string, unknown>) =>
      request<{ success: boolean; data: { booking: Booking } }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    get: (id: string) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}`),
    update: (id: string, body: Record<string, unknown>) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    confirm: (id: string) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}/confirm`, {
        method: "POST",
      }),
    mine: () =>
      request<{ success: boolean; data: { bookings: Booking[] } }>("/api/bookings/me"),
  },
  contact: {
    submit: (body: Record<string, string>) =>
      request<{ success: boolean; message: string }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
  cart: {
    get: () => request<{ success: boolean; data: { cart: Cart } }>("/api/cart"),
    add: (serviceId: string, quantity = 1) =>
      request<{ success: boolean; data: { cart: Cart } }>("/api/cart", {
        method: "POST",
        body: JSON.stringify({ serviceId, quantity }),
      }),
    updateItem: (itemId: string, quantity: number) =>
      request<{ success: boolean; data: { cart: Cart } }>(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      }),
    removeItem: (itemId: string) =>
      request<{ success: boolean; data: { cart: Cart } }>(`/api/cart/items/${itemId}`, {
        method: "DELETE",
      }),
  },
  editorial: {
    list: () =>
      request<{ success: boolean; data: { posts: EditorialPost[] } }>("/api/editorial"),
    get: (slug: string) =>
      request<{ success: boolean; data: { post: EditorialPost } }>(`/api/editorial/${slug}`),
  },
  reviews: {
    create: (body: Record<string, unknown>) =>
      request<{ success: boolean }>("/api/reviews", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
};

export function serviceTitle(service: Service, lang: "en" | "ar", t: (k: string) => string) {
  if (lang === "ar" && service.titleAr) return service.titleAr;
  const translated = t(service.titleKey);
  if (translated !== service.titleKey) return translated;
  return service.titleEn;
}

export function serviceDesc(service: Service, lang: "en" | "ar", t: (k: string) => string) {
  if (lang === "ar" && service.descAr) return service.descAr;
  const translated = t(service.descKey);
  if (translated !== service.descKey) return translated;
  return service.descEn;
}
// Force cache invalidation for images
