import type { JSX } from "astro/jsx-runtime";

import type { User } from "@/types/common";

interface GroupProfileProps {
  user: User | null;
  variant?: "blue-star" | "red-star" | "blue" | "red";
  className?: string;
}

const groupAvatarMap: Record<number, string> = {
  1: "/images/rpkm/profile/robot-01.png",
  2: "/images/rpkm/profile/robot-02.png",
  3: "/images/rpkm/profile/robot-03.png",
  4: "/images/rpkm/profile/robot-04.png",
  5: "/images/rpkm/profile/robot-05.png",
};

export default function GroupProfile({
  user,
  variant = "red",
  className = "",
}: GroupProfileProps): JSX.Element {
  const frameSvg = `/images/frame-profile-image/frame-profile-image-${variant}.svg`;

  return (
    <div
      className={`user-profile ${className} flex flex-col items-center justify-center`}
    >
      <div className="relative flex h-[80px] w-[80px]">
        <img
          src={
            user
              ? groupAvatarMap[user.avatarId]
              : "/images/rpkm/profile/profile-unknown.png"
          }
          alt="User Avatar"
          // style={{
          //   WebkitMaskImage: `url(${FRAME_MASK})`,
          //   maskImage: `url(${FRAME_MASK})`,
          //   WebkitMaskSize: "cover",
          //   maskSize: "cover",
          //   WebkitMaskRepeat: "no-repeat",
          //   maskRepeat: "no-repeat",
          //   objectFit: "cover",
          //   maskMode: "luminance",
          // }}
        />
        <img src={frameSvg} alt="Frame" className="absolute h-full w-full" />
      </div>
    </div>
  );
}
