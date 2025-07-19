import type { RpkmVariant, ThemeConfig } from "@/types/common";

export const rpkmThemeConfigs: Record<RpkmVariant, ThemeConfig> = {
  rpkm_home: {
    gradientType: "radial",
    classes:
      "bg-[radial-gradient(50%_50%_at_50%_50%,_#8A2BE4_0%,_#2B2D42_100%)]",
    backgroundImage: "/images/rpkm/bg/home.png",
    primaryColor: "#8A2BE4",
    colorVariants: "purple",
  },
  rpkm_workshops: {
    gradientType: "linear",
    classes: "bg-gradient-to-b from-[#183F86] to-[#00FFFF]",
    backgroundImage: "/images/rpkm/bg/rpkm_workshops.png",
    primaryColor: "#00FFFF",
    secondaryColor: "#8A2BE4",
    colorVariants: "blue",
  },
  rpkm_rubpuen: {
    gradientType: "linear",
    classes:
      "bg-[radial-gradient(50%_50%_at_50%_50%,_#8A2BE4_0%,_#2B2D42_100%)]",
    backgroundImage: "/images/rpkm/bg/rubpuen.png",
    primaryColor: "#8A2BE4",
    secondaryColor: "#FF1493",
    colorVariants: "purple",
  },
  rpkm_summary: {
    gradientType: "linear",
    classes: "bg-gradient-to-b from-[#D38DD8] to-[#FF1493]",
    backgroundImage: "/images/rpkm/bg/rpkm_summary.png",
    primaryColor: "#D38DD8",
  },
};
