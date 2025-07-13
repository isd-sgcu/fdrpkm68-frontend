import type { JSX } from "astro/jsx-runtime";

import { User } from "lucide-react";


import { useTheme } from "@/config/ThemeContext";

export default function CapacityBar({
  current,
  total,
}: {
  current: number;
  total: number;
}): JSX.Element {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  const { theme } = useTheme();

  return (
    <div className="h-5 w-full">
      <div
        className="relative max-h-full w-full border-2 p-0.5"
        style={{ borderColor: theme.primaryColor }}
      >
        <div
          className="h-3 items-center justify-center gap-0.5 text-[0.7rem]"
          style={{
            width: `${percentage}%`,
            backgroundColor: theme.secondaryColor,
          }}
        >
          <div className="absolute top-0.5 flex h-3 w-full items-center justify-center gap-0.5 text-[0.7rem]">
            {current}/{total}
            <User size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
