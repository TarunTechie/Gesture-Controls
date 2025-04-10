import { Link } from "react-router-dom"
import GestureDetect from "./gesturesDetect"
export default function Header({heading})
{
    return (
        <header className="grid w-screen p-5 h-fit">
            <div className="justify-between items-center flex">
                <Link to={'/'}>
                <img src="./logo.svg"/>
                </Link>
                <div className="p-0.5 border-2 rounded-full  bg-linear-to-r from-[#4A08D7] to-[#B805DF] ">
                <div className=" bg-[#210632] h-fit text-xl px-2 py-2 items-center rounded-full">
                <span className="flex items-center bg-white/20 px-20 py-4 rounded-full gap-4  text-white font-bold">
                <img src="/icons/header.svg" className="h-10" />
                <h1 className="">{heading}</h1>
                </span>
                </div>
                </div>
                <img src="./icons/login.svg" className="bg-white/50 border-2 border-white rounded-full w-12 h-12 p-2"/>
            </div>
            <span className="absolute w-1/8 right-30">
            <GestureDetect/>
            </span>
        </header>
    )
}