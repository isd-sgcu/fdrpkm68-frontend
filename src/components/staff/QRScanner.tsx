import React, { useCallback, useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";


declare global {
  interface Window {
    handleQRScan?: (data: string) => Promise<void>;
    showErrorModal?: (message: string) => void;
  }
}

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: Error) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt">(
    "prompt"
  );
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">(
    "environment"
  );
  const [hasCamera, setHasCamera] = useState(true);

  const checkCameraAvailability = useCallback(async (): Promise<void> => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setHasCamera(false);
        return;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device): boolean => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        setHasCamera(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track): void => track.stop());
      setPermission("granted");
      setHasCamera(true);
    } catch {
      setPermission("denied");
      setHasCamera(false);
    }
  }, []);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setCameraFacing(isMobile ? "environment" : "user");
    void checkCameraAvailability();
  }, [checkCameraAvailability]);

  const handleScan = useCallback(
    async (result: unknown): Promise<void> => {
      if (result && Array.isArray(result) && result.length > 0) {
        const qrData = (result[0] as { rawValue: string }).rawValue;

        // Accept QR codes with studentId and citizenId format
        let finalQRData = qrData;
        if (qrData.includes("studentId=") && qrData.includes("citizenId=")) {
          finalQRData = qrData;
        } else if (
          qrData.includes("id=7137ec7e-0f4b-4d65-88c4-982d36f7692f") &&
          qrData.includes("userId=a8e7e644-ed12-4748-89fc-4599f868ab5d")
        ) {
          // Keep the old test QR support
          finalQRData =
            "id=7137ec7e-0f4b-4d65-88c4-982d36f7692f&userId=a8e7e644-ed12-4748-89fc-4599f868ab5d";
        } else {
          const error = new Error("QR Code ไม่ถูกต้อง");
          if (onError) {
            onError(error);
          }
          if (window.showErrorModal) {
            window.showErrorModal("QR Code ไม่ถูกต้อง");
          }
          return;
        }

        try {
          if (typeof onScan === "function") {
            onScan(finalQRData);
          } else if (
            window.handleQRScan &&
            typeof window.handleQRScan === "function"
          ) {
            await window.handleQRScan(finalQRData);
          }
        } catch (scanError) {
          if (onError) {
            onError(scanError as Error);
          }
        }
      }
    },
    [onScan, onError]
  );

  const handleError = useCallback(
    (error: unknown): void => {
      const err = error as Error;
      if (err.name === "OverconstrainedError") {
        const fallbackFacing =
          cameraFacing === "environment" ? "user" : "environment";
        setCameraFacing(fallbackFacing);
        return;
      }

      if (onError) {
        onError(err);
      }
    },
    [cameraFacing, onError]
  );

  const requestCameraPermission = useCallback(async (): Promise<void> => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setPermission("granted");
    } catch {
      setPermission("denied");
    }
  }, []);

  const getCameraConstraints = useCallback(() => {
    return {
      facingMode: { ideal: cameraFacing },
    };
  }, [cameraFacing]);

  if (!hasCamera) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="mb-4 text-yellow-600">
          ไม่พบกล้องหรือไม่สามารถเข้าถึงกล้องได้
        </p>
        <p className="mb-4 text-sm text-gray-600">กรุณาใช้อุปกรณ์ที่มีกล้อง</p>
        <button
          onClick={checkCameraAvailability}
          className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          type="button"
        >
          ลองใช้กล้องอีกครั้ง
        </button>
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="mb-4 text-red-500">ไม่สามารถเข้าถึงกล้องได้</p>
        <p className="text-sm text-gray-600">
          กรุณาอนุญาตการเข้าถึงกล้องในการตั้งค่าเบราว์เซอร์
        </p>
        <button
          onClick={requestCameraPermission}
          className="mt-4 rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          type="button"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  if (permission === "prompt") {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="mb-4">กรุณาอนุญาตการเข้าถึงกล้องเพื่อสแกน QR Code</p>
        <button
          onClick={requestCameraPermission}
          className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          type="button"
        >
          เปิดกล้อง
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          allowMultiple={false}
          scanDelay={500}
          formats={["qr_code"]}
          constraints={getCameraConstraints()}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-lg border-2 border-dashed border-white" />
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
