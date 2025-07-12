export interface PersonalInfo {
    title: string;
    firstName: string;
    lastName: string;
    nickname: string;
    faculty: string;
    year: string;
}

export default function PersonalInformationStep({ 
    setStep, 
    personalInfo, 
    setPersonalInfo,
    userType
}: { 
    setStep: (step: number) => void;
    personalInfo: PersonalInfo;
    setPersonalInfo: (info: PersonalInfo) => void;
    userType: 'student' | 'staff';
}) {
    const globUrl = userType === 'student' ? '/firstdate/register/glob.svg' : '/firstdate/register/staff/glob.svg';

    return <div className="flex flex-col gap-4 p-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src={globUrl} alt="Background" />
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