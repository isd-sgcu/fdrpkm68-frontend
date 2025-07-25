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

export default function LoginStep({
  register,
  errors,
  formValues: _formValues,
  setValue: _setValue,
  onSubmit,
  onForgot,
  userType,
  isLoading = false,
}: {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  formValues: LoginFormData;
  setValue: UseFormSetValue<LoginFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onForgot: () => void;
  userType: "FRESHMAN" | "STAFF";
  isLoading?: boolean;
}): ReactNode {
  const globUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">เข้าสู่ระบบ</h1>
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
          <label className="text-sm" htmlFor="password">
            รหัสผ่าน <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="password"
              type="password"
              placeholder="รหัสผ่าน"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
              })}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onForgot}
          className="text-right text-sm text-gray-500 underline"
        >
          ลืมรหัสผ่าน?
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center py-2 text-black transition-colors duration-200 ${
            isLoading
              ? "cursor-not-allowed bg-gray-300"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
              กำลังเข้าสู่ระบบ...
            </div>
          ) : (
            "เข้าสู่ระบบ"
          )}
        </button>

        <a
          type="button"
          className="mt-5 text-right text-sm text-gray-500 underline"
          href="/register"
        >
          ลงทะเบียนบัญชีใหม่
        </a>
      </form>
    </div>
  );
}
