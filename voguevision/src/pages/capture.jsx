import GestureDetect from "../components/gesturesDetect"
import { useState,useRef,useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Webcam from "react-webcam"
import { Broadcast } from "../components/broadcaster"
import EyeAnimation from "../components/camAni"
export default function Capture()
{
    const camRef = useRef(null)
    const [image, setImage] = useState()
    const [timer, setTimer] = useState(false)
    const [swap,setSwap]=useState(false)
    const { gesture, setGesture } = useContext(Broadcast)
    useEffect(() => {
        console.log(gesture)
        if (gesture.gesture === "thumbs_up")
        {
            setTimer(true)
            setSwap(true)
            setInterval(() => {
                setTimer(false)
            }, 3000)
        }
    },[gesture])
    return (
        <div className="grid justify-center w-screen h-screen ">
            <header className="flex fixed w-screen justify-between px-10 py-2 items-center">
            <Link to={'/'}>
                <img src="./logo.svg"/>
            </Link>
            <img src="./icons/login.svg" className="bg-white/50 border-2 border-white rounded-full w-12 h-12 p-2"/>
            </header>
            <div className="border-image-source bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] border-image-slice-1 w-fit rounded-2xl p-0.5 m-auto">
            <div className="justify-center flex content-center border-2 bg-[#210632] px-10 py-2 w-fit h-auto rounded-2xl m-auto gap-2 shadow-[inset_0px_10px_20px_rgba(255,255,255,0.2)]">
                <img className="bg-[#463283] border-1 border-white rounded-full w-10 h-10" src="./icons/male.svg"/>
                <h1 className="text-white font-bold text-2xl text-center my-auto">CHEESE</h1>
            </div>
            </div>
                <div className="flex">
                <span className={`${swap?"hidden":"flex"}`}><GestureDetect/></span>
                <Webcam ref={camRef} screenshotFormat="image/png" mirrored={"user"} className={`${swap?"flex":"hidden"} m-auto rounded-2xl`}/>
                <span className="absolute inset-0 flex justify-center items-center z-10">
                    {timer?<EyeAnimation/>:null}
                </span>
                </div>
        </div>
    )
}