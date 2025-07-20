import { useEffect, useState } from "react";

import type { JSX } from "astro/jsx-runtime";

import ButtonRpkm from "@/components/common/react/ButtonRpkm";
import Dialog, { DialogBody } from "@/components/common/react/Dialog";
import Frame from "@/components/common/react/Frame";
import FrameSuccess from "@/components/common/react/FrameSuccess";
import Loading from "@/components/common/react/Loading";
import { ThemeProvider } from "@/config/ThemeContext";
import useDialog from "@/hooks/useDialog";
import { submitBottleOfChoice } from "@/lib/rubpuenAPI";
import { showSnackbar } from "@/lib/utils";
import type { ThemeVariant } from "@/types/common";
import { bottleOfChoiceSchema } from "@/types/rpkm-bottole-of-choice/schema";

interface BottleOfChoiceProps {
  initialVariant?: ThemeVariant;
  isChosen: boolean;
}

interface Choice {
  value: string;
  label: string;
}

// Constants
const DIALOG_IDS = {
  MAIN: "bottle-of-choice",
  SUCCESS: "bottle-of-choice-success",
} as const;

const BOTTLE_OPTIONS: Choice[] = [
  {
    value: "A",
    label: "แน่นอน! พกเป็นประจำอยู่แล้ว",
  },
  {
    value: "B",
    label: "โอเคเริ่ม จะไปหาแบบที่ชอบมาใช้\nภายใน Freshmen Fest!",
  },
  {
    value: "C",
    label:
      "อาจจะยัง ช่วยซัพพอตนิสิตใหม่คนนี้หน่อยได้ไหม\n(กระติกน้ำที่แจกจะเป็นแบบในรูปนะ)",
  },
];

export default function BottleOfChoice({
  initialVariant,
  isChosen,
}: BottleOfChoiceProps): JSX.Element {
  // State
  const [choice, setChoice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [specialMessage, setSpecialMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dialogs
  const mainDialog = useDialog(DIALOG_IDS.MAIN);
  const successDialog = useDialog(DIALOG_IDS.SUCCESS);

  // Open dialog on mount
  useEffect(() => {
    if (isChosen) {
      return; // Do not open dialog if already chosen
    }
    mainDialog.open();
  }, []);

  // Handlers
  const handleChoiceChange = (value: string): void => {
    setChoice(value);
    if (value === "C") {
      setSpecialMessage(true);
    } else {
      setSpecialMessage(false);
    }

    setError(null); // Clear error when user makes selection
  };

  const handleConfirm = async (): Promise<void> => {
    const parseResult = bottleOfChoiceSchema.safeParse({ choice });

    if (!parseResult.success) {
      const errorMessage = parseResult.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setError(errorMessage);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await submitBottleOfChoice(parseResult.data);

      if (!result.success) {
        showSnackbar("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง", "error");
        return;
      }

      mainDialog.close();
      successDialog.open();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider initialVariant={initialVariant}>
      <div className="flex">
        {isLoading && <Loading />}

        {/* Main Dialog */}
        <Dialog id={DIALOG_IDS.MAIN} onConfirm={handleConfirm}>
          <DialogBody>
            <Frame size="lg" color="purple" noWrapper>
              <div className="flex h-full w-full flex-col items-center justify-between gap-1 px-6 py-4">
                {/* Header */}
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-center text-2xl font-bold text-nowrap">
                    ก้าวแรกในจุฬาฯ
                    <br />
                    มาพกกระติกด้วยกันนะ!
                  </h1>
                </div>

                {/* Description */}
                <p className="pb-1 text-center text-xs font-normal">
                  จุฬาลงกรณ์มหาวิทยาลัยมีตู้กดน้ำดื่มสะอาด
                  ที่ได้ผ่านการตรวจคุณภาพอย่างสม่ำเสมอ กว่า 130
                  ตู้ทั่วมหาวิทยาลัยและมีส่วนลดค่าเครื่องดื่ม อย่างน้อย 3
                  บาท/แก้ว เมื่อพกภาชนะมาเอง
                </p>

                {/* Image */}
                <img
                  src="/images/rpkm/rubpuen/bottle-of-choice.png"
                  alt="Bottle of Choice"
                  className="mb-4 aspect-square h-[110px] object-contain"
                />

                {/* Question */}
                <p className="pb-1 text-center font-bold">
                  คุณพร้อมจัดหากระติกน้ำ กระบอกน้ำ
                  <br />
                  แก้วน้ำใช้ซ้ำ มาใช้ในช่วงชีวิตมหาลัยหรือยัง?
                </p>

                {/* Options */}
                <div className="flex w-full flex-col items-center gap-4 py-2">
                  <div className="flex w-full flex-col gap-4">
                    {BOTTLE_OPTIONS.map((option) => (
                      <div
                        key={option.value}
                        className="inline-flex w-full items-center"
                      >
                        <div className="relative flex cursor-pointer items-center">
                          <input
                            type="radio"
                            name="bottle-choice"
                            id={option.value}
                            value={option.value}
                            checked={choice === option.value}
                            onChange={() => handleChoiceChange(option.value)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#FF1493] transition-all"
                          />
                          <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#FF1493] opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                        </div>
                        <label
                          htmlFor={option.value}
                          className="ml-2 cursor-pointer text-sm whitespace-pre-line"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="w-full text-center text-sm text-red-500">
                    {error}
                  </div>
                )}

                {specialMessage && (
                  <div className="w-full text-center text-xs text-white">
                    *สามารถรับกระติกน้ำได้ที่บ้านรับเพื่อนในวันรับเพื่อนก้าวใหม่
                  </div>
                )}

                {/* Confirm Button */}
                <div className="flex gap-5">
                  <ButtonRpkm
                    className="mx-auto text-nowrap"
                    size="lg"
                    color="blue"
                    onClick={handleConfirm}
                  >
                    ยืนยัน
                  </ButtonRpkm>
                </div>
              </div>
            </Frame>
          </DialogBody>
        </Dialog>

        {/* Success Dialog */}
        <Dialog id={DIALOG_IDS.SUCCESS}>
          <DialogBody>
            <FrameSuccess
              message="บันทึกข้อมูลเสำเร็จ"
              onDismiss={mainDialog.closeAll}
            />
          </DialogBody>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
