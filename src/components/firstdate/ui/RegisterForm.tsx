import { useState } from "react";
import PDPAConsent from "./PDPAConsent";

interface PersonalInfo {
    title: string;
    firstName: string;
    lastName: string;
    nickname: string;
    faculty: string;
    year: string;
}

interface ContactInfo {
    phoneCountryCode: string;
    phoneNumber: string;
    guardianPhoneCountryCode: string;
    guardianPhoneNumber: string;
    guardianRelationship: string;
}

interface HealthInfo {
    hasAllergies: boolean | null;
    allergies: string;
    hasMedications: boolean | null;
    medications: string;
    hasChronicDiseases: boolean | null;
    chronicDiseases: string;
}

function CompleteStep() {
    return <div className="flex flex-col items-center justify-center h-screen text-white">
        <img src="/firstdate/register/sgcu-logo.png" alt="SGCU Logo" className="h-[50px]"/>
        <img src="/firstdate/register/freshmen-fest-logo.png" alt="Freshmen Fest Logo" className="w-[80%]" />
        <div className="bg-[url(/firstdate/register/registered-bg.png)] h-72 bg-contain bg-center bg-no-repeat w-[75%] flex flex-col items-center justify-center">
            <h2 className="text-3xl text-center z-10">ลงทะเบียน<br/>สำเร็จ!</h2>
        </div>
        <button className="mt-4 text-xl" onClick={() => window.location.href = '/firstdate/home'}>กลับสู่หน้าหลัก</button>
    </div>
}

function HealthInformationStep({ 
    setStep, 
    healthInfo, 
    setHealthInfo 
}: { 
    setStep: (step: number) => void;
    healthInfo: HealthInfo;
    setHealthInfo: (info: HealthInfo) => void;
}) {
    const handleAllergiesChange = (hasAllergies: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasAllergies,
            allergies: hasAllergies ? healthInfo.allergies : ''
        });
    };

    const handleMedicationsChange = (hasMedications: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasMedications,
            medications: hasMedications ? healthInfo.medications : ''
        });
    };

    const handleChronicDiseasesChange = (hasChronicDiseases: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasChronicDiseases,
            chronicDiseases: hasChronicDiseases ? healthInfo.chronicDiseases : ''
        });
    };

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src="/firstdate/register/glob.svg" alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลด้านสุขภาพ</h1>
        </div>

        <div className="flex flex-col gap-2 text-sm">
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="allergies">อาหารที่แพ้</label>
                <div className="flex gap-2 justify-between w-full px-12">
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasAllergies-yes"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasAllergies === true}
                            onChange={() => handleAllergiesChange(true)} 
                        />
                        <label htmlFor="hasAllergies-yes">มี</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasAllergies-no"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasAllergies === false}
                            onChange={() => handleAllergiesChange(false)} 
                        />
                        <label htmlFor="hasAllergies-no">ไม่มี</label>
                    </div>
                </div>
                {healthInfo.hasAllergies && (
                    <input 
                        id="allergies"
                        type="text" 
                        placeholder="อาหารที่แพ้" 
                        className="text-sm mt-2"
                        value={healthInfo.allergies}
                        onChange={(e) => setHealthInfo({...healthInfo, allergies: e.target.value})}
                    />
                )}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="medications">ยาที่แพ้</label>
                <div className="flex gap-2 justify-between w-full px-12">
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasMedications-yes"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasMedications === true}
                            onChange={() => handleMedicationsChange(true)} 
                        />
                        <label htmlFor="hasMedications-yes">มี</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasMedications-no"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasMedications === false}
                            onChange={() => handleMedicationsChange(false)} 
                        />
                        <label htmlFor="hasMedications-no">ไม่มี</label>
                    </div>
                </div>
                {healthInfo.hasMedications && (
                    <input 
                        id="medications"
                        type="text" 
                        placeholder="ยาที่แพ้" 
                        className="text-sm mt-2"
                        value={healthInfo.medications}
                        onChange={(e) => setHealthInfo({...healthInfo, medications: e.target.value})}
                    />
                )}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="chronicDiseases">โรคประจำตัว</label>
                <div className="flex gap-2 justify-between w-full px-12">
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasChronicDiseases-yes"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasChronicDiseases === true}
                            onChange={() => handleChronicDiseasesChange(true)} 
                        />
                        <label htmlFor="hasChronicDiseases-yes">มี</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            id="hasChronicDiseases-no"
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={healthInfo.hasChronicDiseases === false}
                            onChange={() => handleChronicDiseasesChange(false)} 
                        />
                        <label htmlFor="hasChronicDiseases-no">ไม่มี</label>
                    </div>
                </div>
                {healthInfo.hasChronicDiseases && (
                    <input 
                        id="chronicDiseases"
                        type="text" 
                        placeholder="โรคประจำตัว" 
                        className="text-sm mt-2"
                        value={healthInfo.chronicDiseases}
                        onChange={(e) => setHealthInfo({...healthInfo, chronicDiseases: e.target.value})}
                    />
                )}
            </div>
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full mb-4" />
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button 
                className={`bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full ${
                    healthInfo.hasAllergies === null || healthInfo.hasMedications === null || healthInfo.hasChronicDiseases === null 
                        ? "opacity-50 cursor-not-allowed" : ""
                }`}  
                onClick={() => setStep(4)} 
                disabled={healthInfo.hasAllergies === null || healthInfo.hasMedications === null || healthInfo.hasChronicDiseases === null}
            >
                ถัดไป
            </button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full" onClick={() => setStep(2)}>ย้อนกลับ</button>
        </div>
    </div>
}

