import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import {
  Controller,
  useWatch,
  type UseFormRegister,
  type FieldErrors,
  type UseFormSetValue,
  type Control,
  type UseFormClearErrors,
} from "react-hook-form";

export interface HealthInfo {
  hasAllergies: boolean | null;
  allergies: string;
  hasMedications: boolean | null;
  medications: string;
  hasChronicDiseases: boolean | null;
  chronicDiseases: string;
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

export default function HealthInformationStep({
  register,
  errors,
  formValues,
  setValue,
  control,
  clearErrors,
  onSubmit,
  setStep,
  userType,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  formValues: RegisterFormData;
  setValue: UseFormSetValue<RegisterFormData>;
  control: Control<RegisterFormData>;
  clearErrors: UseFormClearErrors<RegisterFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setStep: (step: number) => void;
  userType: 'student' | 'staff';
}) {
  const globUrl =
    userType === 'student'
      ? '/firstdate/register/glob.svg'
      : '/firstdate/register/staff/glob.svg';

  const watchHasAllergies = useWatch({ control, name: 'hasAllergies' });
  const watchHasMedications = useWatch({ control, name: 'hasMedications' });
  const watchHasChronicDiseases = useWatch({
    control,
    name: 'hasChronicDiseases',
  });

  useEffect(() => {
    if (formValues.hasAllergies === false) {
      clearErrors('allergies');
      setValue('allergies', '');
    }
    if (formValues.hasMedications === false) {
      clearErrors('medications');
      setValue('medications', '');
    }
    if (formValues.hasChronicDiseases === false) {
      clearErrors('chronicDiseases');
      setValue('chronicDiseases', '');
    }
  }, [
    formValues.hasAllergies,
    formValues.hasMedications,
    formValues.hasChronicDiseases,
    clearErrors,
    setValue,
  ]);

  const CustomCheckbox = ({
    checked,
    onClick,
    type,
  }: {
    checked: boolean;
    onClick: () => void;
    type: 'yes' | 'no';
  }) => (
    <img
      src={`/firstdate/register/${checked ? 'checked' : 'unchecked'}-${type}.png`}
      alt={checked ? 'Checked' : 'Unchecked'}
      className="h-10 cursor-pointer"
      onClick={onClick}
    />
  );

  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src={globUrl} alt="Background" />
        <h1 className="text-lg font-semibold">ข้อมูลด้านสุขภาพ</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2 text-sm">
        {/* Section: Allergies */}
        <div className="flex flex-col items-start py-2 gap-2">
          <label htmlFor="allergies">
            อาหารที่แพ้ <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2 justify-between w-full px-2">
            <Controller
              name="hasAllergies"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || 'กรุณาเลือกมีหรือไม่มี',
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={() => {
                      field.onChange(true);
                      setValue('allergies', '');
                      clearErrors('allergies');
                    }}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={() => {
                      field.onChange(false);
                      setValue('allergies', '');
                      clearErrors('allergies');
                    }}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasAllergies && (
            <span className="text-red-400 text-xs">
              {errors.hasAllergies.message}
            </span>
          )}
          {watchHasAllergies && (
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
              <Controller
                name="allergies"
                control={control}
                rules={{
                  required: 'กรุณาระบุอาหารที่แพ้',
                }}
                render={({ field }) => (
                  <input
                    id="allergies"
                    type="text"
                    placeholder="อาหารที่แพ้"
                    className={`text-sm bg-black w-full h-full p-1 rounded-sm ${
                      errors.allergies ? 'border-red-500' : ''
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.allergies && (
            <span className="text-red-400 text-xs">
              {errors.allergies.message}
            </span>
          )}
        </div>

        {/* Section: Medications */}
        <div className="flex flex-col items-start py-2 gap-2">
          <label htmlFor="medications">
            ยาที่แพ้ <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2 justify-between w-full px-2">
            <Controller
              name="hasMedications"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || 'กรุณาเลือกมีหรือไม่มี',
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={() => {
                      field.onChange(true);
                      setValue('medications', '');
                      clearErrors('medications');
                    }}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={() => {
                      field.onChange(false);
                      setValue('medications', '');
                      clearErrors('medications');
                    }}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasMedications && (
            <span className="text-red-400 text-xs">
              {errors.hasMedications.message}
            </span>
          )}
          {watchHasMedications && (
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
              <Controller
                name="medications"
                control={control}
                rules={{
                  required: 'กรุณาระบุยาที่แพ้',
                }}
                render={({ field }) => (
                  <input
                    id="medications"
                    type="text"
                    placeholder="ยาที่แพ้"
                    className={`text-sm bg-black w-full h-full p-1 rounded-sm ${
                      errors.medications ? 'border-red-500' : ''
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.medications && (
            <span className="text-red-400 text-xs">
              {errors.medications.message}
            </span>
          )}
        </div>

        {/* Section: Chronic Diseases */}
        <div className="flex flex-col items-start py-2 gap-2">
          <label htmlFor="chronicDiseases">
            โรคประจำตัว <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2 justify-between w-full px-2">
            <Controller
              name="hasChronicDiseases"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || 'กรุณาเลือกมีหรือไม่มี',
              }}
              render={({ field }) => (
                <>
                  <CustomCheckbox
                    checked={field.value === true}
                    onClick={() => {
                      field.onChange(true);
                      setValue('chronicDiseases', '');
                      clearErrors('chronicDiseases');
                    }}
                    type="yes"
                  />
                  <CustomCheckbox
                    checked={field.value === false}
                    onClick={() => {
                      field.onChange(false);
                      setValue('chronicDiseases', '');
                      clearErrors('chronicDiseases');
                    }}
                    type="no"
                  />
                </>
              )}
            />
          </div>
          {errors.hasChronicDiseases && (
            <span className="text-red-400 text-xs">
              {errors.hasChronicDiseases.message}
            </span>
          )}
          {watchHasChronicDiseases && (
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
              <Controller
                name="chronicDiseases"
                control={control}
                rules={{
                  required: 'กรุณาระบุโรคประจำตัว',
                }}
                render={({ field }) => (
                  <input
                    id="chronicDiseases"
                    type="text"
                    placeholder="โรคประจำตัว"
                    className={`text-sm bg-black w-full h-full p-1 rounded-sm ${
                      errors.chronicDiseases ? 'border-red-500' : ''
                    }`}
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {errors.chronicDiseases && (
            <span className="text-red-400 text-xs">
              {errors.chronicDiseases.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-4">
          <button
            type="submit"
            className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"
          >
            ถัดไป
          </button>
          <button
            type="button"
            className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full flex items-center justify-center gap-2"
            onClick={() => setStep(2)}
          >
            <ChevronLeft className="w-4 h-4" />
            <p>ย้อนกลับ</p>
          </button>
        </div>
      </form>
    </div>
  );
}
