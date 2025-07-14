import type { JSX } from "astro/jsx-runtime";

import { CircleCheck } from "lucide-react";


import Frame from "@/components/common/react/Frame";
import { useTheme } from "@/config/ThemeContext";

interface FrameSuccessProps {
  message?: string;
  onDismiss?: () => void;
}

export default function FrameSuccess({
  message = "บันทึกข้อมูลเสำเร็จ",
  onDismiss,
}: FrameSuccessProps): JSX.Element {
  const { theme } = useTheme();

  return (
    <Frame size="sm" noWrapper onClickX={onDismiss}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 py-2">
        <h1 className="text-center text-3xl font-bold text-nowrap">
          <CircleCheck
            size={95}
            className="mx-auto mb-4"
            style={{ color: theme.primaryColor }}
          />
          {message}
        </h1>
      </div>
    </Frame>
  );
}
