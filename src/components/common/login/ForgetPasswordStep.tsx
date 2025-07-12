export default function ForgotPasswordStep({
  form,
  setForm,
  onBack,
  userType,
}: {
  form: any;
  setForm: any;
  onBack?: () => void;
  userType: "student" | "staff";
}) {
  const globUrl =
    userType === "student"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="studentId">
          รหัสนิสิต
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className="h-full w-full rounded-sm bg-black p-1 text-sm"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="citizenId">
          รหัสบัตรประชาชน
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className="h-full w-full rounded-sm bg-black p-1 text-sm"
            value={form.citizenId}
            onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="newPassword">
          รหัสผ่านใหม่
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="newPassword"
            type="password"
            placeholder="รหัสผ่าน"
            className="h-full w-full rounded-sm bg-black p-1 text-sm"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="confirmPassword">
          รหัสผ่านใหม่อีกครั้ง
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="confirmPassword"
            type="password"
            placeholder="รหัสผ่านใหม่อีกครั้ง"
            className="h-full w-full rounded-sm bg-black p-1 text-sm"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      <button className="flex items-center justify-center bg-white py-2 text-black transition-colors duration-200 hover:bg-gray-100">
        รีเซตรหัสผ่าน
      </button>
      {onBack && (
        <button onClick={onBack} className="text-sm text-gray-400 underline">
          กลับเข้าสู่ระบบ
        </button>
      )}
    </div>
  );
}
