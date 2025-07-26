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

export interface Group {
  id: string;
  ownerId: string;
  isConfirmed: boolean;
  inviteCode: string;
  memberCount: number;
  houseRank1: House | null;
  houseRank2: House | null;
  houseRank3: House | null;
  houseRank4: House | null;
  houseRank5: House | null;
  houseRankSub: House | null;
  result_house_id: string | null;
  owner: User;
  users: User[];
  house1: House | null;
  house2: House | null;
  house3: House | null;
  house4: House | null;
  house5: House | null;
  houseSub: House | null;
}
