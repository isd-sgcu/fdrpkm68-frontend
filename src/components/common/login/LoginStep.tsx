import { useState } from "react";

export default function LoginStep({
  form,
  setForm,
  onForgot,
  userType,
}: {
  form: any;
  setForm: any;
  onForgot: () => void;
  userType: "student" | "staff";
}) {
  const globUrl =
    userType === "student"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!form.studentId.trim()) {
      newErrors.studentId = 'กรุณากรอกรหัสนิสิต';
    }
    
    if (!form.citizenId.trim()) {
      newErrors.citizenId = 'กรุณากรอกรหัสบัตรประชาชน';
    } else if (!/^[0-9]{13}$/.test(form.citizenId.replace(/\s/g, ''))) {
      newErrors.citizenId = 'กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง (13 หลัก)';
    }
    
    if (!form.password.trim()) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Handle login logic here
      console.log('Login form submitted:', form);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">เข้าสู่ระบบ</h1>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="studentId">
          รหัสนิสิต <span className="text-red-400">*</span>
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.studentId ? 'border-red-500' : ''}`}
            value={form.studentId}
            onChange={(e) => {
              setForm({ ...form, studentId: e.target.value });
              if (errors.studentId) {
                setErrors({...errors, studentId: ''});
              }
            }}
          />
        </div>
        {errors.studentId && <span className="text-red-400 text-xs">{errors.studentId}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="citizenId">
          รหัสบัตรประชาชน <span className="text-red-400">*</span>
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.citizenId ? 'border-red-500' : ''}`}
            value={form.citizenId}
            onChange={(e) => {
              setForm({ ...form, citizenId: e.target.value });
              if (errors.citizenId) {
                setErrors({...errors, citizenId: ''});
              }
            }}
          />
        </div>
        {errors.citizenId && <span className="text-red-400 text-xs">{errors.citizenId}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="password">
          รหัสผ่าน <span className="text-red-400">*</span>
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="password"
            type="password"
            placeholder="รหัสผ่าน"
            className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.password ? 'border-red-500' : ''}`}
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (errors.password) {
                setErrors({...errors, password: ''});
              }
            }}
          />
        </div>
        {errors.password && <span className="text-red-400 text-xs">{errors.password}</span>}
      </div>

      <button
        onClick={onForgot}
        className="text-right text-sm text-gray-500 underline"
      >
        ลืมรหัสผ่าน?
      </button>

      <button 
        className="flex items-center justify-center bg-white py-2 text-black transition-colors duration-200 hover:bg-gray-100"
        onClick={handleLogin}
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}
