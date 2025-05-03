import GestureDetect from "../components/gesturesDetect"
import Header from "../components/header"
import { useState } from "react"
export default function TryOn()
{
    const[gender,setGender]=useState("MAN")
    return (
        <div className="grid justify-center w-screen h-screen overflow-clip">
            <Header heading={"CHEESE!!!"}/>
            <div className="border-image-source bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] border-image-slice-1 w-fit rounded-2xl p-0.5 m-auto">
            <div className="justify-center flex content-center border-2 bg-[#210632] px-10 py-2 w-fit h-auto rounded-2xl m-auto gap-2 shadow-[inset_0px_10px_20px_rgba(255,255,255,0.2)]">
                <img className="bg-[#463283] border-1 border-white rounded-full w-10 h-10" src="./icons/male.svg"/>
                <h1 className="text-white font-bold text-2xl text-center my-auto">{gender}</h1>
            </div>
            </div>
            <GestureDetect/>
        </div>
    )
}