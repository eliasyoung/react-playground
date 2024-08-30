import { create } from "zustand";
import type { ThemeOption } from "../model";
import { THEME_OPTIONS } from "../constants";

export interface ThemeState {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const storageTheme = localStorage.getItem("theme_key") as ThemeOption | null;
  return {
    theme:
      storageTheme && THEME_OPTIONS.includes(storageTheme)
        ? storageTheme
        : "light",
    setTheme: (theme) => {
      set((_state) => ({ theme: theme }));
    },
  };
});
