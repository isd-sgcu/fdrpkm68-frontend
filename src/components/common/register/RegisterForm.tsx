import { useState } from "react";
import { useForm } from "react-hook-form";
import PDPAConsent from "../PDPAConsent";
import CompleteStep from "./CompleteStep";
import HealthInformationStep, { type HealthInfo } from "./HealthInformationStep";
import ContactInformationStep, { type ContactInfo } from "./ContactInformationStep";
import PersonalInformationStep, { type PersonalInfo } from "./PersonalInformationStep";

interface RegisterFormData extends PersonalInfo, ContactInfo, HealthInfo {}

export default function RegisterForm({ userType }: { userType: 'student' | 'staff' }) {
    const bgUrl = userType === 'student' ? '/firstdate/register/student-form-bg.png' : '/firstdate/register/staff/form-bg.png';
    const [step, setStep] = useState<number>(1);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        control,
        clearErrors
    } = useForm<RegisterFormData>({
        defaultValues: {
            // Personal Info
            title: 'mr',
            firstName: '',
            lastName: '',
            nickname: '',
            faculty: 'engineering',
            year: '1',
            // Contact Info
            phoneNumber: '',
            guardianPhoneNumber: '',
            guardianRelationship: '',
            // Health Info
            hasAllergies: null,
            allergies: '',
            hasMedications: null,
            medications: '',
            hasChronicDiseases: null,
            chronicDiseases: ''
        },
        mode: 'onChange'
    });

    const formValues = watch();

    const onPersonalSubmit = (data: PersonalInfo) => {
        setStep(2);
    };

    const onContactSubmit = (data: ContactInfo) => {
        setStep(3);
    };

    const onHealthSubmit = (data: HealthInfo) => {
        setStep(4);
    };

    const onFinalSubmit = (data: RegisterFormData) => {
        console.log('Final form submitted:', data);
        // Handle final form submission
    };

    return <div className="flex flex-col items-center justify-center min-h-screen text-white">
        {!isConsentGiven && <PDPAConsent onAccept={() => setIsConsentGiven(true)} />}
        
        <div 
            className="min-h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center"
            style={{ backgroundImage: `url(${step === 4 ? '' : bgUrl})` }}
        >
        <div className="max-w-[270px] w-full md:max-w-[330px]">
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
                    onSubmit={handleSubmit(onHealthSubmit)}
                    setStep={setStep} 
                    userType={userType}
                />
            )}
            {step === 4 && <CompleteStep userType={userType} />}    
        </div>
        </div>
    </div>
}