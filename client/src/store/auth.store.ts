import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;

  setUser: (
    user: User | null
  ) => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    setUser: (
      user: User | null
    ) =>
      set({
        user,
      }),
  }));