"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, ApiError, User } from "@/lib/api";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && !localStorage.getItem("token")) {
        throw new Error("No token");
      }
      const res = await api.auth.me();
      setUser(res.data.user);
    } catch {
      setUser(null);
      if (typeof window !== "undefined") localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await api.auth.login({ email, password });
    if (typeof window !== "undefined") localStorage.setItem("token", (res.data as any).token);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.auth.register({ name, email, password });
    if (typeof window !== "undefined") localStorage.setItem("token", (res.data as any).token);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.auth.logout();
    if (typeof window !== "undefined") localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { ApiError };
