import { useLocation, useNavigate } from "react-router-dom";
import { tryonApi } from "../constants/api";
import { useEffect, useState, useContext } from "react";
import Header from "../components/header";
import Loader from "../components/loader";
import GestureGuide from "../components/GestureGuide";
import { Broadcast } from "../components/broadcaster";

export default function Output() {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const { gesture, setGesture } = useContext(Broadcast)
    const id = location.state.id
    
    // Define the gestures for this page
    const pageGestures = {
        thumbsUp: {
            icon: "./gesture_icon/thumbsUp.svg",
            action: "Add to Cart"
        },
        opencart: {
            icon: "./gesture_icon/gotoCart.svg",
            action: "Open Cart"
        },
        back: {
            icon: "./gesture_icon/back.svg",
            action: "Go Back"
        }
    }
    
    // Function to show toast notification
    const displayToast = (message) => {
        setToastMessage(message)
        setShowToast(true)
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
    }
    
    // Add to cart function
    const addToCart = () => {
        try {
            // Since we're in the try-on workflow, we should be able to get the garment ID from localStorage
            // If it's not explicitly stored as currentGarmentId, we may need to extract from another source
            
            // For now, let's assume we can find the ID in localStorage or create one
            // This is a placeholder - you'll need to adapt this to your actual data structure
            const garmentId = localStorage.getItem('currentGarmentId') || 
                             (localStorage.getItem('category') + "_garment_" + Date.now())
            
            if (localStorage.getItem('cart') === undefined || localStorage.getItem('cart') === null) {
                localStorage.setItem('cart', garmentId + ',')
            } else {
                let toCart = localStorage.getItem('cart') + garmentId + ','
                localStorage.setItem('cart', toCart)    
            }
            
            // Display toast notification
            displayToast("Outfit added to cart!")
        } catch (error) {
            console.error("Error adding to cart:", error)
            displayToast("Unable to add to cart. Please try again.")
        }
    }
    
    // Handle gesture actions
    useEffect(() => {
        if (gesture.gesture === 'thumbs_up') {
            addToCart()
            setGesture(gesture => ({ ...gesture, gesture: null }))
        }
        
        if (gesture.gesture === 'super') {
            navigate('/cart')
            setGesture(gesture => ({ ...gesture, gesture: null }))
        }
    }, [gesture])
    
    async function getImage() {
        try {
            const result = await tryonApi.get(`/status/${id}`)
            if (result.data.status === 'completed') {
                setImage(result.data.output[0])
                setLoading(false)
            } else {
                // Add a timeout to prevent infinite rapid calls
                setTimeout(() => {
                    getImage()
                }, 1000)
            }
        } catch (error) {
            console.error(error)
            setLoading(false) // Set loading to false on error to prevent infinite loading state
        }
    }
    
    useEffect(() => {
        console.log(id)
        getImage()
    }, [])
    
    // Get photo and garment from localStorage
    const photoSrc = localStorage.getItem('photo') || null
    const garmentSrc = localStorage.getItem('garment') || null
    
    return (
        <div className="h-screen bg-[#210632] flex flex-col overflow-hidden">
            <Header heading={'YOUR RESULT'} />
            
            {/* Gesture Guide */}
            <div className="mt-2">
                <GestureGuide gestures={pageGestures} position="top" />
            </div>
            
            {loading ? (
                <Loader />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-hidden py-2">
                    <div className="w-full max-w-7xl">
                        {/* Main title */}
                        <div className="text-center mb-4">
                            <h2 className="text-white text-xl font-bold tracking-wider">VIRTUAL TRY-ON</h2>
                            <div className="w-32 h-1 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] mx-auto mt-1"></div>
                        </div>
                        
                        {/* Single row with all images */}
                        <div className="w-full bg-[#3c2e58]/80 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
                            <div className="flex justify-between items-center">
                                {/* Left - Original photo */}
                                <div className="w-1/4 flex flex-col items-center">
                                    <h3 className="text-white font-semibold mb-2 text-base">YOUR PHOTO</h3>
                                    <div className="rounded-xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg w-full">
                                        <div className="bg-[#210632]/70 rounded-xl overflow-hidden h-40 w-full">
                                            {photoSrc ? (
                                                <img 
                                                    src={photoSrc}
                                                    className="w-full h-full object-contain" 
                                                    alt="Original photo"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <p className="text-white/50 text-xs">Photo not available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Center - Result image (larger) */}
                                <div className="w-2/4 flex flex-col items-center mx-4">
                                    <h3 className="text-white font-semibold mb-2 text-lg">RESULT</h3>
                                    <div className="rounded-xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg w-full">
                                        <div className="bg-[#210632]/70 rounded-xl overflow-hidden h-96 w-full">
                                            {image ? (
                                                <img 
                                                    src={image}
                                                    className="w-full h-full object-contain" 
                                                    alt="Try-on result"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <p className="text-white/50 text-xs">Result not available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right - Garment image */}
                                <div className="w-1/4 flex flex-col items-center">
                                    <h3 className="text-white font-semibold mb-2 text-base">SELECTED OUTFIT</h3>
                                    <div className="rounded-xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg w-full">
                                        <div className="bg-[#210632]/70 rounded-xl overflow-hidden h-40 w-full">
                                            {garmentSrc ? (
                                                <img 
                                                    src={garmentSrc}
                                                    className="w-full h-full object-contain" 
                                                    alt="Selected garment"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <p className="text-white/50 text-xs">Garment not available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center justify-center gap-6 mt-4">
                            <button
                                onClick={addToCart}
                                className="flex items-center gap-2 bg-[#7E8ABA] hover:bg-[#8E9ACA] text-white px-6 py-2 rounded-full transition-colors duration-300 shadow-lg"
                            >
                                <img 
                                    src="./gesture_icon/thumbsUp.svg" 
                                    className="h-5 w-5" 
                                    alt="Thumbs up"
                                    style={{ filter: 'invert(100%)' }}
                                />
                                <span>Add to Cart</span>
                            </button>
                            
                            <button
                                onClick={() => navigate('/cart')}
                                className="flex items-center gap-2 bg-[#3c2e58] hover:bg-[#4d3b6e] text-white px-6 py-2 rounded-full transition-colors duration-300 shadow-lg border border-purple-500/30"
                            >
                                <img 
                                    src="./gesture_icon/open_cart.svg" 
                                    className="h-5 w-5" 
                                    alt="Cart"
                                    style={{ filter: 'invert(100%)' }}
                                />
                                <span>Go to Cart</span>
                            </button>
                        </div>
                        
                        {/* Instructions */}
                        <div className="mt-2 text-center">
                            <p className="text-white/60 text-xs">
                                Make a thumbs up gesture to add this outfit to your cart
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Toast Notification */}
            <div 
                className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#7E8ABA] text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-3 transition-all duration-500 ${
                    showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            >
                <img 
                    src="./gesture_icon/open_cart.svg" 
                    className="h-5 w-5" 
                    alt="Cart" 
                    style={{ filter: 'invert(100%)' }}
                />
                <span>{toastMessage}</span>
                
                {/* Animated progress bar */}
                {showToast && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/70 rounded-b-full animate-progress"></div>
                )}
            </div>
            
            {/* Add animation keyframes */}
            <style jsx>{`
                @keyframes progress {
                    0% { width: 100%; }
                    100% { width: 0%; }
                }
                
                .animate-progress {
                    animation: progress 3s linear forwards;
                }
            `}</style>
        </div>
    )
}