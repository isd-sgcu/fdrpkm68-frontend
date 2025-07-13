import { type ReactNode, useCallback, useState } from "react";

export default function CompleteStep({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = useCallback((): void => {
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleImageClick();
      }
    },
    [handleImageClick]
  );

  const handleOverlayClick = useCallback((): void => {
    setIsZoomed(false);
  }, []);

  const handleHomeClick = useCallback((): void => {
    window.location.href = "/firstdate/home";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 text-white">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/firstdate/register/sgcu-logo.png"
          alt="SGCU Logo"
          className="h-[50px]"
        />
        <img
          src="/firstdate/register/freshmen-fest-logo.png"
          alt="Freshmen Fest Logo"
          className="w-[80%]"
        />
      </div>
      <div
        className="flex max-h-[650px] w-full flex-col items-center justify-between bg-contain bg-center bg-no-repeat py-4"
        style={{
          backgroundImage: `url(/firstdate/register/success/success-frame.png)`,
        }}
      >
        <div className="mt-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">ลงทะเบียนสำเร็จ!</h1>
          <img
            src="/firstdate/register/success/divider.png"
            alt="Success Line"
            className="mt-4 w-[90%]"
          />
        </div>
        <div className="relative flex w-full items-center justify-center">
          <button
            className={`w-[90%] max-w-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
              isZoomed
                ? "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 scale-150 transform"
                : ""
            }`}
            onClick={handleImageClick}
            aria-label="Click to zoom image"
            style={{
              maxHeight: isZoomed ? "80vh" : "auto",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <img
              src="/firstdate/register/success/time-travel.png"
              alt="Success Frame"
              className="h-full w-full"
              style={{
                objectFit: isZoomed ? "contain" : "cover",
              }}
            />
          </button>
          {isZoomed && (
            <button
              className="bg-opacity-75 fixed inset-0 z-40 cursor-pointer bg-black"
              onClick={handleOverlayClick}
              aria-label="Close zoom"
            />
          )}
        </div>
      </div>
      <button
        className="mt-2 flex items-center justify-center bg-white px-4 py-2 text-black transition-colors duration-200 hover:bg-gray-100"
        onClick={handleHomeClick}
      >
        กลับสู่หน้าหลัก
      </button>
    </div>
  );
}
