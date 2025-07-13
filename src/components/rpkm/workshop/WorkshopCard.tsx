import type { JSX } from "astro/jsx-runtime";

import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import { Dialog, DialogBody } from "@/components/common/react/Dialog";
import Frame from "@/components/common/react/Frame";
import RegisterConfirm from "@/components/rpkm/workshop/RegisterConfirm";
import RegisterOverview from "@/components/rpkm/workshop/RegisterOverview";
import RegisterSuccess from "@/components/rpkm/workshop/RegisterSuccess";
import { useDialog } from "@/hooks/useDialog";

// import ProgressBar from "@/components/common/ProgressBar.astro";

export interface WorkshopCardProps {
  title: string;
  description: string;
  dates: string[];
  current: number;
  total: number;
  workshopId: string;
}

export default function WorkshopCard(props: WorkshopCardProps): JSX.Element {
  const { title, description, dates, current, total, workshopId } = props;

  const dialogOverview = useDialog(`workshop-overview-${workshopId}`);
  const dialogConfirm = useDialog(`workshop-confirm-${workshopId}`);
  const dialogSuccess = useDialog(`workshop-success-${workshopId}`);

  return (
    <>
      <Frame size="sm">
        <div className="flex h-full w-full flex-col px-3 py-8">
          <h1 className="text-center text-4xl font-bold text-nowrap">
            {title}
          </h1>
          <p className="py-4">{description}</p>
          <div className="pb-4">
            {dates.map((date, index) => (
              <p key={index} className="py-1">
                {date}
              </p>
            ))}
          </div>
          <ButtonRpkm
            className="mx-auto text-nowrap"
            size="lg"
            color="blue"
            onClick={dialogOverview.open}
          >
            ดูรายละอียด
          </ButtonRpkm>
          {/* <ProgressBar current={current} total={total} /> */}
        </div>
      </Frame>
      <Dialog id={`workshop-overview-${workshopId}`}>
        <DialogBody>
          <RegisterOverview {...props} onConfirm={dialogConfirm.open} />
        </DialogBody>
      </Dialog>

      <Dialog id={`workshop-confirm-${workshopId}`}>
        <DialogBody>
          <RegisterConfirm
            {...props}
            onConfirm={() => {
              dialogConfirm.closeAll();
              dialogSuccess.open();
            }}
            onDismiss={dialogConfirm.close}
          />
        </DialogBody>
      </Dialog>

      <Dialog id={`workshop-success-${workshopId}`}>
        <DialogBody>
          <RegisterSuccess {...props} />
        </DialogBody>
      </Dialog>
    </>
  );
}
