import { ChevronLeft } from "lucide-react";

export interface ContactInfo {
    phoneNumber: string;
    guardianPhoneNumber: string;
    guardianRelationship: string;
}

export default function ContactInformationStep({ 
    setStep, 
    contactInfo, 
    setContactInfo,
    userType
}: { 
    setStep: (step: number) => void;
    contactInfo: ContactInfo;
    setContactInfo: (info: ContactInfo) => void;
    userType: 'student' | 'staff';
}) {
    const globUrl = userType === 'student' ? '/firstdate/register/glob.svg' : '/firstdate/register/staff/glob.svg';

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src={globUrl} alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลการติดต่อ</h1>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="phoneNumber">เบอร์โทรศัพท์</label>
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <input 
                    id="phoneNumber"
                    type="text" 
                    placeholder="เบอร์โทรศัพท์" 
                    className="text-sm bg-black w-full h-full p-1 rounded-sm"
                    value={contactInfo.phoneNumber}
                    onChange={(e) => setContactInfo({...contactInfo, phoneNumber: e.target.value})}
                />
            </div>
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full" />
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-center py-4">ข้อมูลผู้ปกครอง</h1>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="guardianPhoneNumber">เบอร์โทรศัพท์ของผู้ปกครอง</label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <input 
                        id="guardianPhoneNumber"
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        className="text-sm bg-black w-full h-full p-1 rounded-sm"
                        value={contactInfo.guardianPhoneNumber}
                        onChange={(e) => setContactInfo({...contactInfo, guardianPhoneNumber: e.target.value})}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="guardianRelationship">ความสัมพันธ์</label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <select 
                        id="guardianRelationship"
                        className="text-sm bg-black w-full h-full p-1 rounded-sm"
                        value={contactInfo.guardianRelationship}
                        onChange={(e) => setContactInfo({...contactInfo, guardianRelationship: e.target.value})}
                    >
                        <option value="">เลือกความสัมพันธ์</option>
                        <option value="บิดา">บิดา</option>
                        <option value="มารดา">มารดา</option>
                        <option value="ผู้ปกครอง">ผู้ปกครอง</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"  onClick={() => setStep(3)}>ถัดไป</button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full flex items-center justify-center gap-2" onClick={() => setStep(1)}>
                <ChevronLeft className="w-4 h-4" />
                <p>ย้อนกลับ</p>
            </button>
        </div>
    </div>
}