function ContactInformationStep({ 
    setStep, 
    contactInfo, 
    setContactInfo 
}: { 
    setStep: (step: number) => void;
    contactInfo: ContactInfo;
    setContactInfo: (info: ContactInfo) => void;
}) {
    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src="/firstdate/register/glob.svg" alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลการติดต่อ</h1>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="phoneNumber">เบอร์โทรศัพท์</label>
            <div className="flex items-center gap-2">
                <select 
                    id="phoneCountryCode"
                    className="text-sm"
                    value={contactInfo.phoneCountryCode}
                    onChange={(e) => setContactInfo({...contactInfo, phoneCountryCode: e.target.value})}
                >
                    <option value="th">+66</option>
                    <option value="us">+1</option>
                    <option value="uk">+44</option>
                    <option value="jp">+81</option>
                    <option value="cn">+86</option>
                    <option value="fr">+33</option>
                </select>
                <input 
                    id="phoneNumber"
                    type="text" 
                    placeholder="เบอร์โทรศัพท์" 
                    className="text-sm"
                    value={contactInfo.phoneNumber}
                    onChange={(e) => setContactInfo({...contactInfo, phoneNumber: e.target.value})}
                />
            </div>
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full" />
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-center py-4">ข้อมูลผู้ปกครอง</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="guardianPhoneNumber">เบอร์โทรศัพท์ของผู้ปกครอง</label>
                <div className="flex items-center gap-2">
                    <select 
                        id="guardianPhoneCountryCode"
                        className="text-sm"
                        value={contactInfo.guardianPhoneCountryCode}
                        onChange={(e) => setContactInfo({...contactInfo, guardianPhoneCountryCode: e.target.value})}
                    >
                        <option value="th">+66</option>
                        <option value="us">+1</option>
                        <option value="uk">+44</option>
                        <option value="jp">+81</option>
                        <option value="cn">+86</option>
                        <option value="fr">+33</option>
                    </select>
                    <input 
                        id="guardianPhoneNumber"
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        className="text-sm"
                        value={contactInfo.guardianPhoneNumber}
                        onChange={(e) => setContactInfo({...contactInfo, guardianPhoneNumber: e.target.value})}
                    />
                </div>  
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="guardianRelationship">ความสัมพันธ์</label>
                <select 
                    id="guardianRelationship"
                    className="text-sm"
                    value={contactInfo.guardianRelationship}
                    onChange={(e) => setContactInfo({...contactInfo, guardianRelationship: e.target.value})}
                >
                    <option value="father">พ่อ</option>
                    <option value="mother">แม่</option>
                    <option value="guardian">ผู้ปกครอง</option>
                </select>
            </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"  onClick={() => setStep(3)}>ถัดไป</button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full" onClick={() => setStep(1)}>ย้อนกลับ</button>
        </div>
    </div>
}

