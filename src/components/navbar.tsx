import { ModeToggle } from "./modeToggle";

export default function Navbar(){
    return(
        <div className="flex flex-row bg-blue-950 w-full h-20 items-center justify-between px-5 md:px-20 ">
            <div className="text-yellow-500 text-2xl font-bold ">
                LOGO
            </div>
            <div className="">
                <ModeToggle />
            </div>
        </div>
    )
}