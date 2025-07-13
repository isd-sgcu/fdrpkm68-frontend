import type { JSX } from "astro/jsx-runtime";

import Frame from "@/components/common/react/Frame";
import type { WorkshopCardProps } from "@/components/rpkm/workshop/WorkshopCard";

export default function RegisterSuccess(props: WorkshopCardProps): JSX.Element {
  return (
    <Frame size="sm" noWrapper>
      <div className="flex h-full w-full flex-col px-3 py-8">
        <h1 className="text-center text-4xl font-bold text-nowrap">
          ลงทะเบียนสำเร็จ
        </h1>
      </div>
    </Frame>
  );
}
