import Header from "../components/header";
import {useContext, useEffect, useState} from "react"
import Loader from "../components/loader";
import { Broadcast , Loading} from "../components/broadcaster";
import { useNavigate } from "react-router-dom";
import {menCategories, womenCategories} from '../constants/collections'
import GestureGuide from "../components/GestureGuide";

export default function Categories() {
    const [index, setIndex] = useState(0)
    const [paths, setPaths] = useState([])
    const [imgLoad, setImgLoad] = useState(true)
    const { gesture, setGesture} = useContext(Broadcast)
    const { loading, setLoading } = useContext(Loading)
    const nav = useNavigate()
    
    // Define the gestures for this page
    const pageGestures = {
        leftHand: {
            icon: "./gesture_icon/leftHand.svg",
            action: "Move Left"
        },
        back: {
            icon: "./gesture_icon/back.svg",
            action: "Go Back"
        },
        thumbsup: {
            icon: "./gesture_icon/thumbsUp.svg",
            action: "Select Category"
        },
        rightHand: {
            icon: "./gesture_icon/rightHand.svg",
            action: "Move Right"
        }
    }
    
    function changePic(gesture) {
        console.log(gesture)
        let len = paths.length
        if (gesture.gesture === null) {
            if (gesture.direction === "left") {
                if (index === 0) {
                    setIndex(len-1)
                } else {
                    setIndex((index) => index-1)    
                }
            }
            if (gesture.direction === "right") {
                if (index === len - 1) {
                    setIndex(0)
                } else {
                    setIndex((index) => index+1)
                }
            }
        } else {
            if (gesture.gesture === "thumbs_up") {
                console.log('thumbs up')
                setGesture(gesture => ({ ...gesture, gesture: null, direction: null }))
                localStorage.setItem('category', paths[index].name)
                nav('/clothes')
            }
        }
    }
    
    useEffect(() => { changePic(gesture) }, [gesture])
    
    useEffect(() => {
        let gender = localStorage.getItem('gender')
        setLoading(true)
        if (gender === 'm') {
            setPaths(menCategories)
        }
        if (gender === 'f') {
            setPaths(womenCategories)
        }
    }, [])
    
    useEffect(() => {
        if (paths.length > 0) {
            setIndex(0)
            setImgLoad(false)
        }
    },[paths])
    
    // Get gender text for display
    const genderText = localStorage.getItem('gender') === 'm' ? "MALE" : "FEMALE";
    
    return (
        <div className="min-h-screen bg-[#210632] flex flex-col">
            <Header heading={genderText} />
            
            {/* Gesture Guide */}
            <GestureGuide gestures={pageGestures} position="top" />
            
            {loading ? (
                <Loader />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                    <div className="w-full max-w-4xl">
                        
                        {/* Main image and navigation */}
                        <div className="flex items-center justify-between gap-4">
                            {/* Left arrow button */}
                                                       <div className="flex flex-col items-center">
    {/* Right arrow button */}
                                <button 
                                    onClick={() => { changePic({ direction: "right", gesture: null }) }}
                                    className="bg-[#3c2e58] hover:bg-[#4d3b6e] rounded-full p-3 transition-all duration-300"
                                >
                                    <img src="/gesture_icon/leftHand.svg" className="h-12 w-12 rotate-x-0" alt="Next" style={{ filter: 'invert(100%)' }} />
                                </button>
                                
                                {/* Instruction text that pops out */}
                                <div className="mt-2 bg-[#3c2e58]/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white/90 text-xs whitespace-nowrap transform transition-all duration-300 hover:scale-110 animate-pulse-subtle shadow-lg">
                                    Raise your Left hand
                                </div>
                            </div>
                            
                            {/* Category image */}
                            <div className="relative">
                                {imgLoad ? (
                                    <div className="rounded-3xl h-[50vh] w-[30vw] max-w-md bg-[#3c2e58] animate-pulse flex items-center justify-center">
                                        <span className="text-white/50">Loading...</span>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl overflow-hidden bg-[#3c2e58] p-4 shadow-lg">
                                        <img 
                                            src={paths[index].path} 
                                            className="rounded-2xl h-[50vh] w-[30vw] max-w-md object-cover" 
                                            alt={paths[index].name}
                                        />
                                        
                                        {/* Category name */}
                                        <h1 className="text-center text-2xl text-white font-bold tracking-wider mt-4">
                                            {paths[index].name.toUpperCase()}
                                        </h1>
                                    </div>
                                )}
                                
                                {/* Thumbs up indicator */}
                                {!imgLoad && (
                                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-[#3c2e58]/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                                        <img 
                                            src="/gesture_icon/thumbsUp.svg" 
                                            alt="Thumbs up" 
                                            className="w-10 h-10"
                                            style={{ filter: 'invert(100%)' }}
                                        />
                                        <span className="text-white m-auto">Thumbs up to select</span>
                                    </div>
                                )}
                            </div>
                            
                           <div className="flex flex-col items-center">
    {/* Right arrow button */}
                                <button 
                                    onClick={() => { changePic({ direction: "right", gesture: null }) }}
                                    className="bg-[#3c2e58] hover:bg-[#4d3b6e] rounded-full p-3 transition-all duration-300"
                                >
                                    <img src="/gesture_icon/rightHand.svg" className="h-12 w-12" alt="Next" style={{ filter: 'invert(100%)' }} />
                                </button>
                                
                                {/* Instruction text that pops out */}
                                <div className="mt-2 bg-[#3c2e58]/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white/90 text-xs whitespace-nowrap transform transition-all duration-300 hover:scale-110 animate-pulse-subtle shadow-lg">
                                    Raise your right hand
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}