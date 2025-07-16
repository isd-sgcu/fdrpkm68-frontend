
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";

import ForgotPasswordStep from "@/components/common/login/ForgetPasswordStep";
import LoginStep from "@/components/common/login/LoginStep";
import { api } from "@/lib/api";
import { showSnackbar } from "@/lib/utils";

interface LoginFormData {
  studentId: string;
  citizenId: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function LoginForm({
  userType,
}: {
  userType: "FRESHMAN" | "STAFF";
}): ReactNode {
  const bgUrl =
    userType === "FRESHMAN"
      ? "/firstdate/register/student-form-bg.png"
      : "/firstdate/register/staff/form-bg.png";
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    defaultValues: {
      studentId: "",
      citizenId: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  const onLoginSubmit = useCallback(
    async (data: LoginFormData): Promise<void> => {
      const response = await api.post("/auth/login", {
        studentId: data.studentId,
        citizenId: data.citizenId,
        password: data.password,
      });

      if (response.success) {
        window.location.href = "/firstdate/home";
      } else {
        showSnackbar(
          response.error || "Login failed. Please try again.",
          "error"
        );
      }
    },
    []
  );

  const onForgotPasswordSubmit = useCallback((data: LoginFormData): void => {
    console.log("Password reset form submitted:", data);
    // Handle password reset logic here
  }, []);

  const handleForgot = useCallback((): void => {
    setStep(2);
  }, []);

  const handleBack = useCallback((): void => {
    setStep(1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
      <div
        className="flex min-h-screen w-full items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="w-full max-w-[270px] md:max-w-[330px]">
          {step === 1 && (
            <LoginStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onSubmit={handleSubmit(onLoginSubmit)}
              onForgot={handleForgot}
              userType={userType}
            />
          )}
          {step === 2 && (
            <ForgotPasswordStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onSubmit={handleSubmit(onForgotPasswordSubmit)}
              onBack={handleBack}
              userType={userType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
