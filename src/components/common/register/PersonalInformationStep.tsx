import { ChevronLeft } from "lucide-react";

interface Faculty {
    text: string;
    value: string;
}

const faculties: Faculty[] = [
    {
        text: 'คณะครุศาสตร์',
        value: 'FACULTY_OF_EDUCATION',
    }, {
        text: 'คณะจิตวิทยา',
        value: 'FACULTY_OF_PSYCHOLOGY',
    }, {
        text: "คณะทันตแพทยศาสตร์",
        value: 'FACULTY_OF_DENTISTRY',
    }, {
        text: "คณะนิติศาสตร์",
        value: 'FACULTY_OF_LAW',
    }, {
        text: "คณะนิเทศศาสตร์",
        value: 'FACULTY_OF_COMMUNICATION_ARTS',
    }, {
        text: "คณะพยาบาลศาสตร์",
        value: "FACULTY_OF_NURSING"
    }, {
        text: "คณะพาณิชยศาสตร์และการบัญชี",
        value: "FACULTY_OF_COMMERCE_AND_ACCOUNTANCY",
    }, {
        text: "คณะแพทยศาสตร์",
        value: "FACULTY_OF_MEDICINE",
    }, {
        text: "คณะเภสัชศาสตร์",
        value: "FACULTY_OF_PHAMACEUTICAL_SCIENCE",
    }, {
        text: "คณะรัฐศาสตร์",
        value: "FACULTY_OF_POLITICAL_SCIENCE",
    }, {
        text: "คณะวิทยาศาสตร์",
        value: "FACULTY_OF_SCIENCE",
    }, {
        text: "คณะวิทยาศาสตร์การกีฬา",
        value: "FACULTY_OF_SPORTS_SCIENCE",
    }, {
        text: "คณะวิศวกรรมศาสตร์",
        value: "FACULTY_OF_ENGINEERING",
    }, {
        text: "คณะศิลปกรรมศาสตร์",
        value: "FACULTY_OF_FINE_AND_APPLIED_ARTS",
    }, {
        text: "คณะเศรษฐศาสตร์",
        value: "FACULTY_OF_ECONOMICS",
    }, {
        text: "คณะสถาปัตยกรรมศาสตร์",
        value: "FACULTY_OF_ARCHITECTURE",
    }, {
        text: "คณะสหเวชศาสตร์",
        value: "FACULTY_OF_ALLIED_HEALTH_SCIENCES",
    }, {
        text: "คณะสัตวแพทยศาสตร์",
        value: "FACULTY_OF_VETERINARY_SCIENCE",
    }, {
        text: "คณะอักษรศาสตร์",
        value: "FACULTY_OF_ARTS",
    }, {
        text: "สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย",
        value: "SCHOOL_OF_INTEGRATED_INNOVATION",
    }, {
        text: "สำนักวิชาทรัพยากรการเกษตร",
        value: "SCHOOL_OF_AGRICULTURAL_RESOURCES",
    }, {
        text: "บัณฑิตวิทยาลัย",
        value: "GRADUATE_SCHOOL",
    }
];

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
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <select 
                    id="title"
                    className="text-sm bg-black w-full h-full p-1 rounded-sm text-white"
                    value={personalInfo.title}
                    onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                >
                    <option value="mr">นาย</option>
                    <option value="ms">นางสาว</option>
                    <option value="mrs">นาง</option>
                </select>
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="firstName">ชื่อจริง</label>
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <input 
                    id="firstName"
                    className="text-sm bg-black w-full h-full p-1 rounded-sm" 
                    type="text" 
                    placeholder="ชื่อจริง"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                />
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="lastName">นามสกุล</label>
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <input 
                    id="lastName"
                    className="text-sm bg-black w-full h-full p-1 rounded-sm" 
                    type="text" 
                    placeholder="นามสกุล"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                />
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="nickname">ชื่อเล่น</label>
            <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                <input 
                    id="nickname"
                    className="text-sm bg-black w-full h-full p-1 rounded-sm" 
                    type="text" 
                    placeholder="ชื่อเล่น"
                    value={personalInfo.nickname}
                    onChange={(e) => setPersonalInfo({...personalInfo, nickname: e.target.value})}
                />
            </div>
        </div>
        
        <div className="flex justify-between gap-3 flex-col">
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="faculty">คณะ</label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <select 
                        id="faculty"
                        className="text-sm bg-black w-full h-full p-1 rounded-sm text-white"
                        value={personalInfo.faculty}
                        onChange={(e) => setPersonalInfo({...personalInfo, faculty: e.target.value})}
                    >
                        {
                            faculties.map((faculty) => (
                                <option key={faculty.value} value={faculty.value}>{faculty.text}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="year">ชั้นปี</label>
                <div className="w-full cut-edge-all-sm bg-gradient-to-t from-[#FFB6C1] to-[#121212] p-[2px]">
                    <select 
                        id="year"
                        className="text-sm bg-black w-full h-full p-1 rounded-sm text-white"
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
        </div>
        
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <button className="bg-gradient-to-t from-[#FFB6C1] to-[#FFFFF2] py-2 w-36 text-black rounded-full"  onClick={() => setStep(2)}>ถัดไป</button>
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 py-2 w-36 rounded-full flex items-center justify-center gap-2" onClick={() => window.location.href = "/"}>
                <ChevronLeft className="w-4 h-4" />
                <p>ย้อนกลับ</p>
            </button>
        </div>
    </div>
}