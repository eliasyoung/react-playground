import { StateCreator } from "zustand";
import type { ThemeOption } from "../model";
import { THEME_OPTIONS } from "../constants";

export interface ThemeSlice {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set
) => {
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
};