import GestureDetect from "../components/gesturesDetect"
import { useState, useRef, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Webcam from "react-webcam"
import { Broadcast } from "../components/broadcaster"
import EyeAnimation from "../components/camAni"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import GestureGuide from "../components/GestureGuide"
import { ShoppingCart } from "lucide-react"

export default function Capture() {
    const nav = useNavigate()
    const camRef = useRef(null)
    const [timer, setTimer] = useState(false)
    const [swap, setSwap] = useState(false)
    const { gesture, setGesture } = useContext(Broadcast)
    const [glowEffect, setGlowEffect] = useState(false);
    
    // Define the gestures for this page
    const pageGestures = {
        thumbsUp: {
            icon: "./gesture_icon/thumbsUp.svg",
            action: "Take Photo"
        },
        back: {
            icon: "./gesture_icon/back.svg",
            action: "Go Back"
        }
    }
    
    useEffect(() => {
        console.log(gesture)
        if (gesture.gesture === "thumbs_up") {
            setTimer(true)
            setSwap(true)
            
            setInterval(() => {
                setTimer(false)
            }, 3000)

            setInterval(() => {
                localStorage.setItem('photo', camRef.current.getScreenshot())
                nav('/tryon')
            }, 5000)
        }
    }, [gesture])
    
    return (

        <div className="h-screen bg-[#210632] flex flex-col overflow-hidden">
            {/* Header */}
                <header className="grid p-5 h-fit w-screen relative z-20">
                  <div className="flex justify-between items-center relative">
                    {/* Logo with subtle hover effect */}
                    <Link to={"/"} className="transition-transform duration-300 hover:scale-105">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full blur opacity-30"></div>
                        <img src="./logo.svg" alt="Logo" className="relative z-10" />
                      </div>
                    </Link>
            
                    {/* Center header with gradient border and animation */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className={`p-0.5 border-2 rounded-full bg-gradient-to-r from-[#4A08D7] to-[#B805DF] ${glowEffect ? 'shadow-lg shadow-purple-500/50' : ''} transition-shadow duration-1000`}>
                        <div className="bg-[#210632] h-fit text-xl px-2 py-2 items-center rounded-full relative overflow-hidden">
                          {/* Animated gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 animate-gradient-shift"></div>
                          <span className="flex items-center bg-white/20 backdrop-blur-sm px-20 py-4 rounded-full gap-4 text-white font-bold relative z-10">
                            <img src="/icons/header.svg" className="h-10 animate-pulse-subtle" alt="Header Icon" />
                            <h1 className="tracking-wider">CAMERA</h1>
                          </span>
                        </div>
                      </div>
                    </div>
            
                    {/* Cart icon with notification badge */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center bg-white/30 hover:bg-white/40 backdrop-blur-md border-2 border-white/60 rounded-full w-12 h-12 p-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/40">
                        <ShoppingCart className="text-white" size={24} />
                        <div className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {localStorage.getItem('cart')==undefined?0:localStorage.getItem('cart').split(',').length}
                        </div>
                      </div>
                    </div>
                  </div>
            
            
                  {/* Add CSS for animations */}
                  <style jsx>{`
                    @keyframes gradient-shift {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                    
                    @keyframes pulse-subtle {
                      0% { transform: scale(1); }
                      50% { transform: scale(1.05); }
                      100% { transform: scale(1); }
                    }
                    
                    .animate-gradient-shift {
                      animation: gradient-shift 3s ease infinite;
                    }
                    
                    .animate-pulse-subtle {
                      animation: pulse-subtle 2s ease-in-out infinite;
                    }
                  `}</style>
                </header>
            
            {/* Gesture Guide */}
            <div className="mt-4 mb-2">
                <GestureGuide gestures={pageGestures} position="top" />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                {/* Main content area with camera frame */}
                <div className="relative w-full max-w-2xl">
                    {/* Instructions */}
                    <div className="text-center mb-6">
                        <h2 className="text-white/80 text-xl font-light">
                            Make a thumbs up gesture to take your photo
                        </h2>
                    </div>
                    
                    {/* Camera container with gradient border */}
                    <div className="relative rounded-3xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg">
                        <div className="bg-[#3c2e58] rounded-3xl overflow-hidden relative">
                            {/* Camera view */}
                            <div className="aspect-[4/3] w-full relative flex items-center justify-center">
                                <span className={`${swap ? "hidden" : "block"} absolute inset-0 flex items-center justify-center`}>
                                    <GestureDetect />
                                </span>
                                <Webcam 
                                    ref={camRef} 
                                    screenshotFormat="image/png" 
                                    mirrored={"user"} 
                                    className={`${swap ? "block" : "hidden"} w-full h-full object-cover rounded-2xl`}
                                />
                                
                                {/* Overlay for the animation */}
                                <span className="absolute inset-0 flex justify-center items-center z-10">
                                    {timer ? <EyeAnimation /> : null}
                                </span>
                            </div>
                            
                            {/* Camera frame details */}
                            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
                                <div className="bg-[#210632]/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                                    <img 
                                        src="./gesture_icon/thumbsUp.svg" 
                                        alt="Thumbs up" 
                                        className="w-5 h-5"
                                        style={{ filter: 'invert(100%)' }}
                                    />
                                    <span className="text-white text-xs">Take Photo</span>
                                </div>
                                
                                <div className="bg-[#210632]/70 backdrop-blur-sm rounded-full h-8 w-8 flex items-center justify-center">
                                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tips and instructions */}
                    <div className="mt-6 bg-[#3c2e58]/80 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
                        <h3 className="text-white font-semibold mb-2">Photo Tips</h3>
                        <ul className="text-white/80 text-sm space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#7E8ABA]/80 flex items-center justify-center text-xs">1</div>
                                <span>Make sure your face is clearly visible</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#7E8ABA]/80 flex items-center justify-center text-xs">2</div>
                                <span>Find good lighting for best results</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#7E8ABA]/80 flex items-center justify-center text-xs">3</div>
                                <span>Stand back to ensure your upper body is visible</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Animated indicator at the bottom when processing */}
                {timer && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#3c2e58]/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3 animate-pulse-subtle">
                        <div className="w-4 h-4 rounded-full bg-[#AE0FF1] animate-ping"></div>
                        <span className="text-white">Processing your photo...</span>
                    </div>
                )}
            </div>
            
            {/* Add animation keyframes */}
            <style jsx>{`
                @keyframes pulse-subtle {
                    0% { opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { opacity: 0.8; }
                }
                
                .animate-pulse-subtle {
                    animation: pulse-subtle 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}