import type { JSX } from "astro/jsx-runtime";

import { AvatarMap, type ProfileProps } from "@rpkm/data/profile";

export default function UserProfile({
  user,
  variant = "red",
  className = "",
}: ProfileProps): JSX.Element {
  const frameSvg = `/images/frame-profile-image/frame-profile-image-${variant}.svg`;
  // const FRAME_MASK = "/images/frame-profile-image/frame-profile-image-mask.svg";

  const USER_BAR_SVG = `/images/rpkm/profile/user-bar.svg`;

  return (
    <div
      className={`user-profile ${className} flex flex-col items-center justify-center`}
    >
      <div className="relative flex h-[200px] w-[200px]">
        <img
          src={
            user
              ? AvatarMap[user.avatarId]
              : "/images/rpkm/profile/profile-unknown.png"
          }
          alt={
            user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName} avatar`
              : "Unknown user avatar"
          }
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
              {user?.firstName} {user?.lastName} ({user?.nickname})
            </p>
          </div>
          <p className="text-sm font-normal">{user?.studentId}</p>
        </div>
      </div>
    </div>
  );
}
