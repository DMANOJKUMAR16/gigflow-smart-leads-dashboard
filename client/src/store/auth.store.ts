import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: {
    id: "1",
    name: "Manoj",
    email: "manoj@example.com",
    role: "admin",
  },

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),
}));