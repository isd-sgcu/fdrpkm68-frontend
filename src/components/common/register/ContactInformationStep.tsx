export interface ContactInfo {
    phoneCountryCode: string;
    phoneNumber: string;
    guardianPhoneCountryCode: string;
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
