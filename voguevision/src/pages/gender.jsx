import { useNavigate } from "react-router-dom"
import { Broadcast } from "../components/broadcaster"
import Header from "../components/header"
import { useContext, useEffect, useState } from "react"
import Loader from "../components/loader"
import GestureGuide from "../components/GestureGuide"

export default function Gender() {
    const { gesture, setGesture } = useContext(Broadcast)
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    
    // Add hover state for cards
    const [hoveredCard, setHoveredCard] = useState(null)
    
    // Define the gestures for this page
    const pageGestures = {
        leftHand: {
            icon: "./gesture_icon/leftHand.svg",
            action: "Select Female"
        },
        back: {
            icon: "./gesture_icon/back.svg",
            action: "Go Back"
        },
        opencart: {
            icon: "./gesture_icon/open_cart.svg",
            action: "Open Cart"
        },
        rightHand: {
            icon: "./gesture_icon/rightHand.svg",
            action: "Select Male"
        }
    }
    
    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 3000)
    }, [])
    
    useEffect(() => {
        if (!loading) {
            if (gesture.direction == 'left') {
                console.log("Set female")
                localStorage.setItem('gender', 'f')
                nav('/categories')
            }
            if (gesture.direction == 'right') {
                console.log("Set male")
                localStorage.setItem('gender', 'm')
                nav('/categories')
            }
        }
    }, [gesture])

    // Enhanced Item component with hand gesture indicators
    const Item = ({ text, image, color, side }) => (
        <div 
            className={`relative transition-all duration-300 ease-in-out transform ${hoveredCard === text ? 'scale-105' : 'scale-100'}`}
            onMouseEnter={() => setHoveredCard(text)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <div 
                style={{ backgroundColor: color }} 
                className="rounded-3xl flex flex-col items-center justify-center text-white py-16 w-64 h-80 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
                {/* Background gradient effect */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-full h-full rounded-3xl opacity-40 blur-sm"
                        style={{ 
                            background: `radial-gradient(circle at ${side === 'left' ? '30%' : '70%'} 30%, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                        }}
                    ></div>
                </div>
                
                {/* Icon wrapper with glowing effect */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full blur-md bg-white/30"></div>
                    <div className="relative bg-white/25 h-40 w-40 rounded-full p-2 border border-white/30 flex items-center justify-center z-10">
                        <img src={image} className="h-28 w-28" alt={text} />
                    </div>
                </div>
                
                {/* Text with better typography */}
                <h1 className="text-2xl font-bold tracking-wider mt-3">{text.toUpperCase()}</h1>
                
                {/* Hand gesture indicator */}
                <div className={`absolute bottom-4 ${side === 'left' ? 'right-4' : 'left-4'} flex items-center gap-1 text-xs font-light text-white/70`}>
                    <div className="flex items-center gap-1">
                        <img 
                            src={`./gesture_icon/${side}Hand.svg`} 
                            alt={`${side} hand`} 
                            className="w-4 h-4"
                            style={{ filter: 'invert(100%)' }}
                        />
                        <span className="text-xs">Raise {side} hand</span>
                    </div>
                </div>
            </div>
            
            {/* Gesture indicator animation for selected card */}
            {hoveredCard === text && (
                <div className={`absolute ${side === 'left' ? '-right-6' : '-left-6'} top-1/2 transform -translate-y-1/2 animate-pulse`}>
                    <div className={`w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 rounded-full`}>
                        <img 
                            src={`./gesture_icon/${side}Hand.svg`} 
                            alt={`${side} hand`} 
                            className="w-6 h-6"
                            style={{ filter: 'invert(100%)' }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
    
    return (
        loading ? <Loader /> : 
        <div className="min-h-screen overflow-hidden relative bg-[#210632] flex flex-col">
            <Header heading={"GENDER"} />
            
            {/* Gesture Guide Component */}
            <GestureGuide gestures={pageGestures} position="top" />
            
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-4xl px-8">
                    {/* Centered content with proper spacing */}
                    <div className="flex flex-col items-center">
                        {/* Title */}
                        <h2 className="text-white/80 text-2xl font-light mb-8">Select Your Gender</h2>
                        
                        {/* Cards container with improved gap */}
                        <div className="flex gap-16 justify-center items-center">
                            <Item text={"Female"} image={"./icons/female.svg"} color={"#BD04E5"} side="left" />
                            <Item text={"Male"} image={"./icons/male.svg"} color={"#6A36E1"} side="right" />
                        </div>
                        
                        {/* Gesture instruction */}
                        <div className="flex items-center gap-8 mt-16">
                            <div className="flex items-center gap-2">
                                <img 
                                    src="./gesture_icon/leftHand.svg" 
                                    alt="Raise left hand" 
                                    className="w-8 h-8"
                                    style={{ filter: 'invert(100%)' }}
                                />
                                <span className="text-white/60 text-lg">for Female</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <img 
                                    src="./gesture_icon/rightHand.svg" 
                                    alt="Raise right hand" 
                                    className="w-8 h-8"
                                    style={{ filter: 'invert(100%)' }}
                                />
                                <span className="text-white/60 text-lg">for Male</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}