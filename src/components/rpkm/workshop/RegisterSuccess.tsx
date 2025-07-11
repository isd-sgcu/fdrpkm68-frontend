import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import Frame from "@/components/common/react/Frame";
import type { WorkshopCardProps } from "./WorkshopCard";


export default function RegisterSuccess(props: WorkshopCardProps) {
    return (
<Frame size="sm" noWrapper>
        <div className='flex flex-col h-full w-full py-8 px-3'>
        <h1 className="text-center text-4xl font-bold text-nowrap">ลงทะเบียนสำเร็จ</h1>
    </div>
</Frame>    
);
}