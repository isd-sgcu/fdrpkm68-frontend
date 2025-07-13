import { useState } from "react";
import { useForm } from "react-hook-form";
import ForgotPasswordStep from "./ForgetPasswordStep";
import LoginStep from "./LoginStep";

interface LoginFormData {
  studentId: string;
  citizenId: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function LoginForm({ userType }: { userType: 'student' | 'staff' }) {
  const bgUrl = userType === 'student' ? '/firstdate/register/student-form-bg.png' : '/firstdate/register/staff/form-bg.png';
  const [step, setStep] = useState<number>(1);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<LoginFormData>({
    defaultValues: {
      studentId: "",
      citizenId: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const formValues = watch();

  const onLoginSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    // Handle login logic here
  };

  const onForgotPasswordSubmit = (data: LoginFormData) => {
    console.log('Password reset form submitted:', data);
    // Handle password reset logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div 
        className="min-h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="max-w-[270px] w-full md:max-w-[330px]">
          {step === 1 && (
            <LoginStep
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onSubmit={handleSubmit(onLoginSubmit)}
              onForgot={() => setStep(2)}
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
              onBack={() => setStep(1)}
              userType={userType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
