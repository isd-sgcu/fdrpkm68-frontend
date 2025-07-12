import { ChevronLeft } from "lucide-react";
import { useState } from "react";

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
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!contactInfo.phoneNumber.trim()) {
            newErrors.phoneNumber = 'กรุณากรอกเบอร์โทรศัพท์';
        } else if (!/^[0-9]{10}$/.test(contactInfo.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)';
        }
        
        if (!contactInfo.guardianPhoneNumber.trim()) {
            newErrors.guardianPhoneNumber = 'กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง';
        } else if (!/^[0-9]{10}$/.test(contactInfo.guardianPhoneNumber.replace(/\s/g, ''))) {
            newErrors.guardianPhoneNumber = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)';
        }
        
        if (!contactInfo.guardianRelationship.trim()) {
            newErrors.guardianRelationship = 'กรุณากรอกความสัมพันธ์';
        } else if (contactInfo.guardianRelationship.trim().length < 2) {
            newErrors.guardianRelationship = 'กรุณากรอกความสัมพันธ์ให้ชัดเจน';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateForm()) {
            setStep(3);
        }
    };

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src={globUrl} alt="Background" />
            <h1 className="text-lg font-semibold">ข้อมูลการติดต่อ</h1>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="phoneNumber">เบอร์โทรศัพท์ <span className="text-red-400">*</span></label>
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <input 
                    id="phoneNumber"
                    type="text" 
                    placeholder="เบอร์โทรศัพท์" 
                    className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    value={contactInfo.phoneNumber}
                    onChange={(e) => {
                        setContactInfo({...contactInfo, phoneNumber: e.target.value});
                        if (errors.phoneNumber) {
                            setErrors({...errors, phoneNumber: ''});
                        }
                    }}
                />
            </div>
            {errors.phoneNumber && <span className="text-red-400 text-xs">{errors.phoneNumber}</span>}
        </div>
        <img src="/firstdate/register/divider.png" alt="Divider" className="w-full" />
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-center py-4">ข้อมูลผู้ปกครอง</h1>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="guardianPhoneNumber">เบอร์โทรศัพท์ของผู้ปกครอง <span className="text-red-400">*</span></label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <input 
                        id="guardianPhoneNumber"
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.guardianPhoneNumber ? 'border-red-500' : ''}`}
                        value={contactInfo.guardianPhoneNumber}
                        onChange={(e) => {
                            setContactInfo({...contactInfo, guardianPhoneNumber: e.target.value});
                            if (errors.guardianPhoneNumber) {
                                setErrors({...errors, guardianPhoneNumber: ''});
                            }
                        }}
                    />
                </div>
                {errors.guardianPhoneNumber && <span className="text-red-400 text-xs">{errors.guardianPhoneNumber}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="guardianRelationship">ความสัมพันธ์ <span className="text-red-400">*</span></label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <input type="text" placeholder="ความสัมพันธ์" className={`text-sm bg-black w-full h-full p-1 rounded-sm ${errors.guardianRelationship ? 'border-red-500' : ''}`} value={contactInfo.guardianRelationship} onChange={(e) => {
                        setContactInfo({...contactInfo, guardianRelationship: e.target.value});
                        if (errors.guardianRelationship) {
                            setErrors({...errors, guardianRelationship: ''});
                        }
                    }} />
                </div>
                {errors.guardianRelationship && <span className="text-red-400 text-xs">{errors.guardianRelationship}</span>}
            </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button 
                className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"  
                onClick={handleNext}
            >
                ถัดไป
            </button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full flex items-center justify-center gap-2" onClick={() => setStep(1)}>
                <ChevronLeft className="w-4 h-4" />
                <p>ย้อนกลับ</p>
            </button>
        </div>
    </div>
}