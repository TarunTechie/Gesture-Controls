import Header from "../components/header";
import {useContext, useEffect, useState} from "react"
import Loader from "../components/loader";
import { MenCollections, WomenCollection } from "../constants/collections";
import { Broadcast, Loading } from "../components/broadcaster";
import { useNavigate } from "react-router-dom";
import GestureGuide from "../components/GestureGuide";

export default function Clothes() {
    const [index, setIndex] = useState(0)
    const [imgLoad, setImgLoad] = useState(true)
    const [collections, setCollections] = useState([])
    const { gesture, setGesture} = useContext(Broadcast)
    const { loading, setLoading } = useContext(Loading)
    const nav = useNavigate()
    
    // Define the gestures for this page
    const pageGestures = {
        leftHand: {
            icon: "./gesture_icon/leftHand.svg",
            action: "Previous"
        },
        thumbsUp: {
            icon: "./gesture_icon/thumbsUp.svg",
            action: "Try On"
        },
        super: {
            icon: "./gesture_icon/open_cart.svg",
            action: "Add to Cart"
        },
        rightHand: {
            icon: "./gesture_icon/rightHand.svg",
            action: "Next"
        }
    }
    
    function changePic(gesture)
    {
        console.log(gesture)
        let len = collections.length
        if (gesture.gesture===null)
        {
            if (gesture.direction === "left")
                {
                    if (index === 0)
                    {
                        setIndex(len-1)
                    }
                    else
                    {
                        setIndex((index)=>index-1)    
                    }
                }
                if (gesture.direction === "right")
                {
                    if (index === len - 1)
                    {
                        setIndex(0)
                    }
                    else
                    {
                        setIndex((index)=>index+1)
                    }
                }
        }
        else
        {
            if (gesture.gesture === "thumbs_up")
            {
                console.log('thumbs up')
                const path=collections[index].path
                setGesture(gesture => ({ ...gesture, gesture: null, direction: null }))
                const fetchImage = async (path) => {
                    try {
                        const image = await fetch(path)
                        const blob = await image.blob()
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            const base64img = reader.result
                            console.log(base64img)
                            localStorage.setItem('garment', base64img)
                            localStorage.setItem('category',collections[index].type)
                        }
                        reader.readAsDataURL(blob)
                    } catch (error) {
                        console.error("Path not found",error)
                    }
                }
                fetchImage(path)
                nav('/capture')
            }
            if (gesture.gesture === 'super')
            {
                if (localStorage.getItem('cart') == undefined)
                {
                    localStorage.setItem('cart',collections[index].id+',')
                }
                else
                {
                    let toCart=localStorage.getItem('cart')+collections[index].id+','
                    localStorage.setItem('cart',toCart)    
                }
            }
        }
    }
    useEffect(() => { changePic(gesture) }, [gesture])
    
    useEffect(() => {
        const gender = localStorage.getItem('gender')
        const category = localStorage.getItem('category')
        if (gender === 'm')
        {
            setCollections(MenCollections.filter((value,index,MenCollections) => (
                value.category==category
            )))
        }
        if (gender === 'f')
        {
            setCollections(WomenCollection.filter((value,index,WomenCollection) => (
                value.category==category
            )))
        }
        setImgLoad(false)
    },[])
    
    return (
        <div className="h-screen bg-[#210632] flex flex-col overflow-hidden">
            <Header heading={localStorage.getItem('category')} />
            
            {/* Gesture Guide */}
            <div className="mt-4 mb-2">
                <GestureGuide gestures={pageGestures} position="top" />
            </div>
            
            {loading ? (
                <Loader />
            ) : (
                <div className="flex-1 flex items-center justify-center px-4 py-3 max-h-[calc(100vh-130px)]">
                    <div className="w-full max-w-4xl">        
                        {/* Main image and navigation */}
                        <div className="flex items-center justify-between gap-4">
                            {/* Left hand navigation */}
                            <div className="flex flex-col items-center">
                                <button 
                                    onClick={() => { changePic("left") }}
                                    className="bg-[#3c2e58] hover:bg-[#4d3b6e] rounded-full p-3 transition-all duration-300"
                                >
                                    <img 
                                        src="./gesture_icon/leftHand.svg" 
                                        className="h-11 w-11" 
                                        alt="Previous" 
                                        style={{ filter: 'invert(100%)' }}
                                    />
                                </button>
                                
                                {/* Instruction text */}
                                <div className="mt-2 bg-[#3c2e58]/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white/90 text-xs whitespace-nowrap transform transition-all duration-300 hover:scale-110 animate-pulse-subtle shadow-lg">
                                    Raise your left hand
                                </div>
                            </div>
                            
                            {/* Clothing item display */}
                            <div className="relative">
                                {imgLoad ? (
                                    <div className="rounded-3xl h-[48vh] w-[30vw] max-w-md bg-[#3c2e58] animate-pulse flex items-center justify-center">
                                        <span className="text-white/50">Loading...</span>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl overflow-hidden bg-[#3c2e58] p-4 shadow-lg">
                                        {/* Main image */}
                                        <div className="relative h-[40vh] flex items-center justify-center">
                                            <img 
                                                src={collections[index].path} 
                                                className="rounded-xl h-full w-auto max-w-md object-contain" 
                                                alt={collections[index].displayName}
                                            />
                                            
                                            {/* Gesture hints overlaid on image */}
                                            <div className="absolute top-3 right-3 bg-[#3c2e58]/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                                                <img 
                                                    src="./gesture_icon/thumbsUp.svg" 
                                                    alt="Thumbs up" 
                                                    className="w-5 h-5"
                                                    style={{ filter: 'invert(100%)' }}
                                                />
                                                <span className="text-white text-xs">Try On</span>
                                            </div>
                                        </div>
                                        
                                        {/* Product details card */}
                                        <div className="bg-[#7E8ABA]/80 border border-white/30 backdrop-blur-md p-3 rounded-xl mt-3 shadow-md">
                                            <div className="flex justify-between font-bold text-white">
                                                <h1 className="text-lg">{collections[index].displayName}</h1>
                                                <h1 className="text-lg">₹ {collections[index].price}/-</h1>
                                            </div>
                                            <div className="flex justify-between items-center text-white font-bold bg-white/20 p-2 mt-2 rounded-full">
                                                <span className="flex items-center gap-2 pl-3">
                                                    <h2 className="font-light">Color:</h2>
                                                    <h1>{collections[index].color}</h1>
                                                </span>
                                                
                                                <div className="flex items-center gap-2 bg-[#4d3b6e] py-1.5 px-4 rounded-full">
                                                    <img 
                                                        src="./gesture_icon/open_cart.svg" 
                                                        className="h-5 w-5" 
                                                        alt="Super gesture"
                                                        style={{ filter: 'invert(100%)' }}
                                                    />
                                                    <span className="text-sm">ADD TO CART</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Right hand navigation */}
                            <div className="flex flex-col items-center">
                                <button 
                                    onClick={() => { changePic("right") }}
                                    className="bg-[#3c2e58] hover:bg-[#4d3b6e] rounded-full p-3 transition-all duration-300"
                                >
                                    <img 
                                        src="./gesture_icon/rightHand.svg" 
                                        className="h-11 w-11" 
                                        alt="Next" 
                                        style={{ filter: 'invert(100%)' }}
                                    />
                                </button>
                                
                                {/* Instruction text */}
                                <div className="mt-2 bg-[#3c2e58]/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white/90 text-xs whitespace-nowrap transform transition-all duration-300 hover:scale-110 animate-pulse-subtle shadow-lg">
                                    Raise your right hand
                                </div>
                            </div>
                        </div>
                        
                        {/* Pagination indicator */}
                        {!imgLoad && collections.length > 0 && (
                            <div className="flex justify-center mt-3">
                                <div className="flex gap-1">
                                    {collections.map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
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