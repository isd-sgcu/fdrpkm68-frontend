import { useState } from "react";
import ForgotPasswordStep from "./ForgetPasswordStep";
import LoginStep from "./LoginStep";

export default function LoginForm({ userType }: { userType: 'student' | 'staff' }) {
  const bgUrl = userType === 'student' ? '/firstdate/register/student-form-bg.png' : '/firstdate/register/staff/form-bg.png';
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    studentId: "",
    citizenId: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  console.log(bgUrl)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div 
        className="min-h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="max-w-[270px] w-full md:max-w-[330px]">
          {step === 1 && (
            <LoginStep
              form={form}
              setForm={setForm}
              onForgot={() => setStep(2)}
              userType={userType}
            />
          )}
          {step === 2 && (
            <ForgotPasswordStep
              form={form}
              setForm={setForm}
              onBack={() => setStep(1)}
              userType={userType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
