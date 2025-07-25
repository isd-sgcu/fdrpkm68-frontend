
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";

import PDPAConsent from "@/components/common/PDPAConsent";
import type { AccountInfo } from "@/components/common/register/AccountStep";
import AccountStep from "@/components/common/register/AccountStep";
import CompleteStep from "@/components/common/register/CompleteStep";
import ContactInformationStep, {
  type ContactInfo,
} from "@/components/common/register/ContactInformationStep";
import HealthInformationStep, {
  type HealthInfo,
} from "@/components/common/register/HealthInformationStep";
import PersonalInformationStep, {
  type PersonalInfo,
} from "@/components/common/register/PersonalInformationStep";
import { api } from "@/lib/api";
import { showSnackbar } from "@/lib/utils";

export interface RegisterFormData
  extends PersonalInfo,
    ContactInfo,
    HealthInfo,
    AccountInfo {}

export default function RegisterForm({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const bgUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/student-form-bg.png"
      : "/firstdate/register/staff/form-bg.png";
  const [step, setStep] = useState<number>(0);
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    clearErrors,
  } = useForm<RegisterFormData>({
    defaultValues: {
      studentId: "",
      citizenId: "",
      password: "",
      passwordConfirm: "",
      // Personal Info
      prefix: "MR",
      firstName: "",
      lastName: "",
      nickname: "",
      faculty: "FACULTY_OF_ENGINEERING",
      academicYear: "1",
      // Contact Info
      phoneNumber: "",
      parentName: "",
      parentPhoneNumber: "",
      parentRelationship: "",
      // Health Info
      hasAllergies: null,
      foodAllergy: "",
      hasMedications: null,
      drugAllergy: "",
      hasChronicDiseases: null,
      illness: "",
    },
    mode: "onChange",
  });

  const formValues = watch();

  const onPersonalSubmit = useCallback((_data: PersonalInfo): void => {
    setStep(2);
  }, []);

  const onContactSubmit = useCallback((_data: ContactInfo): void => {
    setStep(3);
  }, []);

  const _onHealthSubmit = useCallback((_data: HealthInfo): void => {
    setStep(4);
  }, []);

  const onAccountSubmit = useCallback((_data: AccountInfo): void => {
    setStep(1);
  }, []);

  const onFinalSubmit = useCallback(
    async (data: RegisterFormData): Promise<void> => {
      // Prevent multiple submissions
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      try {
        const endPoint =
          userType === "FRESHMAN" ? "/auth/register" : "/auth/staff-register";

        const response = await api.post(endPoint, {
          studentId: data.studentId,
          citizenId: data.citizenId,
          password: data.password,
          prefix: data.prefix,
          firstName: data.firstName,
          lastName: data.lastName,
          nickname: data.nickname,
          faculty: data.faculty,
          academicYear: parseInt(data.academicYear),
          phoneNumber: data.phoneNumber,
          parentName: data.parentName,
          parentPhoneNumber: data.parentPhoneNumber,
          parentRelationship: data.parentRelationship,
          foodAllergy: data.hasAllergies ? data.foodAllergy : null,
          drugAllergy: data.hasMedications ? data.drugAllergy : null,
          illness: data.hasChronicDiseases ? data.illness : null,
        });

        if (response.success) {
          window.location.href = "/login";
        } else {
          showSnackbar(
            response.error || "Registration failed. Please try again.",
            "error"
          );
          setStep(3);
        }
      } catch {
        showSnackbar(
          "An unexpected error occurred. Please try again.",
          "error"
        );
        setStep(3);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, userType]
  );

  const handleConsentAccept = useCallback((): void => {
    setIsConsentGiven(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
      {!isConsentGiven && <PDPAConsent onAccept={handleConsentAccept} />}

      <div
        className="flex min-h-screen w-full items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${step === 4 ? "" : bgUrl})` }}
      >
        <div className="w-full max-w-[270px] md:max-w-[330px]">
          {step === 0 && (
            <AccountStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              control={control}
              clearErrors={clearErrors}
              watch={watch}
              onSubmit={handleSubmit(onAccountSubmit)}
              setStep={setStep}
              userType={userType}
            />
          )}
          {step === 1 && (
            <PersonalInformationStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onSubmit={handleSubmit(onPersonalSubmit)}
              setStep={setStep}
              userType={userType}
            />
          )}
          {step === 2 && (
            <ContactInformationStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onSubmit={handleSubmit(onContactSubmit)}
              setStep={setStep}
              userType={userType}
            />
          )}
          {step === 3 && (
            <HealthInformationStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              control={control}
              clearErrors={clearErrors}
              onSubmit={handleSubmit(onFinalSubmit)}
              setStep={setStep}
              userType={userType}
              isLoading={isLoading}
            />
          )}
          {step === 4 && <CompleteStep userType={userType} />}
        </div>
      </div>
    </div>
  );
}
