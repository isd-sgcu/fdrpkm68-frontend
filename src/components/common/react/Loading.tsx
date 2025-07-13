import React from "react";

import Dialog, { DialogBody } from "@/components/common/react/Dialog";
import Frame from "@/components/common/react/Frame";
import { useTheme } from "@/config/ThemeContext";

const Loading: React.FC = () => {
  const { theme } = useTheme();
  const loaderColor = theme.primaryColor || "#000";

  return (
    <>
      <Dialog forceOpen forceLevel={1000}>
        <DialogBody>
          <Frame size="sm" noWrapper>
            <div className="z-10 flex h-full w-full flex-col items-center justify-center">
              <div className="loader m-auto h-10" />
              <div className="mt-4 text-center text-gray-500">
                กำลังโหลดข้อมูล...
              </div>
            </div>
          </Frame>
        </DialogBody>
      </Dialog>
      <style>
        {`
        .loader {
          width: 40px;
          aspect-ratio: 1;
          --c: linear-gradient(${loaderColor} 0 0);
          --r1: radial-gradient(farthest-side at bottom,${loaderColor} 93%,#0000);
          --r2: radial-gradient(farthest-side at top,${loaderColor} 93%,#0000);
          background: 
            var(--c), var(--r1), var(--r2),
            var(--c), var(--r1), var(--r2),
            var(--c), var(--r1), var(--r2);
          background-repeat: no-repeat;
          animation: l2 1s infinite alternate;
        }
        @keyframes l2 {
          0%,25% {
            background-size: 8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px;
            background-position: 0 50%,0 calc(50% - 2px),0 calc(50% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px);
          }
          50% {
            background-size: 8px 100%,8px 4px,8px 4px,8px 0,8px 4px,8px 4px,8px 0,8px 4px,8px 4px;
            background-position: 0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px);
          }
          75% {
            background-size: 8px 100%,8px 4px,8px 4px,8px 100%,8px 4px,8px 4px,8px 0,8px 4px,8px 4px;
            background-position: 0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(0% - 2px),50% calc(100% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px);
          }
          95%,100% {
            background-size: 8px 100%,8px 4px, 8px 4px,8px 100%,8px 4px,8px 4px,8px 100%,8px 4px,8px 4px;
            background-position: 0 50%,0 calc(0% - 2px),0 calc(100% + 2px),50% 50%,50% calc(0% - 2px),50% calc(100% + 2px),100% 50%,100% calc(0% - 2px),100% calc(100% + 2px);
          }
        }
        `}
      </style>
    </>
  );
};

export default Loading;
