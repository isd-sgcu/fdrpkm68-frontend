import type { ReactNode } from "react";

import { ChevronLeft } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";


import type { RegisterFormData } from "@/components/common/register/RegisterForm";

export interface ContactInfo {
  phoneNumber: string;
  parentPhoneNumber: string;
  parentRelationship: string;
  parentName: string;
}

export default function ContactInformationStep({
  register,
  errors,
  formValues: _formValues,
  setValue: _setValue,
  onSubmit,
  setStep,
  userType,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  formValues: RegisterFormData;
  setValue: UseFormSetValue<RegisterFormData>;
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
        <h1 className="text-lg font-semibold">ข้อมูลการติดต่อ</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="phoneNumber">
            เบอร์โทรศัพท์ <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="phoneNumber"
              type="text"
              placeholder="เบอร์โทรศัพท์"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.phoneNumber ? "border-red-500" : ""}`}
              {...register("phoneNumber", {
                required: "กรุณากรอกเบอร์โทรศัพท์",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                },
              })}
            />
          </div>
          {errors.phoneNumber && (
            <span className="text-xs text-red-400">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <img
          src="/firstdate/register/divider.png"
          alt="Divider"
          className="w-full"
        />

        <div className="flex flex-col gap-4">
          <h1 className="py-4 text-center text-lg font-semibold">
            ข้อมูลผู้ปกครอง
          </h1>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="parentName">
              ชื่อผู้ปกครอง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentName"
                type="text"
                placeholder="ชื่อผู้ปกครอง"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.parentName ? "border-red-500" : ""}`}
                {...register("parentName", {
                  required: "กรุณากรอกชื่อผู้ปกครอง",
                })}
              />
            </div>
            {errors.parentName && (
              <span className="text-xs text-red-400">
                {errors.parentName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="parentPhoneNumber">
              เบอร์โทรศัพท์ของผู้ปกครอง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentPhoneNumber"
                type="text"
                placeholder="เบอร์โทรศัพท์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.parentPhoneNumber ? "border-red-500" : ""}`}
                {...register("parentPhoneNumber", {
                  required: "กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                  },
                })}
              />
            </div>
            {errors.parentPhoneNumber && (
              <span className="text-xs text-red-400">
                {errors.parentPhoneNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="parentRelationship">
              ความสัมพันธ์ <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentRelationship"
                type="text"
                placeholder="ความสัมพันธ์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.parentRelationship ? "border-red-500" : ""}`}
                {...register("parentRelationship", {
                  required: "กรุณากรอกความสัมพันธ์",
                  minLength: {
                    value: 2,
                    message: "กรุณากรอกความสัมพันธ์ให้ชัดเจน",
                  },
                })}
              />
            </div>
            {errors.parentRelationship && (
              <span className="text-xs text-red-400">
                {errors.parentRelationship.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
          <button
            type="submit"
            className="w-36 rounded-full bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 text-black"
          >
            ถัดไป
          </button>
          <button
            type="button"
            className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 py-2"
            onClick={() => setStep(1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <p>ย้อนกลับ</p>
          </button>
        </div>
      </form>
    </div>
  );
}
