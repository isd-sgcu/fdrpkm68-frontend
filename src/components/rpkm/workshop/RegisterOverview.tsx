import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import Frame from "@/components/common/react/Frame";
import type { WorkshopCardProps } from "./WorkshopCard";

interface RegisterOverviewProps extends WorkshopCardProps {
  onConfirm?: () => void;
}

export default function RegisterOverview({ onConfirm, ...props }: RegisterOverviewProps) {
  return (
    <Frame size="sm" noWrapper>
      <div className='flex flex-col h-full w-full py-8 px-3'>
        <h1 className="text-center text-4xl font-bold text-nowrap">Keychain Workshop</h1>
        <p className='py-4'>มาแล้วลูกจ๋า ชุดโกโกวาที่หนูอยากได้ โกโกวาที่หนู อยากใส่ โกโกวาคิมิซึนิดา มาแล้วลูกจ๋า ชุดโกโกวาที่ หนูอยากได้ โกโกวาที่หนูอยากใส่ โกโกวาคิมิซึนิดา... </p>
        <div className='pb-4'>
          <p className='py-1'>1 สิงหาคม 2568</p>
          <p className='py-1'>1 สิงหาคม 2568</p>
          <p className='py-1'>1 สิงหาคม 2568</p>
        </div>
        <ButtonRpkm
          href="#"
          className="mx-auto text-nowrap" 
          size="lg" 
          color='blue'
          data-dialog-open="workshop-detail-1"
          onClick={onConfirm}
        >
          ลงทะเบียนกิจกรรม
        </ButtonRpkm>
      </div>
    </Frame>    
  );
}