export default function LoginStep({
  form,
  setForm,
  onForgot,
  userType,
}: {
  form: any;
  setForm: any;
  onForgot: () => void;
  userType: 'student' | 'staff';
}) {
  const globUrl = userType === 'student' ? '/firstdate/register/glob.svg' : '/firstdate/register/staff/glob.svg';

  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">เข้าสู่ระบบ</h1>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
        <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className="text-sm bg-black w-full h-full p-1 rounded-sm"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
        <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className="text-sm bg-black w-full h-full p-1 rounded-sm"
            value={form.citizenId}
            onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="password">รหัสผ่าน</label>
        <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="password"
            type="password"
            placeholder="รหัสผ่าน"
            className="text-sm bg-black w-full h-full p-1 rounded-sm"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      </div>
      
      <button
        onClick={onForgot}
        className="text-sm text-gray-500 underline text-right"
      >
        ลืมรหัสผ่าน?
      </button>
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">เข้าสู่ระบบ</button>
    </div>
  );
}