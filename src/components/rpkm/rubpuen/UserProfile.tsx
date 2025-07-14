import type { JSX } from "astro/jsx-runtime";

import type { User } from "@/types/common";

interface UserProfileProps {
  user: User;
  variant?: "blue-star" | "red-star" | "blue" | "red";
  className?: string;
}

const userAvatarMap: Record<number, string> = {
  1: "/images/rpkm/profile/robot-01.png",
  2: "/images/rpkm/profile/robot-02.png",
  3: "/images/rpkm/profile/robot-03.png",
  4: "/images/rpkm/profile/robot-04.png",
  5: "/images/rpkm/profile/robot-05.png",
};

export default function UserProfile({
  user,
  variant = "red",
  className = "",
}: UserProfileProps): JSX.Element {
  const frameSvg = `/images/frame-profile-image/frame-profile-image-${variant}.svg`;
  // const FRAME_MASK = "/images/frame-profile-image/frame-profile-image-mask.svg";

  const USER_BAR_SVG = `/images/rpkm/profile/user-bar.svg`;

  return (
    <div
      className={`user-profile ${className} flex flex-col items-center justify-center`}
    >
      <div className="relative flex h-[200px] w-[200px]">
        <img
          src={userAvatarMap[user.avatarId]}
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
      <div className="relative flex h-[81px] w-[361px] flex-col items-center justify-center">
        <img src={USER_BAR_SVG} alt="" className="absolute -z-0" />
        <div className="z-10 flex flex-col items-center justify-center">
          <div className="max-w-[280px] overflow-x-auto whitespace-nowrap">
            <p className="text-2xl font-medium">
              {user.firstName} {user.lastName} ({user.nickname})
            </p>
          </div>
          <p className="text-sm font-normal">{user.studentId}</p>
        </div>
      </div>
    </div>
  );
}
