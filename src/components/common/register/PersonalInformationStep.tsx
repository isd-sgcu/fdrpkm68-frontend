import type { ReactNode } from "react";

import { ChevronLeft } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";


import type { RegisterFormData } from "@/components/common/register/RegisterForm";

interface Faculty {
  text: string;
  value: string;
}

const faculties: Faculty[] = [
  {
    text: "คณะครุศาสตร์",
    value: "FACULTY_OF_EDUCATION",
  },
  {
    text: "คณะจิตวิทยา",
    value: "FACULTY_OF_PSYCHOLOGY",
  },
  {
    text: "คณะทันตแพทยศาสตร์",
    value: "FACULTY_OF_DENTISTRY",
  },
  {
    text: "คณะนิติศาสตร์",
    value: "FACULTY_OF_LAW",
  },
  {
    text: "คณะนิเทศศาสตร์",
    value: "FACULTY_OF_COMMUNICATION_ARTS",
  },
  {
    text: "คณะพยาบาลศาสตร์",
    value: "FACULTY_OF_NURSING",
  },
  {
    text: "คณะพาณิชยศาสตร์และการบัญชี",
    value: "FACULTY_OF_COMMERCE_AND_ACCOUNTANCY",
  },
  {
    text: "คณะแพทยศาสตร์",
    value: "FACULTY_OF_MEDICINE",
  },
  {
    text: "คณะเภสัชศาสตร์",
    value: "FACULTY_OF_PHAMACEUTICAL_SCIENCE",
  },
  {
    text: "คณะรัฐศาสตร์",
    value: "FACULTY_OF_POLITICAL_SCIENCE",
  },
  {
    text: "คณะวิทยาศาสตร์",
    value: "FACULTY_OF_SCIENCE",
  },
  {
    text: "คณะวิทยาศาสตร์การกีฬา",
    value: "FACULTY_OF_SPORTS_SCIENCE",
  },
  {
    text: "คณะวิศวกรรมศาสตร์",
    value: "FACULTY_OF_ENGINEERING",
  },
  {
    text: "คณะศิลปกรรมศาสตร์",
    value: "FACULTY_OF_FINE_AND_APPLIED_ARTS",
  },
  {
    text: "คณะเศรษฐศาสตร์",
    value: "FACULTY_OF_ECONOMICS",
  },
  {
    text: "คณะสถาปัตยกรรมศาสตร์",
    value: "FACULTY_OF_ARCHITECTURE",
  },
  {
    text: "คณะสหเวชศาสตร์",
    value: "FACULTY_OF_ALLIED_HEALTH_SCIENCES",
  },
  {
    text: "คณะสัตวแพทยศาสตร์",
    value: "FACULTY_OF_VETERINARY_SCIENCE",
  },
  {
    text: "คณะอักษรศาสตร์",
    value: "FACULTY_OF_ARTS",
  },
  {
    text: "สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย",
    value: "SCHOOL_OF_INTEGRATED_INNOVATION_SCII",
  },
  {
    text: "สำนักวิชาทรัพยากรการเกษตร",
    value: "SCHOOL_OF_AGRICULTURAL_RESOURCES",
  },
  {
    text: "บัณฑิตวิทยาลัย",
    value: "GRADUATE_SCHOOL",
  },
];

export interface PersonalInfo {
  prefix: string;
  firstName: string;
  lastName: string;
  nickname: string;
  faculty: string;
  academicYear: string;
}

export default function PersonalInformationStep({
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
        <h1 className="text-lg font-semibold">ข้อมูลส่วนตัว</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="prefix">
            คำนำหน้าชื่อ
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <select
              id="prefix"
              className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
              {...register("prefix")}
            >
              <option value="MR">นาย</option>
              <option value="MS">นางสาว</option>
              <option value="MRS">นาง</option>
              <option value="OTHER">ไม่ระบุ</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="firstName">
            ชื่อจริง <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="firstName"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.firstName ? "border-red-500" : ""}`}
              type="text"
              placeholder="ชื่อจริง"
              {...register("firstName", {
                required: "กรุณากรอกชื่อจริง",
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
          <label className="text-sm" htmlFor="lastName">
            นามสกุล <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="lastName"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.lastName ? "border-red-500" : ""}`}
              type="text"
              placeholder="นามสกุล"
              {...register("lastName", {
                required: "กรุณากรอกนามสกุล",
              })}
            />
          </div>
          {errors.lastName && (
            <span className="text-xs text-red-400">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="nickname">
            ชื่อเล่น <span className="text-red-400">*</span>
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <input
              id="nickname"
              className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.nickname ? "border-red-500" : ""}`}
              type="text"
              placeholder="ชื่อเล่น"
              {...register("nickname", {
                required: "กรุณากรอกชื่อเล่น",
              })}
            />
          </div>
          {errors.nickname && (
            <span className="text-xs text-red-400">
              {errors.nickname.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="faculty">
            คณะ
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <select
              id="faculty"
              className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
              {...register("faculty")}
            >
              {faculties.map((faculty) => (
                <option key={faculty.value} value={faculty.value}>
                  {faculty.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="academicYear">
            ชั้นปี
          </label>
          <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
            <select
              id="academicYear"
              className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
              {...register("academicYear")}
            >
              <option value="1">ชั้นปีที่ 1</option>
              <option value="2">ชั้นปีที่ 2</option>
              <option value="3">ชั้นปีที่ 3</option>
              <option value="4">ชั้นปีที่ 4</option>
            </select>
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
            onClick={() => setStep(0)}
          >
            <ChevronLeft className="h-4 w-4" />
            <p>ย้อนกลับ</p>
          </button>
        </div>
      </form>
    </div>
  );
}
