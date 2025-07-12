import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export interface HealthInfo {
    hasAllergies: boolean | null;
    allergies: string;
    hasMedications: boolean | null;
    medications: string;
    hasChronicDiseases: boolean | null;
    chronicDiseases: string;
}

export default function HealthInformationStep({ 
    setStep, 
    healthInfo, 
    setHealthInfo,
    userType
}: { 
    setStep: (step: number) => void;
    healthInfo: HealthInfo;
    setHealthInfo: (info: HealthInfo) => void;
    userType: 'student' | 'staff';
}) {
    const globUrl = userType === 'student' ? '/firstdate/register/glob.svg' : '/firstdate/register/staff/glob.svg';
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (healthInfo.hasAllergies === null) {
            newErrors.hasAllergies = 'กรุณาตอบคำถามเกี่ยวกับอาหารที่แพ้';
        } else if (healthInfo.hasAllergies && !healthInfo.allergies.trim()) {
            newErrors.allergies = 'กรุณาระบุอาหารที่แพ้';
        }
        
        if (healthInfo.hasMedications === null) {
            newErrors.hasMedications = 'กรุณาตอบคำถามเกี่ยวกับยาที่แพ้';
        } else if (healthInfo.hasMedications && !healthInfo.medications.trim()) {
            newErrors.medications = 'กรุณาระบุยาที่แพ้';
        }
        
        if (healthInfo.hasChronicDiseases === null) {
            newErrors.hasChronicDiseases = 'กรุณาตอบคำถามเกี่ยวกับโรคประจำตัว';
        } else if (healthInfo.hasChronicDiseases && !healthInfo.chronicDiseases.trim()) {
            newErrors.chronicDiseases = 'กรุณาระบุโรคประจำตัว';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateForm()) {
            setStep(4);
        }
    };

    const handleAllergiesChange = (hasAllergies: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasAllergies,
            allergies: hasAllergies ? healthInfo.allergies : ''
        });
        if (errors.hasAllergies) {
            setErrors({...errors, hasAllergies: ''});
        }
        if (errors.allergies && !hasAllergies) {
            setErrors({...errors, allergies: ''});
        }
    };

    const handleMedicationsChange = (hasMedications: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasMedications,
            medications: hasMedications ? healthInfo.medications : ''
        });
        if (errors.hasMedications) {
            setErrors({...errors, hasMedications: ''});
        }
        if (errors.medications && !hasMedications) {
            setErrors({...errors, medications: ''});
        }
    };

    const handleChronicDiseasesChange = (hasChronicDiseases: boolean) => {
        setHealthInfo({
            ...healthInfo,
            hasChronicDiseases,
            chronicDiseases: hasChronicDiseases ? healthInfo.chronicDiseases : ''
        });
        if (errors.hasChronicDiseases) {
            setErrors({...errors, hasChronicDiseases: ''});
        }
        if (errors.chronicDiseases && !hasChronicDiseases) {
            setErrors({...errors, chronicDiseases: ''});
        }
    };

    const CustomCheckbox = ({ 
        id, 
        checked, 
        onChange, 
        type, 
    }: { 
        id: string; 
        checked: boolean; 
        onChange: () => void; 
        type: 'yes' | 'no';
    }) => (
        <img 
            src={checked ? `/firstdate/register/checked-${type}.png` : `/firstdate/register/unchecked-${type}.png`}
            alt={checked ? 'Checked' : 'Unchecked'}
            className="h-10 cursor-pointer"
            onClick={onChange}
        />
    );

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src={globUrl} alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลด้านสุขภาพ</h1>
        </div>

        <div className="flex flex-col gap-2 text-sm">
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="allergies">อาหารที่แพ้ <span className="text-red-400">*</span></label>
                <div className="flex gap-2 justify-between w-full px-2">
                    <CustomCheckbox
                        id="hasAllergies-yes"
                        checked={healthInfo.hasAllergies === true}
                        onChange={() => handleAllergiesChange(true)}
                        type="yes"
                    />
                    <CustomCheckbox
                        id="hasAllergies-no"
                        checked={healthInfo.hasAllergies === false}
                        onChange={() => handleAllergiesChange(false)}
                        type="no"
                    />
                </div>
                {errors.hasAllergies && <span className="text-red-400 text-xs">{errors.hasAllergies}</span>}
                {healthInfo.hasAllergies && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="allergies"
                            type="text" 
                            placeholder="อาหารที่แพ้" 
                            className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.allergies ? 'border-red-500' : ''}`}
                            value={healthInfo.allergies}
                            onChange={(e) => {
                                setHealthInfo({...healthInfo, allergies: e.target.value});
                                if (errors.allergies) {
                                    setErrors({...errors, allergies: ''});
                                }
                            }}
                        />
                    </div>
                )}
                {errors.allergies && <span className="text-red-400 text-xs">{errors.allergies}</span>}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="medications">ยาที่แพ้ <span className="text-red-400">*</span></label>
                <div className="flex gap-2 justify-between w-full px-2">
                    <CustomCheckbox
                        id="hasMedications-yes"
                        checked={healthInfo.hasMedications === true}
                        onChange={() => handleMedicationsChange(true)}
                        type="yes"
                    />
                    <CustomCheckbox
                        id="hasMedications-no"
                        checked={healthInfo.hasMedications === false}
                        onChange={() => handleMedicationsChange(false)}
                        type="no"
                    />
                </div>
                {errors.hasMedications && <span className="text-red-400 text-xs">{errors.hasMedications}</span>}
                {healthInfo.hasMedications && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="medications"
                            type="text" 
                            placeholder="ยาที่แพ้" 
                            className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.medications ? 'border-red-500' : ''}`}
                            value={healthInfo.medications}
                            onChange={(e) => {
                                setHealthInfo({...healthInfo, medications: e.target.value});
                                if (errors.medications) {
                                    setErrors({...errors, medications: ''});
                                }
                            }}
                        />
                    </div>
                )}
                {errors.medications && <span className="text-red-400 text-xs">{errors.medications}</span>}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="chronicDiseases">โรคประจำตัว <span className="text-red-400">*</span></label>
                <div className="flex gap-2 justify-between w-full px-2">
                    <CustomCheckbox
                        id="hasChronicDiseases-yes"
                        checked={healthInfo.hasChronicDiseases === true}
                        onChange={() => handleChronicDiseasesChange(true)}
                        type="yes"
                    />
                    <CustomCheckbox
                        id="hasChronicDiseases-no"
                        checked={healthInfo.hasChronicDiseases === false}
                        onChange={() => handleChronicDiseasesChange(false)}
                        type="no"
                    />
                </div>
                {errors.hasChronicDiseases && <span className="text-red-400 text-xs">{errors.hasChronicDiseases}</span>}
                {healthInfo.hasChronicDiseases && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="chronicDiseases"
                            type="text" 
                            placeholder="โรคประจำตัว" 
                            className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.chronicDiseases ? 'border-red-500' : ''}`}
                            value={healthInfo.chronicDiseases}
                            onChange={(e) => {
                                setHealthInfo({...healthInfo, chronicDiseases: e.target.value});
                                if (errors.chronicDiseases) {
                                    setErrors({...errors, chronicDiseases: ''});
                                }
                            }}
                        />
                    </div>
                )}
                {errors.chronicDiseases && <span className="text-red-400 text-xs">{errors.chronicDiseases}</span>}
            </div>
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full mb-4" />
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button 
                className="bg-gradient-to-t from-[#FFB6C1] to-[#CB438B] py-2 w-36 text-white rounded-full"  
                onClick={handleNext}
            >
                ยืนยันข้อมูล
            </button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full flex items-center justify-center gap-2" onClick={() => setStep(2)}>
                <ChevronLeft className="w-4 h-4" />
                <p>ย้อนกลับ</p>
            </button>
        </div>
    </div>
}