export default function CompleteStep({ userType }: { userType: 'student' | 'staff' }) {
    const successUrl = userType === 'student' ? '/firstdate/register/registered-bg.png' : '/firstdate/register/staff/registered-bg.png';

    return <div className="flex flex-col items-center justify-center h-screen text-white">
        <img src="/firstdate/register/sgcu-logo.png" alt="SGCU Logo" className="h-[50px]"/>
        <img src="/firstdate/register/freshmen-fest-logo.png" alt="Freshmen Fest Logo" className="w-[80%]" />
        <div className={`bg-[url(${successUrl})] h-72 bg-contain bg-center bg-no-repeat w-[75%] flex flex-col items-center justify-center`}>
            <h2 className="text-3xl text-center z-10">ลงทะเบียน<br/>สำเร็จ!</h2>
        </div>
        <button className="mt-4 text-xl" onClick={() => window.location.href = '/firstdate/home'}>กลับสู่หน้าหลัก</button>
    </div>
}