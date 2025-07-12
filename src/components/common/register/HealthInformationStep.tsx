import { ChevronLeft } from "lucide-react";

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
                <label htmlFor="allergies">อาหารที่แพ้</label>
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
                {healthInfo.hasAllergies && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="allergies"
                            type="text" 
                            placeholder="อาหารที่แพ้" 
                            className="text-sm bg-black w-full h-full p-1 rounded-sm"
                            value={healthInfo.allergies}
                            onChange={(e) => setHealthInfo({...healthInfo, allergies: e.target.value})}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="medications">ยาที่แพ้</label>
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
                {healthInfo.hasMedications && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="medications"
                            type="text" 
                            placeholder="ยาที่แพ้" 
                            className="text-sm bg-black w-full h-full p-1 rounded-sm"
                            value={healthInfo.medications}
                            onChange={(e) => setHealthInfo({...healthInfo, medications: e.target.value})}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start py-2 gap-2">
                <label htmlFor="chronicDiseases">โรคประจำตัว</label>
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
                {healthInfo.hasChronicDiseases && (
                    <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px] mt-2">
                        <input 
                            id="chronicDiseases"
                            type="text" 
                            placeholder="โรคประจำตัว" 
                            className="text-sm bg-black w-full h-full p-1 rounded-sm"
                            value={healthInfo.chronicDiseases}
                            onChange={(e) => setHealthInfo({...healthInfo, chronicDiseases: e.target.value})}
                        />
                    </div>
                )}
            </div>
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full mb-4" />
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button 
                className={`bg-gradient-to-t from-[#FFB6C1] to-[#CB438B] py-2 w-36 text-white rounded-full ${
                    healthInfo.hasAllergies === null || healthInfo.hasMedications === null || healthInfo.hasChronicDiseases === null 
                        ? "opacity-50 cursor-not-allowed" : ""
                }`}  
                onClick={() => setStep(4)} 
                disabled={healthInfo.hasAllergies === null || healthInfo.hasMedications === null || healthInfo.hasChronicDiseases === null}
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