
import { useEffect, useState } from "react";

import type { JSX } from "astro/jsx-runtime";

import { Calendar, Clock4, MapPin } from "lucide-react";

import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import { Dialog, DialogBody } from "@/components/common/react/Dialog";
import Frame from "@/components/common/react/Frame";
import Loading from "@/components/common/react/Loading";
import CapacityBar from "@/components/rpkm/workshop/CapacityBar";
import RegisterConfirm from "@/components/rpkm/workshop/RegisterConfirm";
import RegisterSuccess from "@/components/rpkm/workshop/RegisterSuccess";
import { useDialog } from "@/hooks/useDialog";
import { showSnackbar } from "@/lib/utils";
import { submitWorkshopRegistration } from "@/lib/workshopAPI";
import type { RegisterFormData } from "@/types/rpkm-workshop/schema";
import type { WorkshopData } from "@/types/rpkm-workshop/workshop";

export default function WorkshopCard(workshop: WorkshopData): JSX.Element {
  // const dialogOverview = useDialog(`workshop-overview-${workshopId}`);
  const dialogConfirm = useDialog(`workshop-confirm-${workshop.workshopType}`);
  const dialogSuccess = useDialog(`workshop-success-${workshop.workshopType}`);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData | null>(null);

  const handleConfirm = async (
    registerFormData: RegisterFormData
  ): Promise<void> => {
    setIsLoading(true);
    const timeSlot = workshop.details.times.indexOf(registerFormData.time) + 1; // +1 because backend expects 1-based index

    const response = await submitWorkshopRegistration(
      workshop.workshopType,
      timeSlot
    );

    if (!response.success) {
      const msg = response.error || "";
      let errMsg: string;
      if (msg.includes("already registered for workshop")) {
        errMsg = "คุณได้ลงทะเบียนเข้าร่วมกิจกรรมนี้แล้ว";
      } else if (msg.includes("already registered for time slot")) {
        errMsg = "คุณได้ลงทะเบียนในช่วงเวลานี้แล้ว";
      } else if (msg.includes("at time slot")) {
        errMsg = "ช่วงเวลาที่เลือกไม่ว่าง กรุณาเลือกช่วงเวลาอื่น";
      } else {
        errMsg = "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง";
      }
      showSnackbar(errMsg, "error");
      setIsLoading(false);
      return;
    }

    setFormData(registerFormData);
    dialogConfirm.close();
    dialogSuccess.open();
  };

  useEffect(() => {
    setIsLoading(false);
  }, [formData]);

  return (
    <>
      {isLoading && <Loading />}
      <Frame size="sm" noWrapper noScroll>
        <div className="flex h-full w-full flex-col justify-between px-8 pt-8 pb-5">
          <h1 className="text-center text-4xl font-bold text-nowrap">
            {workshop.title}
          </h1>
          <p className="py-4">{workshop.description}</p>
          <div className="flex flex-col gap-2 pb-4 text-sm">
            <span className="flex gap-2">
              <Calendar size={20} />
              {workshop.metaDate}
            </span>
            <span className="flex gap-2">
              <MapPin size={20} />
              {workshop.metaLocation}
            </span>
            <span className="flex gap-2">
              <Clock4 size={20} />
              {workshop.metaTime}
            </span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ButtonRpkm
              className="mx-autotext-nowrap"
              size="lg"
              color="blue"
              onClick={dialogConfirm.open}
            >
              ดูรายละเอียด
            </ButtonRpkm>
            <CapacityBar current={workshop.current} total={workshop.total} />
          </div>
        </div>
      </Frame>

      {/* น่าจะ skip อันนี้ไปเลยเพราะต้องทำ carousel ซึ่ง ไม่มีภาพ + ขก */}
      {/* <Dialog id={`workshop-overview-${workshop.workshopId}`}>
        <DialogBody>
          <RegisterOverview {...props} onConfirm={dialogConfirm.open} />
        </DialogBody>
      </Dialog> */}

      <Dialog id={`workshop-confirm-${workshop.workshopType}`}>
        <DialogBody>
          <RegisterConfirm
            onConfirm={handleConfirm}
            onDismiss={dialogConfirm.close}
            {...workshop}
          />
        </DialogBody>
      </Dialog>

      {formData && (
        <Dialog id={`workshop-success-${workshop.workshopType}`}>
          <DialogBody>
            <RegisterSuccess
              {...workshop}
              workshopForm={formData}
              onDismiss={() => {
                dialogSuccess.closeAll();
                window.location.reload();
              }}
            />
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}
