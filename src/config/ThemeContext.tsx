import React, { createContext, useContext, useState } from "react";

import type { JSX } from "astro/jsx-runtime";

import { themeConfigs } from "@/config/Theme";
import type { ThemeConfig, ThemeVariant } from "@/types/common";

interface ThemeContextProps {
  theme: ThemeConfig;
  setThemeByVariant: (variant: ThemeVariant) => void;
}

const defaultVariant: ThemeVariant = "rpkm_home";
const ThemeContext = createContext<ThemeContextProps>({
  theme: themeConfigs[defaultVariant],
  setThemeByVariant: () => {},
});

export const ThemeProvider = ({
  children,
  initialVariant = "rpkm_home",
}: {
  children: React.ReactNode;
  initialVariant?: ThemeVariant;
}): JSX.Element => {
  const [theme, setTheme] = useState<ThemeConfig>(themeConfigs[initialVariant]);

  const setThemeByVariant = (variant: ThemeVariant): void => {
    setTheme(themeConfigs[variant]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeByVariant }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);
