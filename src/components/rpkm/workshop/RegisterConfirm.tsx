import type { JSX } from "astro/jsx-runtime";

import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import Frame from "@/components/common/react/Frame";
import type { WorkshopCardProps } from "@/components/rpkm/workshop/WorkshopCard";

interface RegisterConfirmProps extends WorkshopCardProps {
  onConfirm?: () => void;
  onDismiss?: () => void;
}

export default function RegisterConfirm({
  onConfirm,
  onDismiss,
  ...props
}: RegisterConfirmProps): JSX.Element {
  return (
    <Frame size="sm" noWrapper>
      <div className="flex h-full w-full flex-col px-3 py-8">
        <h1 className="text-center text-4xl font-bold text-nowrap">
          Keychain Workshop
        </h1>
        <p className="py-4">
          มาแล้วลูกจ๋า ชุดโกโกวาที่หนูอยากได้ โกโกวาที่หนู อยากใส่
          โกโกวาคิมิซึนิดา มาแล้วลูกจ๋า ชุดโกโกวาที่ หนูอยากได้
          โกโกวาที่หนูอยากใส่ โกโกวาคิมิซึนิดา...{" "}
        </p>
        <div className="pb-4">
          <p className="py-1">1 สิงหาคม 2568</p>
          <p className="py-1">1 สิงหาคม 2568</p>
          <p className="py-1">1 สิงหาคม 2568</p>
        </div>
        <ButtonRpkm
          href="#"
          className="mx-auto text-nowrap"
          size="md"
          color="blue"
          data-dialog-open="workshop-detail-1"
          onClick={onDismiss}
        >
          ย้อนกลับ
        </ButtonRpkm>
        <ButtonRpkm
          href="#"
          className="mx-auto text-nowrap"
          size="md"
          color="blue"
          data-dialog-open="workshop-detail-1"
          onClick={onConfirm}
        >
          ยืนยัน
        </ButtonRpkm>
      </div>
    </Frame>
  );
}
