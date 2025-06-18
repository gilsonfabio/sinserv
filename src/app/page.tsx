import { LoginForm } from "@/components/login-form";
import Image from "next/image";

import imgLogo from '@/assets/images/imgLogo.png';

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-screen bg-slate-300 ">
      <div className="flex flex-col md:flex-col items-center justify-center w-full h-[50%] md:w-[50%] md:h-full bg-blue-950 p-5 ">
        <div className="flex-col items-center justify-center md:w-1/2 w-full ">
          <LoginForm />
        </div>        
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[50%] md:w-[50%] md:h-full bg-blue-100 ">
        <Image src={imgLogo} alt="Logo" className="object-cover h-full w-full" priority />
      </div>
    </div>
  );
}
