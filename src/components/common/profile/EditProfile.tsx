import type { ReactNode } from "react";

export default function EditProfile({
  userType,
}: {
  userType: "student" | "staff";
}): ReactNode {
  const bgURL =
    userType === "student"
      ? "/images/bg/bg-student.png"
      : "/images/bg/bg-staff.png";

  const handleReturnHome = (): void => {
    window.location.href = "/";
  };

  return (
    <section>
      {/* Personal Information */}

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">ชื่อ:</span>
        <p>นาย บลา ๆ บลา ๆ</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">ชื่อเล่น:</span>
        <p>น</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">คณะ:</span>
        <p>คณะ</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">รหัสนิสิต:</span>
        <p>1234567890</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">รหัสประชาชน:</span>
        <p>1234567890123</p>
      </div>

      {/* Contact Information */}

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">เบอร์โทรศัพท์:</span>
        <p>0812345678</p>
      </div>

      <hr className="w-48" />

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">ผู้ปกครอง:</span>
        <p>นาย บลา ๆ บลา ๆ</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">ความสัมพันธ์:</span>
        <p>พ่อ</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">เบอร์โทรศัพท์:</span>
        <p>0812345678</p>
      </div>

      {/* Health Information */}

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">อาหารที่แพ้ / ข้อจำกัดด้านอาหาร:</span>
        <p>-</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">ยาที่แพ้:</span>
        <p>-</p>
      </div>

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">โรคประจำตัว:</span>
        <p>-</p>
      </div>

      {/* Security Information */}

      <div className="flex justify-between">
        <span className="text-[#C6EBC5]">รหัสผ่าน:</span>
        <button>รีเซ็ตรหัสผ่าน</button>
      </div>

      {/* Return to home */}

      <button onClick={handleReturnHome}>กลับสู่หน้าหลัก</button>
    </section>
  );
}
