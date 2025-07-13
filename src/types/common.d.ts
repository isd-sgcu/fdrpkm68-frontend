export type RpkmVariant =
  | "rpkm_home"
  | "rpkm_summary"
  | "rpkm_workshops"
  | "rpkm_rubpuen";

export type FdVariant = "fd_home";

export type ThemeVariant = RpkmVariant | FdVariant;

export type GradientType = "linear" | "radial";

export interface ThemeConfig {
  gradientType: GradientType;
  classes: string;
  backgroundImage?: string;
  primaryColor?: string;
  secondaryColor?: string;
  colorVariants?: string;
}
