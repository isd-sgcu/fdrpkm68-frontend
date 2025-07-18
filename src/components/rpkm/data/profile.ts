import type { User } from "@/types/common";

export interface ProfileProps {
  user: User | null;
  variant?: "blue-star" | "red-star" | "blue" | "red";
  className?: string;
}

export const AvatarMap: Record<number, string> = {
  1: "/images/rpkm/profile/robot-01.png",
  2: "/images/rpkm/profile/robot-02.png",
  3: "/images/rpkm/profile/robot-03.png",
  4: "/images/rpkm/profile/robot-04.png",
  5: "/images/rpkm/profile/robot-05.png",
};
