import { useState } from "react";
import PDPAConsent from "../PDPAConsent";
import CompleteStep from "./CompleteStep";
import HealthInformationStep, { type HealthInfo } from "./HealthInformationStep";
import ContactInformationStep, { type ContactInfo } from "./ContactInformationStep";
import PersonalInformationStep, { type PersonalInfo } from "./PersonalInformationStep";

export default function RegisterForm({ userType }: { userType: 'student' | 'staff' }) {
    const bgUrl = userType === 'student' ? '/firstdate/register/form-bg.png' : '/firstdate/register/staff/form-bg.png';
    const [step, setStep] = useState<number>(1);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        title: 'mr',
        firstName: '',
        lastName: '',
        nickname: '',
        faculty: 'engineering',
        year: '1'
    });

    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        phoneNumber: '',
        guardianPhoneNumber: '',
        guardianRelationship: ''
    });

    const [healthInfo, setHealthInfo] = useState<HealthInfo>({
        hasAllergies: null,
        allergies: '',
        hasMedications: null,
        medications: '',
        hasChronicDiseases: null,
        chronicDiseases: ''
    });

    return <div className="flex flex-col items-center justify-center min-h-screen text-white">
        {!isConsentGiven && <PDPAConsent onAccept={() => setIsConsentGiven(true)} />}
        
        <div className={`bg-[url(${bgUrl})] h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center`}>
        <div className="max-w-[270px] w-full md:max-w-[400px]">
            {step === 1 && (
                <PersonalInformationStep 
                    setStep={setStep} 
                    personalInfo={personalInfo} 
                    setPersonalInfo={setPersonalInfo} 
                    userType={userType}
                />
            )}
            {step === 2 && (
                <ContactInformationStep 
                    setStep={setStep} 
                    contactInfo={contactInfo} 
                    setContactInfo={setContactInfo} 
                    userType={userType}
                />
            )}
            {step === 3 && (
                <HealthInformationStep 
                    setStep={setStep} 
                    healthInfo={healthInfo} 
                    setHealthInfo={setHealthInfo} 
                    userType={userType}
                />
            )}
            {step === 4 && <CompleteStep userType={userType} />}    
        </div>
        </div>
    </div>
}