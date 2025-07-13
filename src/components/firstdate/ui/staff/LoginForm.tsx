import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

interface LoginFormData {
  studentId: string;
  citizenId: string;
  password: string;
}

interface ForgotPasswordFormData {
  studentId: string;
  citizenId: string;
  newPassword: string;
  confirmPassword: string;
}

function ForgotPasswordStep({
  form,
  setForm,
  onBack,
}: {
  form: any;
  setForm: any;
  onBack?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      studentId: form.studentId || "",
      citizenId: form.citizenId || "",
      newPassword: form.newPassword || "",
      confirmPassword: form.confirmPassword || ""
    }
  });

  // Watch form values to sync with parent component
  const watchedValues = watch();
  
  // Update parent form when values change
  React.useEffect(() => {
    setForm(watchedValues);
  }, [watchedValues, setForm]);

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log('Password reset form submitted:', data);
    // Handle password reset logic here
  };

  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src="/firstdate/register/staff/glob.svg" alt="Background" />
        <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className="text-sm"
            {...register("studentId")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className="text-sm"
            {...register("citizenId")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="newPassword">รหัสผ่านใหม่</label>
          <input
            id="newPassword"
            type="password"
            placeholder="รหัสผ่าน"
            className="text-sm"
            {...register("newPassword")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="confirmPassword">รหัสผ่านใหม่อีกครั้ง</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="รหัสผ่านใหม่อีกครั้ง"
            className="text-sm"
            {...register("confirmPassword")}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">รีเซตรหัสผ่าน</button>
        {onBack && (
          <button type="button" onClick={onBack} className="text-sm text-gray-400 underline">
            กลับเข้าสู่ระบบ
          </button>
        )}
      </form>
    </div>
  );
}

function LoginStep({
  form,
  setForm,
  onForgot,
}: {
  form: any;
  setForm: any;
  onForgot: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginFormData>({
    defaultValues: {
      studentId: form.studentId || "",
      citizenId: form.citizenId || "",
      password: form.password || ""
    }
  });

  // Watch form values to sync with parent component
  const watchedValues = watch();
  
  // Update parent form when values change
  React.useEffect(() => {
    setForm(watchedValues);
  }, [watchedValues, setForm]);

  const onSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    // Handle login logic here
  };

  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src="/firstdate/register/staff/glob.svg" alt="Background" />
        <h1 className="text-lg font-semibold">เข้าสู่ระบบ</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
          <input
            id="studentId"
            type="text"
            placeholder="รหัสนิสิต"
            className="text-sm"
            {...register("studentId")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
          <input
            id="citizenId"
            type="text"
            placeholder="รหัสบัตรประชาชน"
            className="text-sm"
            {...register("citizenId")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="password">รหัสผ่าน</label>
          <input
            id="password"
            type="password"
            placeholder="รหัสผ่าน"
            className="text-sm"
            {...register("password")}
          />
        </div>
        <button
          type="button"
          onClick={onForgot}
          className="text-sm text-gray-500 underline text-right"
        >
          ลืมรหัสผ่าน?
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default function LoginForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    studentId: "",
    citizenId: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="bg-[url(/firstdate/register/staff/form-bg.png)] h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center">
      <div className="max-w-[270px] w-full md:max-w-[400px]">
        {step === 1 && (
          <LoginStep
            form={form}
            setForm={setForm}
            onForgot={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <ForgotPasswordStep
            form={form}
            setForm={setForm}
            onBack={() => setStep(1)}
          />
        )}
      </div>
      </div>
    </div>
  );
}
