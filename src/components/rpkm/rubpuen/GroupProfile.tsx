import type { JSX } from "astro/jsx-runtime";

import { AvatarMap, type ProfileProps } from "@rpkm/data/profile";

export default function GroupProfile({
  user,
  variant = "red",
  className = "",
}: ProfileProps): JSX.Element {
  const frameSvg = `/images/frame-profile-image/frame-profile-image-${variant}.svg`;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`user-profile ${className} flex flex-col items-center justify-center`}
      >
        <div className="relative flex h-[90px] w-[90px]">
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
      </div>

      {user ? (
        <p className="truncate text-base font-medium text-white">
          {user.nickname}
        </p>
      ) : (
        <p className="truncate text-base font-medium text-white opacity-0">
          Unknown
        </p>
      )}
    </div>
  );
}
