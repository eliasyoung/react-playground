import { useBoundStore } from "@/stores";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useTheme = () => {
  const { theme, setTheme } = useBoundStore(
    useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme }))
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
};
