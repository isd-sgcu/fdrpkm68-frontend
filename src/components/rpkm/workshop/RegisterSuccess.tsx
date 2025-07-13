import type { JSX } from "astro/jsx-runtime";

import { Calendar, CircleCheck } from "lucide-react";


import Frame from "@/components/common/react/Frame";
import { useTheme } from "@/config/ThemeContext";
import type { RegisterFormData } from "@/types/rpkm-workshop/schema";
import type { WorkshopData } from "@/types/rpkm-workshop/workshop";

interface RegisterSuccessProps extends WorkshopData {
  workshopForm: RegisterFormData;
  onDismiss?: () => void;
}

export default function RegisterSuccess({
  workshopForm,
  onDismiss,
  ...workshop
}: RegisterSuccessProps): JSX.Element {
  const { theme } = useTheme();

  return (
    <Frame size="sm" noWrapper onClickX={onDismiss}>
      <div className="flex h-full w-full flex-col items-center justify-between gap-1 px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-bold text-nowrap">
            ลงทะเบียน
            <br />
            {workshop.title}
          </h1>
          <span className="flex gap-2 text-center text-xs">
            <Calendar size={20} />
            {workshop.metaDate}
          </span>
        </div>

        <h1 className="text-center text-3xl font-bold text-nowrap">
          <CircleCheck
            size={95}
            className="mx-auto mb-4"
            style={{ color: theme.primaryColor }}
          />
          ลงทะเบียนสำเร็จ
        </h1>

        <div>
          <p className="pb-1 text-center text-xs">
            สถานที่: {workshopForm.location}
          </p>
          <p className="pb-1 text-center text-xs">
            รอบเวลา: {workshopForm.time}
          </p>
        </div>
      </div>
    </Frame>
  );
}
