import { useState } from "react";

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
    
    if (!form.newPassword.trim()) {
      newErrors.newPassword = 'กรุณากรอกรหัสผ่านใหม่';
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }
    
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = 'กรุณากรอกรหัสผ่านใหม่อีกครั้ง';
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (validateForm()) {
      // Handle password reset logic here
      console.log('Password reset form submitted:', form);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
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
        <label className="text-sm" htmlFor="newPassword">
          รหัสผ่านใหม่ <span className="text-red-400">*</span>
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="newPassword"
            type="password"
            placeholder="รหัสผ่าน"
            className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.newPassword ? 'border-red-500' : ''}`}
            value={form.newPassword}
            onChange={(e) => {
              setForm({ ...form, newPassword: e.target.value });
              if (errors.newPassword) {
                setErrors({...errors, newPassword: ''});
              }
            }}
          />
        </div>
        {errors.newPassword && <span className="text-red-400 text-xs">{errors.newPassword}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="confirmPassword">
          รหัสผ่านใหม่อีกครั้ง <span className="text-red-400">*</span>
        </label>
        <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
          <input
            id="confirmPassword"
            type="password"
            placeholder="รหัสผ่านใหม่อีกครั้ง"
            className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={form.confirmPassword}
            onChange={(e) => {
              setForm({ ...form, confirmPassword: e.target.value });
              if (errors.confirmPassword) {
                setErrors({...errors, confirmPassword: ''});
              }
            }}
          />
        </div>
        {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword}</span>}
      </div>

      <button 
        className="flex items-center justify-center bg-white py-2 text-black transition-colors duration-200 hover:bg-gray-100"
        onClick={handleResetPassword}
      >
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
