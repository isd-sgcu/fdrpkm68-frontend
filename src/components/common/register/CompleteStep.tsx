import { useState } from "react";

export default function CompleteStep({ userType }: { userType: 'student' | 'staff' }) {
    const successUrl = userType === 'student' ? '/firstdate/register/registered-bg.png' : '/firstdate/register/staff/registered-bg.png';
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(!isZoomed);
    };

    return <div className="flex flex-col items-center justify-center text-white py-4">
        <div className="flex flex-col items-center justify-center">
            <img src="/firstdate/register/sgcu-logo.png" alt="SGCU Logo" className="h-[50px]"/>
            <img src="/firstdate/register/freshmen-fest-logo.png" alt="Freshmen Fest Logo" className="w-[80%]" />
        </div>
        <div className="flex-col max-h-[650px] bg-contain bg-center bg-no-repeat w-full flex items-center justify-between py-4" style={{ backgroundImage: `url(/firstdate/register/success/success-frame.png)` }}>
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-2xl font-bold">ลงทะเบียนสำเร็จ!</h1>
                <img src="/firstdate/register/success/divider.png" alt="Success Line" className="w-[90%] mt-4" />
            </div>
            <div className="relative w-full flex justify-center items-center">
                <img 
                    src="/firstdate/register/success/time-travel.png" 
                    alt="Success Frame" 
                    className={`w-[90%] max-w-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 ${
                        isZoomed ? 'scale-150 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''
                    }`}
                    onClick={handleImageClick}
                    style={{
                        maxHeight: isZoomed ? '80vh' : 'auto',
                        objectFit: isZoomed ? 'contain' : 'cover'
                    }}
                />
                {isZoomed && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-75 z-40"
                        onClick={() => setIsZoomed(false)}
                    />
                )}
            </div>
        </div>
        <button className="flex items-center justify-center bg-white py-2 text-black transition-colors duration-200 hover:bg-gray-100 px-4 mt-2" onClick={() => window.location.href = '/firstdate/home'}>กลับสู่หน้าหลัก</button>
    </div>
}