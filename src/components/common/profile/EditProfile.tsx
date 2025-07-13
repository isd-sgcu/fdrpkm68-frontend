import type { ReactNode } from "react";

import { Pencil } from "lucide-react";


export default function EditProfile({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const globUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";

  const themeColor = userType === "FRESHMAN" ? "#C6EBC5" : "#FFB6C1";

  const handleReturnHome = (): void => {
    window.location.href = "/home";
  };

  return (
    <section
      className={`my-3 flex min-h-screen flex-col gap-8 border-2 border-[${themeColor}] bg-[rgba(0,0,0,0.4)] p-8`}
    >
      <div className="flex justify-between underline">
        <h1 className="text-2xl font-bold">แก้ไขข้อมูล</h1>
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: themeColor, color: "black" }}
        >
          <Pencil className="h-6 w-6" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ข้อมูลส่วนตัว</h1>
      </div>

      {/* Personal Information */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>ชื่อ:</span>
          <p>นาย บลา ๆ บลา ๆ</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>ชื่อเล่น:</span>
          <p>น</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>คณะ:</span>
          <p>คณะ</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>รหัสนิสิต:</span>
          <p>1234567890</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>รหัสประชาชน:</span>
          <p>1234567890123</p>
        </div>
      </div>

      <img
        src="/firstdate/register/divider.png"
        alt="Divider"
        className="w-full"
      />

      {/* Contact Information */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>เบอร์โทรศัพท์:</span>
          <p>0812345678</p>
        </div>

        <hr className="m-2 w-48 self-center" />

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>ผู้ปกครอง:</span>
          <p>นาย บลา ๆ บลา ๆ</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>ความสัมพันธ์:</span>
          <p>พ่อ</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>เบอร์โทรศัพท์:</span>
          <p>0812345678</p>
        </div>
      </div>

      <img
        src="/firstdate/register/divider.png"
        alt="Divider"
        className="w-full"
      />

      {/* Health Information */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>
            อาหารที่แพ้ / ข้อจำกัดด้านอาหาร:
          </span>
          <p>-</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>ยาที่แพ้:</span>
          <p>-</p>
        </div>

        <div className="flex justify-between">
          <span className={`text-[${themeColor}]`}>โรคประจำตัว:</span>
          <p>-</p>
        </div>
      </div>

      <img
        src="/firstdate/register/divider.png"
        alt="Divider"
        className="w-full"
      />

      {/* Security Information */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[${themeColor}]`}>รหัสผ่าน:</span>
          <button className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 py-2">
            รีเซ็ตรหัสผ่าน
          </button>
        </div>
      </div>

      <img
        src="/firstdate/register/divider.png"
        alt="Divider"
        className="w-full"
      />

      {/* Return to home */}

      <button onClick={handleReturnHome} className="bg-white py-2 text-black">
        กลับสู่หน้าหลัก
      </button>
    </section>
  );
}
