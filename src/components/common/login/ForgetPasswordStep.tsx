export default function ForgotPasswordStep({
    form,
    setForm,
    onBack,
    userType,
  }: {
    form: any;
    setForm: any;
    onBack?: () => void;
    userType: 'student' | 'staff';
  }) {
    const globUrl = userType === 'student' ? '/firstdate/register/glob.svg' : '/firstdate/register/staff/glob.svg';

    return (
      <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <img src={globUrl} alt="Background" />
          <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
        </div>
  
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className="text-sm"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className="text-sm"
            value={form.citizenId}
            onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="newPassword">รหัสผ่านใหม่</label>
          <input
            id="newPassword"
            type="password"
            placeholder="รหัสผ่าน"
            className="text-sm"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="confirmPassword">รหัสผ่านใหม่อีกครั้ง</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="รหัสผ่านใหม่อีกครั้ง"
            className="text-sm"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">รีเซตรหัสผ่าน</button>
        {onBack && (
          <button onClick={onBack} className="text-sm text-gray-400 underline">
            กลับเข้าสู่ระบบ
          </button>
        )}
      </div>
    );
  }