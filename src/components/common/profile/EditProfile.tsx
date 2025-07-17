import { type ReactNode, useEffect, useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";


import { api } from "@/lib/api";

// Define the form data structure (reuse from register)
interface EditProfileFormData {
  user: {
    // Personal Info
    prefix: string;
    firstName: string;
    lastName: string;
    nickname: string;
    faculty: string;
    academicYear: string;
    studentId: string;
    citizenId: string;
    // Contact Info
    phoneNumber: string;
    parentName: string;
    parentRelationship: string;
    parentPhoneNumber: string;
    // Health Info
    hasAllergies: boolean | null;
    foodAllergy: string;
    hasMedications: boolean | null;
    drugAllergy: string;
    hasChronicDiseases: boolean | null;
    illness: string;
  };
}

const queryClient = new QueryClient();

const faculties = [
  { text: "คณะครุศาสตร์", value: "FACULTY_OF_EDUCATION" },
  { text: "คณะจิตวิทยา", value: "FACULTY_OF_PSYCHOLOGY" },
  { text: "คณะทันตแพทยศาสตร์", value: "FACULTY_OF_DENTISTRY" },
  { text: "คณะนิติศาสตร์", value: "FACULTY_OF_LAW" },
  { text: "คณะนิเทศศาสตร์", value: "FACULTY_OF_COMMUNICATION_ARTS" },
  { text: "คณะพยาบาลศาสตร์", value: "FACULTY_OF_NURSING" },
  {
    text: "คณะพาณิชยศาสตร์และการบัญชี",
    value: "FACULTY_OF_COMMERCE_AND_ACCOUNTANCY",
  },
  { text: "คณะแพทยศาสตร์", value: "FACULTY_OF_MEDICINE" },
  { text: "คณะเภสัชศาสตร์", value: "FACULTY_OF_PHAMACEUTICAL_SCIENCE" },
  { text: "คณะรัฐศาสตร์", value: "FACULTY_OF_POLITICAL_SCIENCE" },
  { text: "คณะวิทยาศาสตร์", value: "FACULTY_OF_SCIENCE" },
  { text: "คณะวิทยาศาสตร์การกีฬา", value: "FACULTY_OF_SPORTS_SCIENCE" },
  { text: "คณะวิศวกรรมศาสตร์", value: "FACULTY_OF_ENGINEERING" },
  { text: "คณะศิลปกรรมศาสตร์", value: "FACULTY_OF_FINE_AND_APPLIED_ARTS" },
  { text: "คณะเศรษฐศาสตร์", value: "FACULTY_OF_ECONOMICS" },
  { text: "คณะสถาปัตยกรรมศาสตร์", value: "FACULTY_OF_ARCHITECTURE" },
  { text: "คณะสหเวชศาสตร์", value: "FACULTY_OF_ALLIED_HEALTH_SCIENCES" },
  { text: "คณะสัตวแพทยศาสตร์", value: "FACULTY_OF_VETERINARY_SCIENCE" },
  { text: "คณะอักษรศาสตร์", value: "FACULTY_OF_ARTS" },
  {
    text: "สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย",
    value: "SCHOOL_OF_INTEGRATED_INNOVATION_SCII",
  },
  {
    text: "สำนักวิชาทรัพยากรการเกษตร",
    value: "SCHOOL_OF_AGRICULTURAL_RESOURCES",
  },
  { text: "บัณฑิตวิทยาลัย", value: "GRADUATE_SCHOOL" },
];

function EditProfileContent({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const globUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";
  const themeColor = userType === "FRESHMAN" ? "#C6EBC5" : "#FFB6C1";
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<EditProfileFormData>({
    user: {
      prefix: "mr",
      firstName: "นาย",
      lastName: "บลา ๆ บลา ๆ",
      nickname: "น",
      faculty: "FACULTY_OF_ENGINEERING",
      academicYear: "1",
      studentId: "1234567890",
      citizenId: "1234567890123",
      phoneNumber: "0812345678",
      parentName: "นาย บลา ๆ บลา ๆ",
      parentRelationship: "พ่อ",
      parentPhoneNumber: "0812345678",
      hasAllergies: null,
      foodAllergy: "-",
      hasMedications: null,
      drugAllergy: "-",
      hasChronicDiseases: null,
      illness: "-",
    },
  });

  const getAuthToken = (): string | null => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("auth_token");
      if (localToken) {
        return localToken;
      }

      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
      return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
    }

    return null;
  };

  const {
    data: fetchedProfileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const reponse = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      return reponse.data as EditProfileFormData;
    },
  });

  useEffect(() => {
    if (fetchedProfileData && !isLoading && !isError) {
      setProfileData(fetchedProfileData);
    }
  }, [fetchedProfileData, isLoading, isError]);

  const updateProfile = async (data: EditProfileFormData): Promise<void> => {
    const formData = {
      // studentId: data.user.studentId,
      // citizenId: data.user.citizenId,
      prefix: data.user.prefix,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      nickname: data.user.nickname,
      faculty: data.user.faculty,
      academicYear: parseInt(data.user.academicYear),
      phoneNumber: data.user.phoneNumber,
      parentName: data.user.parentName,
      parentPhoneNumber: data.user.parentPhoneNumber,
      parentRelationship: data.user.parentRelationship,
      foodAllergy: data.user.hasAllergies ? data.user.foodAllergy : null,
      drugAllergy: data.user.hasMedications ? data.user.drugAllergy : null,
      illness: data.user.hasChronicDiseases ? data.user.illness : null,
    };

    const reponse = await api.patch("/user/update", formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (reponse.success) {
      setIsEditMode(false);
      // Optionally refresh the data from the server
      // queryClient.invalidateQueries(['profile']);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
    watch,
    reset: resetForm,
  } = useForm<EditProfileFormData>({
    defaultValues: profileData,
    mode: "onChange",
  });

  const formValues = watch();

  // Reset form when API data is fetched
  useEffect(() => {
    if (fetchedProfileData && !isLoading && !isError) {
      resetForm(fetchedProfileData);
    }
  }, [fetchedProfileData, isLoading, isError, resetForm]);

  const handleReturnHome = (): void => {
    window.location.href = "/home";
  };

  const onSubmit = async (data: EditProfileFormData): Promise<void> => {
    await updateProfile(data);
    setProfileData(data);
  };

  const CustomCheckbox = ({
    checked,
    onClick,
    type,
  }: {
    checked: boolean;
    onClick: () => void;
    type: "yes" | "no";
  }): ReactNode => (
    <button
      type="button"
      onClick={onClick}
      className="h-10 cursor-pointer border-none bg-transparent p-0"
      aria-label={checked ? "Checked" : "Unchecked"}
    >
      <img
        src={`/firstdate/register/${checked ? "checked" : "unchecked"}-${type}.png`}
        alt={checked ? "Checked" : "Unchecked"}
        className="h-10"
      />
    </button>
  );

  const handleHasAllergiesYes = (): void => {
    setValue("user.hasAllergies", true);
    setValue("user.foodAllergy", "");
    clearErrors("user.foodAllergy");
  };
  const handleHasAllergiesNo = (): void => {
    setValue("user.hasAllergies", false);
    setValue("user.foodAllergy", "");
    clearErrors("user.foodAllergy");
  };
  const handleHasMedicationsYes = (): void => {
    setValue("user.hasMedications", true);
    setValue("user.drugAllergy", "");
    clearErrors("user.drugAllergy");
  };
  const handleHasMedicationsNo = (): void => {
    setValue("user.hasMedications", false);
    setValue("user.drugAllergy", "");
    clearErrors("user.drugAllergy");
  };
  const handleHasChronicDiseasesYes = (): void => {
    setValue("user.hasChronicDiseases", true);
    setValue("user.illness", "");
    clearErrors("user.illness");
  };
  const handleHasChronicDiseasesNo = (): void => {
    setValue("user.hasChronicDiseases", false);
    setValue("user.illness", "");
    clearErrors("user.illness");
  };

  const watchHasAllergies = formValues.user?.hasAllergies === true;
  const watchHasMedications = formValues.user?.hasMedications === true;
  const watchHasChronicDiseases = formValues.user?.hasChronicDiseases === true;

  return (
    <section
      className={`my-3 flex min-h-screen flex-col gap-8 border-2 border-[${themeColor}] bg-[rgba(0,0,0,0.4)] p-8`}
    >
      <div className="flex justify-between underline">
        <h1 className="text-2xl font-bold">แก้ไขข้อมูล</h1>
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: themeColor, color: "black" }}
        >
          <Pencil className="h-6 w-6" onClick={() => setIsEditMode(true)} />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ข้อมูลส่วนตัว</h1>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-white">กำลังโหลดข้อมูล...</div>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-red-400">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
        </div>
      ) : isEditMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Personal Information */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="prefix">
              คำนำหน้าชื่อ
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <select
                id="prefix"
                className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
                {...register("user.prefix")}
              >
                <option value="mr">นาย</option>
                <option value="ms">นางสาว</option>
                <option value="mrs">นาง</option>
              </select>
            </div>
            <label className="text-sm" htmlFor="firstName">
              ชื่อจริง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="firstName"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.firstName ? "border-red-500" : ""}`}
                type="text"
                placeholder="ชื่อจริง"
                {...register("user.firstName", {
                  required: "กรุณากรอกชื่อจริง",
                })}
              />
            </div>
            {errors.user?.firstName && (
              <span className="text-xs text-red-400">
                {errors.user.firstName.message}
              </span>
            )}
            <label className="text-sm" htmlFor="lastName">
              นามสกุล <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="lastName"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.lastName ? "border-red-500" : ""}`}
                type="text"
                placeholder="นามสกุล"
                {...register("user.lastName", { required: "กรุณากรอกนามสกุล" })}
              />
            </div>
            {errors.user?.lastName && (
              <span className="text-xs text-red-400">
                {errors.user.lastName.message}
              </span>
            )}
            <label className="text-sm" htmlFor="nickname">
              ชื่อเล่น <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="nickname"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.nickname ? "border-red-500" : ""}`}
                type="text"
                placeholder="ชื่อเล่น"
                {...register("user.nickname", {
                  required: "กรุณากรอกชื่อเล่น",
                })}
              />
            </div>
            {errors.user?.nickname && (
              <span className="text-xs text-red-400">
                {errors.user.nickname.message}
              </span>
            )}
            <label className="text-sm" htmlFor="faculty">
              คณะ
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <select
                id="faculty"
                className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
                {...register("user.faculty")}
              >
                {faculties.map((faculty) => (
                  <option key={faculty.value} value={faculty.value}>
                    {faculty.text}
                  </option>
                ))}
              </select>
            </div>
            <label className="text-sm" htmlFor="academicYear">
              ชั้นปี
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <select
                id="academicYear"
                className="h-full w-full rounded-sm bg-black p-1 text-sm text-white"
                {...register("user.academicYear")}
              >
                <option value="1">ชั้นปีที่ 1</option>
                <option value="2">ชั้นปีที่ 2</option>
                <option value="3">ชั้นปีที่ 3</option>
                <option value="4">ชั้นปีที่ 4</option>
              </select>
            </div>
            {/* Removed editable studentId and citizenId fields */}
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          {/* Contact Information */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="phoneNumber">
              เบอร์โทรศัพท์ <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="phoneNumber"
                type="text"
                placeholder="เบอร์โทรศัพท์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.phoneNumber ? "border-red-500" : ""}`}
                {...register("user.phoneNumber", {
                  required: "กรุณากรอกเบอร์โทรศัพท์",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                  },
                })}
              />
            </div>
            {errors.user?.phoneNumber && (
              <span className="text-xs text-red-400">
                {errors.user.phoneNumber.message}
              </span>
            )}
            <label className="text-sm" htmlFor="parentName">
              ชื่อผู้ปกครอง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentName"
                type="text"
                placeholder="ชื่อผู้ปกครอง"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.parentName ? "border-red-500" : ""}`}
                {...register("user.parentName", {
                  required: "กรุณากรอกชื่อผู้ปกครอง",
                })}
              />
            </div>
            {errors.user?.parentName && (
              <span className="text-xs text-red-400">
                {errors.user.parentName.message}
              </span>
            )}
            <label className="text-sm" htmlFor="parentRelationship">
              ความสัมพันธ์ <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentRelationship"
                type="text"
                placeholder="ความสัมพันธ์"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.parentRelationship ? "border-red-500" : ""}`}
                {...register("user.parentRelationship", {
                  required: "กรุณากรอกความสัมพันธ์",
                  minLength: {
                    value: 2,
                    message: "กรุณากรอกความสัมพันธ์ให้ชัดเจน",
                  },
                })}
              />
            </div>
            {errors.user?.parentRelationship && (
              <span className="text-xs text-red-400">
                {errors.user.parentRelationship.message}
              </span>
            )}
            <label className="text-sm" htmlFor="parentPhoneNumber">
              เบอร์โทรศัพท์ของผู้ปกครอง <span className="text-red-400">*</span>
            </label>
            <div className="cut-edge-all-sm w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <input
                id="parentPhoneNumber"
                type="text"
                placeholder="เบอร์โทรศัพท์ของผู้ปกครอง"
                className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.parentPhoneNumber ? "border-red-500" : ""}`}
                {...register("user.parentPhoneNumber", {
                  required: "กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                  },
                })}
              />
            </div>
            {errors.user?.parentPhoneNumber && (
              <span className="text-xs text-red-400">
                {errors.user.parentPhoneNumber.message}
              </span>
            )}
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          {/* Health Information */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="foodAllergy">
              อาหารที่แพ้ / ข้อจำกัดด้านอาหาร
            </label>
            <div className="flex gap-2">
              <Controller
                name="user.hasAllergies"
                control={control}
                rules={{
                  validate: (v) =>
                    v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
                }}
                render={({ field }) => (
                  <div className="flex w-full justify-between">
                    <CustomCheckbox
                      checked={field.value === true}
                      onClick={handleHasAllergiesYes}
                      type="yes"
                    />
                    <CustomCheckbox
                      checked={field.value === false}
                      onClick={handleHasAllergiesNo}
                      type="no"
                    />
                  </div>
                )}
              />
            </div>
            {errors.user?.hasAllergies && (
              <span className="text-xs text-red-400">
                {errors.user.hasAllergies.message}
              </span>
            )}
            {watchHasAllergies && (
              <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <Controller
                  name="user.foodAllergy"
                  control={control}
                  rules={{ required: "กรุณาระบุอาหารที่แพ้" }}
                  render={({ field }) => (
                    <input
                      id="foodAllergy"
                      type="text"
                      placeholder="อาหารที่แพ้"
                      className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.foodAllergy ? "border-red-500" : ""}`}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
            {errors.user?.foodAllergy && (
              <span className="text-xs text-red-400">
                {errors.user.foodAllergy.message}
              </span>
            )}
            <label className="text-sm" htmlFor="drugAllergy">
              ยาที่แพ้
            </label>
            <div className="flex gap-2">
              <Controller
                name="user.hasMedications"
                control={control}
                rules={{
                  validate: (v) =>
                    v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
                }}
                render={({ field }) => (
                  <div className="flex w-full justify-between">
                    <CustomCheckbox
                      checked={field.value === true}
                      onClick={handleHasMedicationsYes}
                      type="yes"
                    />
                    <CustomCheckbox
                      checked={field.value === false}
                      onClick={handleHasMedicationsNo}
                      type="no"
                    />
                  </div>
                )}
              />
            </div>
            {errors.user?.hasMedications && (
              <span className="text-xs text-red-400">
                {errors.user.hasMedications.message}
              </span>
            )}
            {watchHasMedications && (
              <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <Controller
                  name="user.drugAllergy"
                  control={control}
                  rules={{ required: "กรุณาระบุยาที่แพ้" }}
                  render={({ field }) => (
                    <input
                      id="drugAllergy"
                      type="text"
                      placeholder="ยาที่แพ้"
                      className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.drugAllergy ? "border-red-500" : ""}`}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
            {errors.user?.drugAllergy && (
              <span className="text-xs text-red-400">
                {errors.user.drugAllergy.message}
              </span>
            )}
            <label className="text-sm" htmlFor="illness">
              โรคประจำตัว
            </label>
            <div className="flex gap-2">
              <Controller
                name="user.hasChronicDiseases"
                control={control}
                rules={{
                  validate: (v) =>
                    v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
                }}
                render={({ field }) => (
                  <div className="flex w-full justify-between">
                    <CustomCheckbox
                      checked={field.value === true}
                      onClick={handleHasChronicDiseasesYes}
                      type="yes"
                    />
                    <CustomCheckbox
                      checked={field.value === false}
                      onClick={handleHasChronicDiseasesNo}
                      type="no"
                    />
                  </div>
                )}
              />
            </div>
            {errors.user?.hasChronicDiseases && (
              <span className="text-xs text-red-400">
                {errors.user.hasChronicDiseases.message}
              </span>
            )}
            {watchHasChronicDiseases && (
              <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <Controller
                  name="user.illness"
                  control={control}
                  rules={{ required: "กรุณาระบุโรคประจำตัว" }}
                  render={({ field }) => (
                    <input
                      id="illness"
                      type="text"
                      placeholder="โรคประจำตัว"
                      className={`h-full w-full rounded-sm bg-black p-1 text-sm ${errors.user?.illness ? "border-red-500" : ""}`}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
            {errors.user?.illness && (
              <span className="text-xs text-red-400">
                {errors.user.illness.message}
              </span>
            )}
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          <div className="flex w-full flex-col items-center gap-4">
            <button
              type="submit"
              className="w-36 rounded-full bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 text-black"
            >
              บันทึก
            </button>
            <button
              type="button"
              className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 py-2"
              onClick={() => setIsEditMode(false)}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Personal Information */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>ชื่อ:</span>
              <p>
                {profileData.user.prefix === "mr"
                  ? "นาย"
                  : profileData.user.prefix === "ms"
                    ? "นางสาว"
                    : "นาง"}{" "}
                {profileData.user.firstName} {profileData.user.lastName}
              </p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>ชื่อเล่น:</span>
              <p>{profileData.user.nickname}</p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>คณะ:</span>
              <p>
                {faculties.find((f) => f.value === profileData.user.faculty)
                  ?.text || ""}
              </p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>รหัสนิสิต:</span>
              <p>{profileData.user.studentId}</p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>รหัสประชาชน:</span>
              <p>{profileData.user.citizenId}</p>
            </div>
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>เบอร์โทรศัพท์:</span>
              <p>{profileData.user.phoneNumber}</p>
            </div>
            <hr className="m-2 w-48 self-center" />
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>ผู้ปกครอง:</span>
              <p>{profileData.user.parentName}</p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>ความสัมพันธ์:</span>
              <p>{profileData.user.parentRelationship}</p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>เบอร์โทรศัพท์:</span>
              <p>{profileData.user.parentPhoneNumber}</p>
            </div>
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          {/* Health Information */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>
                อาหารที่แพ้ / ข้อจำกัดด้านอาหาร:
              </span>
              <p>
                {profileData.user.hasAllergies === true
                  ? profileData.user.foodAllergy
                  : profileData.user.hasAllergies === false
                    ? "ไม่มี"
                    : "-"}
              </p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>ยาที่แพ้:</span>
              <p>
                {profileData.user.hasMedications === true
                  ? profileData.user.drugAllergy
                  : profileData.user.hasMedications === false
                    ? "ไม่มี"
                    : "-"}
              </p>
            </div>
            <div className="flex justify-between">
              <span className={`text-[${themeColor}]`}>โรคประจำตัว:</span>
              <p>
                {profileData.user.hasChronicDiseases === true
                  ? profileData.user.illness
                  : profileData.user.hasChronicDiseases === false
                    ? "ไม่มี"
                    : "-"}
              </p>
            </div>
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          {/* Security Information */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[${themeColor}]`}>รหัสผ่าน:</span>
              <button
                className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 py-2"
                onClick={() => (window.location.href = "/login")}
              >
                รีเซ็ตรหัสผ่าน
              </button>
            </div>
          </div>
          <img
            src="/firstdate/register/divider.png"
            alt="Divider"
            className="w-full"
          />
          <button
            onClick={handleReturnHome}
            className="bg-white py-2 text-black"
          >
            กลับสู่หน้าหลัก
          </button>
        </>
      )}
    </section>
  );
}

export default function EditProfile({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <EditProfileContent userType={userType} />
    </QueryClientProvider>
  );
}
