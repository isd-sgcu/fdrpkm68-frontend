import { useCallback } from "react";
import type { ReactNode } from "react";

import { ChevronLeft } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Controller } from "react-hook-form";


import type { RegisterFormData } from "@/components/common/register/RegisterForm";

export interface HealthInfo {
  hasAllergies: boolean | null;
  foodAllergy: string;
  hasMedications: boolean | null;
  drugAllergy: string;
  hasChronicDiseases: boolean | null;
  illness: string;
}

export default function HealthInformationStep({
  register: _register,
  errors,
  formValues,
  setValue,
  control,
  clearErrors,
  onSubmit,
  setStep,
  userType,
  isLoading = false,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  formValues: RegisterFormData;
  setValue: UseFormSetValue<RegisterFormData>;
  control: Control<RegisterFormData>;
  clearErrors: UseFormClearErrors<RegisterFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setStep: (step: number) => void;
  userType: "FRESHMAN" | "STAFF";
  isLoading?: boolean;
}): ReactNode {
  const globUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/glob.svg"
      : "/firstdate/register/staff/glob.svg";

  const watchHasAllergies = formValues.hasAllergies === true;
  const watchHasMedications = formValues.hasMedications === true;
  const watchHasChronicDiseases = formValues.hasChronicDiseases === true;

  const CustomCheckbox = useCallback(
    ({
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
    ),
    []
  );

  const handleAllergiesYes = useCallback(() => {
    setValue("hasAllergies", true);
    setValue("foodAllergy", "");
    clearErrors("foodAllergy");
  }, [setValue, clearErrors]);

  const handleAllergiesNo = useCallback(() => {
    setValue("hasAllergies", false);
    setValue("foodAllergy", "");
    clearErrors("foodAllergy");
  }, [setValue, clearErrors]);

  const handleMedicationsYes = useCallback(() => {
    setValue("hasMedications", true);
    setValue("drugAllergy", "");
    clearErrors("drugAllergy");
  }, [setValue, clearErrors]);

  const handleMedicationsNo = useCallback(() => {
    setValue("hasMedications", false);
    setValue("drugAllergy", "");
    clearErrors("drugAllergy");
  }, [setValue, clearErrors]);

  const handleChronicDiseasesYes = useCallback(() => {
    setValue("hasChronicDiseases", true);
    setValue("illness", "");
    clearErrors("illness");
  }, [setValue, clearErrors]);

  const handleChronicDiseasesNo = useCallback(() => {
    setValue("hasChronicDiseases", false);
    setValue("illness", "");
    clearErrors("illness");
  }, [setValue, clearErrors]);

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ข้อมูลด้านสุขภาพ</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2 text-sm">
        {/* Section: Allergies */}
        <div className="flex flex-col items-start gap-2 py-2">
          <label htmlFor="allergies">
            อาหารที่แพ้ <span className="text-red-400">*</span>
          </label>
          <div className="flex w-full justify-between gap-2 px-2">
            <Controller
              name="hasAllergies"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={handleAllergiesYes}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={handleAllergiesNo}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasAllergies && (
            <span className="text-xs text-red-400">
              {errors.hasAllergies.message}
            </span>
          )}
          {watchHasAllergies && (
            <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <Controller
                name="foodAllergy"
                control={control}
                rules={{
                  required: "กรุณาระบุอาหารที่แพ้",
                }}
                render={({ field }) => (
                  <input
                    id="foodAllergy"
                    type="text"
                    placeholder="อาหารที่แพ้"
                    className={`h-full w-full rounded-sm bg-black p-1 text-sm ${
                      errors.foodAllergy ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.foodAllergy && (
            <span className="text-xs text-red-400">
              {errors.foodAllergy.message}
            </span>
          )}
        </div>

        {/* Section: Medications */}
        <div className="flex flex-col items-start gap-2 py-2">
          <label htmlFor="medications">
            ยาที่แพ้ <span className="text-red-400">*</span>
          </label>
          <div className="flex w-full justify-between gap-2 px-2">
            <Controller
              name="hasMedications"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={handleMedicationsYes}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={handleMedicationsNo}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasMedications && (
            <span className="text-xs text-red-400">
              {errors.hasMedications.message}
            </span>
          )}
          {watchHasMedications && (
            <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <Controller
                name="drugAllergy"
                control={control}
                rules={{
                  required: "กรุณาระบุยาที่แพ้",
                }}
                render={({ field }) => (
                  <input
                    id="drugAllergy"
                    type="text"
                    placeholder="ยาที่แพ้"
                    className={`h-full w-full rounded-sm bg-black p-1 text-sm ${
                      errors.drugAllergy ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.drugAllergy && (
            <span className="text-xs text-red-400">
              {errors.drugAllergy.message}
            </span>
          )}
        </div>

        {/* Section: Chronic Diseases */}
        <div className="flex flex-col items-start gap-2 py-2">
          <label htmlFor="chronicDiseases">
            โรคประจำตัว <span className="text-red-400">*</span>
          </label>
          <div className="flex w-full justify-between gap-2 px-2">
            <Controller
              name="hasChronicDiseases"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || "กรุณาเลือกมีหรือไม่มี",
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={handleChronicDiseasesYes}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={handleChronicDiseasesNo}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasChronicDiseases && (
            <span className="text-xs text-red-400">
              {errors.hasChronicDiseases.message}
            </span>
          )}
          {watchHasChronicDiseases && (
            <div className="cut-edge-all-sm mt-2 w-full bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
              <Controller
                name="illness"
                control={control}
                rules={{
                  required: "กรุณาระบุโรคประจำตัว",
                }}
                render={({ field }) => (
                  <input
                    id="illness"
                    type="text"
                    placeholder="โรคประจำตัว"
                    className={`h-full w-full rounded-sm bg-black p-1 text-sm ${
                      errors.illness ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.illness && (
            <span className="text-xs text-red-400">
              {errors.illness.message}
            </span>
          )}
        </div>

        <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-36 rounded-full py-2 text-black transition-colors duration-200 ${
              isLoading
                ? "cursor-not-allowed bg-gradient-to-t from-gray-400 to-gray-300"
                : "bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] hover:from-[#FFB6C1]/80 hover:to-[#FFFFF2]/80"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
                กำลังสมัคร...
              </div>
            ) : (
              "ถัดไป"
            )}
          </button>
          <button
            type="button"
            className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 py-2"
            onClick={() => setStep(2)}
          >
            <ChevronLeft className="h-4 w-4" />
            <p>ย้อนกลับ</p>
          </button>
        </div>
      </form>
    </div>
  );
}
