import { rpkmThemeConfigs } from "@/config/rpkmTheme";
import type { ThemeConfig, ThemeVariant } from "@/types/common";

export const themeConfigs: Record<ThemeVariant, ThemeConfig> = {
  fd_home: {
    gradientType: "linear",
    classes: "bg-gradient-to-b from-[#667eea] to-[#764ba2]",
    backgroundImage: "/images/fd/bg/fd_home.png",
    primaryColor: "#667eea",
  },
  ...rpkmThemeConfigs,
};
