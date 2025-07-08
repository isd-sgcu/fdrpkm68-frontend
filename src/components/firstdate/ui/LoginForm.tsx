import { useState } from "react";
import PDPAConsent from "./PDPAConsent";

function ForgotPasswordStep({
  form,
  setForm,
  onBack,
}: {
  form: any;
  setForm: any;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src="/firstdate/register/glob.svg" alt="Background" />
        <h1 className="text-lg font-semibold">ลืมรหัสผ่าน</h1>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
        <input
          id="studentId"
          type="text"
          placeholder="รหัสนิสิต"
          className="text-sm"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
        <input
          id="citizenId"
          type="text"
          placeholder="รหัสบัตรประชาชน"
          className="text-sm"
          value={form.citizenId}
          onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="newPassword">รหัสผ่านใหม่</label>
        <input
          id="newPassword"
          type="password"
          placeholder="รหัสผ่าน"
          className="text-sm"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="confirmPassword">รหัสผ่านใหม่อีกครั้ง</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="รหัสผ่านใหม่อีกครั้ง"
          className="text-sm"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">รีเซตรหัสผ่าน</button>
      {onBack && (
        <button onClick={onBack} className="text-sm text-gray-400 underline">
          กลับเข้าสู่ระบบ
        </button>
      )}
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
  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <img src="/firstdate/register/glob.svg" alt="Background" />
        <h1 className="text-lg font-semibold">เข้าสู่ระบบ</h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="studentId">รหัสนิสิต</label>
        <input
          id="studentId"
          type="text"
          placeholder="รหัสนิสิต"
          className="text-sm"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="citizenId">รหัสบัตรประชาชน</label>
        <input
          id="citizenId"
          type="text"
          placeholder="รหัสบัตรประชาชน"
          className="text-sm"
          value={form.citizenId}
          onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="password">รหัสผ่าน</label>
        <input
          id="password"
          type="password"
          placeholder="รหัสผ่าน"
          className="text-sm"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button
        onClick={onForgot}
        className="text-sm text-gray-500 underline text-right"
      >
        ลืมรหัสผ่าน?
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">เข้าสู่ระบบ</button>
    </div>
  );
}

export default function LoginForm() {
  const [step, setStep] = useState<number>(1);
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
  const [form, setForm] = useState({
    studentId: "",
    citizenId: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {!isConsentGiven && <PDPAConsent onAccept={() => setIsConsentGiven(true)} />}

      <div className="bg-[url(/firstdate/register/form-bg.png)] h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center">
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
