import type { ReactNode } from "react";

import type {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";


import type { RegisterFormData } from "@/components/common/register/RegisterForm";

export interface AccountInfo {
  studentId: string;
  citizenId: string;
  password: string;
  passwordConfirm: string;
}

export default function AccountStep({
  register,
  errors,
  formValues,
  setValue,
  control,
  clearErrors,
  watch,
  onSubmit,
  setStep: _setStep,
  userType,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  formValues: RegisterFormData;
  setValue: UseFormSetValue<RegisterFormData>;
  control: Control<RegisterFormData>;
  clearErrors: UseFormClearErrors<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setStep: (step: number) => void;
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
        <h1 className="text-lg font-semibold">ลงทะเบียน</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="firstName">
            รหัสนิสิต <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="studentID"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.firstName ? "border-red-500" : ""}`}
              type="text"
              placeholder="รหัสนิสิต"
              {...register("studentId", {
                required: "กรุณากรอกรหัสนิสิต",
              })}
            />
          </div>
          {errors.firstName && (
            <span className="text-xs text-red-400">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="firstName">
            รหัสประจำตัวประชาชน <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="nationalID"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.firstName ? "border-red-500" : ""}`}
              type="text"
              placeholder="รหัสประจำตัวประชาชน"
              {...register("citizenId", {
                required: "กรุณากรอกรหัสประจำตัวประชาชน",
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
          <label className="text-sm" htmlFor="firstName">
            รหัสผ่าน <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="password"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.password ? "border-red-500" : ""}`}
              type="password"
              placeholder="รหัสผ่าน"
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
                minLength: {
                  value: 8,
                  message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
                },
                maxLength: {
                  value: 20,
                  message: "รหัสผ่านต้องมีไม่เกิน 20 ตัวอักษร",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.+/-])[A-Za-z\d@$!%*?&.+/-]/,
                  message:
                    "รหัสผ่านต้องประกอบด้วยตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="firstName">
            รหัสผ่านอีกครั้ง <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="passwordConfirm"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.passwordConfirm ? "border-red-500" : ""}`}
              type="password"
              placeholder="รหัสผ่านอีกครั้ง"
              {...register("passwordConfirm", {
                required: "กรุณากรอกรหัสผ่านอีกครั้ง",
                validate: (value) => {
                  const password = watch("password");
                  return value === password || "รหัสผ่านไม่ตรงกัน";
                },
              })}
            />
          </div>
          {errors.passwordConfirm && (
            <span className="text-xs text-red-400">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <div className="mt-2 flex w-full justify-center">
          <button
            type="submit"
            className="w-36 rounded-full bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 text-black"
          >
            ถัดไป
          </button>
        </div>
        <a
          type="button"
          className="mt-5 text-right text-sm text-gray-500 underline"
          href={userType === "STAFF" ? "/staff/login" : "/login"}
        >
          มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
        </a>
      </form>
    </div>
  );
}
