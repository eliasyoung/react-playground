import { create } from "zustand";

import { createThemeSlice, ThemeSlice } from "@/features/theme-toggle/stores";

export const useBoundStore = create<ThemeSlice>()((...a) => ({
  ...createThemeSlice(...a),
}));
