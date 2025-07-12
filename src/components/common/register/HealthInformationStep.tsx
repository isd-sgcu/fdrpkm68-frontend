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

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src={globUrl} alt="Background" />
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