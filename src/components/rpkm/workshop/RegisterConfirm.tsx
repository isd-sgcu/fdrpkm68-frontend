
import { useState } from "react";

import type { JSX } from "astro/jsx-runtime";

import { Calendar } from "lucide-react";

import MapDropdown from "@/components/common/MapDropdown";
import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import Frame from "@/components/common/react/Frame";
import {
  type RegisterFormData,
  registerSchema,
} from "@/types/rpkm-workshop/schema";
import type { WorkshopData } from "@/types/rpkm-workshop/workshop";

interface RegisterConfirmProps extends WorkshopData {
  onConfirm?: (registerFormData: RegisterFormData) => void;
  onDismiss?: () => void;
}

export default function RegisterConfirm({
  onConfirm,
  onDismiss,
  ...workshop
}: RegisterConfirmProps): JSX.Element {
  const [location, setLocation] = useState(workshop.details.locations[0] || "");
  const [time, setTime] = useState(workshop.details.times[0] || "");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = (): void => {
    const result = registerSchema.safeParse({ location, time });
    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setError(errorMessage);
      return;
    }
    setError(null);
    onConfirm?.({ location, time });
  };

  return (
    <Frame size="sm" noWrapper>
      <div className="flex h-full w-full flex-col items-center justify-between gap-1 px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-bold text-nowrap">
            ลงทะเบียน
            <br />
            {workshop.title}
          </h1>
          <span className="flex gap-2 text-center text-sm">
            <Calendar size={20} />
            {workshop.metaDate}
          </span>
        </div>

        <div className="flex w-full flex-col items-start">
          <p className="pb-1 text-center">สถานที่</p>
          <MapDropdown
            options={workshop.details.locations.map((location) => ({
              label: location,
              value: location,
            }))}
            selectedOption={{
              label: location,
              value: location,
            }}
            className="w-full border border-white"
            liClassName="text-[0.8rem]"
            onChange={(value) => setLocation(value.value)}
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <p className="pb-1 text-center">รอบเวลา</p>
          <MapDropdown
            options={workshop.details.times.map((time) => ({
              label: time,
              value: time,
            }))}
            selectedOption={{
              label: time,
              value: time,
            }}
            className="w-full border border-white"
            liClassName="text-[0.8rem]"
            onChange={(value) => setTime(value.value)}
          />
        </div>

        {error && (
          <div className="w-full text-center text-sm text-red-500">{error}</div>
        )}

        <div>
          <p className="pb-1 text-center text-[0.7rem]">
            *หากกดยืนยันแล้วจะไม่สามารถแก้ไขได้อีก
          </p>
          <div className="flex gap-5">
            <ButtonRpkm
              className="mx-autotext-nowrap"
              size="sm"
              color="blue"
              variant="stroke"
              onClick={onDismiss}
            >
              ย้อนกลับ
            </ButtonRpkm>
            <ButtonRpkm
              className="mx-autotext-nowrap"
              size="sm"
              color="blue"
              onClick={handleConfirm}
            >
              ยืนยัน
            </ButtonRpkm>
          </div>
        </div>
      </div>
    </Frame>
  );
}
