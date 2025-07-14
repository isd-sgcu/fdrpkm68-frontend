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

export type PrefixType = "MR" | "MRS" | "MS" | "OTHER";
export type RoleType = "FRESHMAN" | "STAFF" | "ADMIN";
export type BottleChoice = "NONE" | "A" | "B" | "C";

export interface User {
  id: string;
  studentId: string;
  citizenId: string;
  prefix: PrefixType;
  firstName: string;
  lastName: string;
  nickname: string;
  academicYear: number;
  faculty: string;
  password: string;
  phoneNumber: string;
  parentName: string;
  parentPhoneNumber: string;
  parentRelationship: string;
  foodAllergy?: string;
  drugAllergy?: string;
  illness?: string;
  avatarId: number;
  groupId?: string;
  role: RoleType;
  bottleChoice: BottleChoice;
}
