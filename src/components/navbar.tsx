"use client";

import Image from "next/image";
import { ModeToggle } from "./modeToggle";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const handleLogout = () => {
        router.push("/logout"); 
      };
    

    return (
        <div className="flex flex-row bg-blue-950 w-full h-20 items-center justify-between px-5 md:px-20">
            <div className="text-yellow-500 text-2xl font-bold">
                <Image
                    className="dark:invert"
                    src="/sinservlogo.png"
                    alt="Logo SinServ"
                    width={180}
                    height={20}
                    priority
                />
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