function PersonalInformationStep({ 
    setStep, 
    personalInfo, 
    setPersonalInfo 
}: { 
    setStep: (step: number) => void;
    personalInfo: PersonalInfo;
    setPersonalInfo: (info: PersonalInfo) => void;
}) {
    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src="/firstdate/register/glob.svg" alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลส่วนตัว</h1>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="title">คำนำหน้าชื่อ</label>
            <select 
                id="title"
                className="text-sm"
                value={personalInfo.title}
                onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
            >
                <option value="mr">นาย</option>
                <option value="ms">นางสาว</option>
                <option value="mrs">นาง</option>
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="firstName">ชื่อจริง</label>
            <input 
                id="firstName"
                className="text-sm" 
                type="text" 
                placeholder="ชื่อจริง"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="lastName">นามสกุล</label>
            <input 
                id="lastName"
                className="text-sm" 
                type="text" 
                placeholder="นามสกุล"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="nickname">ชื่อเล่น</label>
            <input 
                id="nickname"
                className="text-sm" 
                type="text" 
                placeholder="ชื่อเล่น"
                value={personalInfo.nickname}
                onChange={(e) => setPersonalInfo({...personalInfo, nickname: e.target.value})}
            />
        </div>
        <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="faculty">คณะ</label>
                <select 
                    id="faculty"
                    className="text-sm"
                    value={personalInfo.faculty}
                    onChange={(e) => setPersonalInfo({...personalInfo, faculty: e.target.value})}
                >
                    <option value="engineering">วิศวกรรมศาสตร์</option>
                    <option value="science">วิทยาศาสตร์</option>
                    <option value="arts">ศิลปศาสตร์</option>
                    <option value="business">บริหารธุรกิจ</option>
                    <option value="law">นิติศาสตร์</option>
                    <option value="education">ศึกษาศาสตร์</option>
                    <option value="medicine">แพทยศาสตร์</option>
                    <option value="dentistry">ทันตแพทยศาสตร์</option>
                    <option value="pharmacy">เภสัชศาสตร์</option>
                    <option value="nursing">พยาบาลศาสตร์</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="year">ชั้นปี</label>
                <select 
                    id="year"
                    className="text-sm"
                    value={personalInfo.year}
                    onChange={(e) => setPersonalInfo({...personalInfo, year: e.target.value})}
                >
                    <option value="1">ปี 1</option>
                    <option value="2">ปี 2</option>
                    <option value="3">ปี 3</option>
                    <option value="4">ปี 4</option>
                    <option value="5">ปี 5</option>
                    <option value="6">ปี 6</option>
                </select>
            </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"  onClick={() => setStep(2)}>ถัดไป</button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full" onClick={() => window.location.href = "/"}>ย้อนกลับ</button>
        </div>
    </div>
}

export default function RegisterForm() {
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
        phoneCountryCode: 'th',
        phoneNumber: '',
        guardianPhoneCountryCode: 'th',
        guardianPhoneNumber: '',
        guardianRelationship: 'father'
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
        
        <div className="bg-[url(/firstdate/register/form-bg.png)] h-screen bg-contain bg-center bg-no-repeat w-full flex items-center justify-center">
        <div className="max-w-[270px] w-full md:max-w-[400px]">
            {step === 1 && (
                <PersonalInformationStep 
                    setStep={setStep} 
                    personalInfo={personalInfo} 
                    setPersonalInfo={setPersonalInfo} 
                />
            )}
            {step === 2 && (
                <ContactInformationStep 
                    setStep={setStep} 
                    contactInfo={contactInfo} 
                    setContactInfo={setContactInfo} 
                />
            )}
            {step === 3 && (
                <HealthInformationStep 
                    setStep={setStep} 
                    healthInfo={healthInfo} 
                    setHealthInfo={setHealthInfo} 
                />
            )}
            {step === 4 && <CompleteStep />}    
        </div>
        </div>
    </div>
}