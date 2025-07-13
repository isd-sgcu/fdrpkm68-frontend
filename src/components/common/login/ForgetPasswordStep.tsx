import type { ReactNode } from "react";

import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";


interface LoginFormData {
  studentId: string;
  citizenId: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordStep({
  register,
  errors,
  formValues,
  setValue: _setValue,
  onSubmit,
  onBack,
  userType,
}: {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  formValues: LoginFormData;
  setValue: UseFormSetValue<LoginFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onBack?: () => void;
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const globUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="studentId">
            รหัสนิสิต <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="studentId"
              type="text"
              placeholder="รหัสนิสิต"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.studentId ? "border-red-500" : ""}`}
              {...register("studentId", {
                required: "กรุณากรอกรหัสนิสิต",
              })}
            />
          </div>
          {errors.studentId && (
            <span className="text-xs text-red-400">
              {errors.studentId.message}
            </span>
          )}
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
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.citizenId ? "border-red-500" : ""}`}
              {...register("citizenId", {
                required: "กรุณากรอกรหัสบัตรประชาชน",
                pattern: {
                  value: /^[0-9]{13}$/,
                  message: "กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง (13 หลัก)",
                },
              })}
            />
          </div>
          {errors.citizenId && (
            <span className="text-xs text-red-400">
              {errors.citizenId.message}
            </span>
          )}
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
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.newPassword ? "border-red-500" : ""}`}
              {...register("newPassword", {
                required: "กรุณากรอกรหัสผ่านใหม่",
                minLength: {
                  value: 6,
                  message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                },
              })}
            />
          </div>
          {errors.newPassword && (
            <span className="text-xs text-red-400">
              {errors.newPassword.message}
            </span>
          )}
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
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword", {
                required: "กรุณากรอกรหัสผ่านใหม่อีกครั้ง",
                validate: (value) => {
                  const newPassword = formValues.newPassword;
                  return value === newPassword || "รหัสผ่านไม่ตรงกัน";
                },
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center justify-center bg-white py-2 text-black transition-colors duration-200 hover:bg-gray-100"
        >
          รีเซตรหัสผ่าน
        </button>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-400 underline"
          >
            กลับเข้าสู่ระบบ
          </button>
        )}
      </form>
    </div>
  );
}
