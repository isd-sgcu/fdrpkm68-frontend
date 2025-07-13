import { ChevronLeft } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import type { ReactNode } from "react";

export interface ContactInfo {
  phoneNumber: string;
  guardianPhoneNumber: string;
  guardianRelationship: string;
}

interface RegisterFormData {
  title: string;
  firstName: string;
  lastName: string;
  nickname: string;
  faculty: string;
  year: string;
  phoneNumber: string;
  guardianPhoneNumber: string;
  guardianRelationship: string;
  hasAllergies: boolean | null;
  allergies: string;
  hasMedications: boolean | null;
  medications: string;
  hasChronicDiseases: boolean | null;
  chronicDiseases: string;
}

export default function ContactInformationStep({
  register,
  errors,
  formValues,
  setValue,
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
  userType: "student" | "staff";
}): ReactNode {
  const globUrl =
    userType === "student"
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
            <label className="text-sm" htmlFor="guardianPhoneNumber">
              เบอร์โทรศัพท์ของผู้ปกครอง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="guardianPhoneNumber"
                type="text"
                placeholder="เบอร์โทรศัพท์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.guardianPhoneNumber ? "border-red-500" : ""}`}
                {...register("guardianPhoneNumber", {
                  required: "กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                  },
                })}
              />
            </div>
            {errors.guardianPhoneNumber && (
              <span className="text-xs text-red-400">
                {errors.guardianPhoneNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="guardianRelationship">
              ความสัมพันธ์ <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="guardianRelationship"
                type="text"
                placeholder="ความสัมพันธ์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.guardianRelationship ? "border-red-500" : ""}`}
                {...register("guardianRelationship", {
                  required: "กรุณากรอกความสัมพันธ์",
                  minLength: {
                    value: 2,
                    message: "กรุณากรอกความสัมพันธ์ให้ชัดเจน",
                  },
                })}
              />
            </div>
            {errors.guardianRelationship && (
              <span className="text-xs text-red-400">
                {errors.guardianRelationship.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
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
