import { useEffect } from "react";
import Header from "../components/header";
import { tryonApi } from "../constants/api";
import { useContext } from "react";
import { Broadcast, Loading } from "../components/broadcaster";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import GestureGuide from "../components/GestureGuide";

export default function TryOn() {
  const { gesture, setGesture } = useContext(Broadcast)
  const { loading, setLoading } = useContext(Loading)
  const nav = useNavigate()
  
  // Define the gestures for this page
  const pageGestures = {
    thumbsUp: {
      icon: "./gesture_icon/thumbsUp.svg",
      action: "Try On"
    },
    back: {
      icon: "./gesture_icon/back.svg",
      action: "Go Back"
    }
  }
  
  async function getOverlay() {
    const tosend = {
      model_image: localStorage.getItem('photo'),
      garment_image: localStorage.getItem('garment'),
      category: localStorage.getItem('type'),
      mode: 'quality',
      return_base64: true
    }
    try {
      const result = await tryonApi.post('/run', JSON.stringify(tosend))
      nav('/output', { state: { id: result.data.id } })
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    console.log(gesture.gesture)
    if (gesture.gesture === 'thumbs_up') {
      getOverlay()
    }
  }, [gesture])
  
  return (
    <div className="h-screen bg-[#210632] flex flex-col overflow-hidden">
      <Header heading={"PREVIEW"} />
      
      {/* Gesture Guide */}
      <div className="mt-4 mb-2">
        <GestureGuide gestures={pageGestures} position="top" />
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 py-3">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8 justify-between items-center">
              {/* MODEL SECTION */}
              <div className="flex-1">
                <div className="text-center mb-4">
                  <h2 className="text-white text-2xl font-bold">MODEL</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] mx-auto mt-1"></div>
                </div>
                
                <div className="rounded-2xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg">
                  <div className="bg-[#3c2e58] rounded-2xl overflow-hidden">
                    <img 
                      src={localStorage.getItem('photo')} 
                      className="w-full h-[50vh] object-cover" 
                      alt="Model"
                    />
                  </div>
                </div>
              </div>
              
              {/* CENTER SECTION WITH GESTURE */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#3c2e58]/70 backdrop-blur-md rounded-full h-20 w-20 flex items-center justify-center mb-4 shadow-lg border border-purple-500/30">
                  <img 
                    src="./gesture_icon/thumbsUp.svg" 
                    className="w-12 h-12" 
                    alt="Thumbs up"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
                <p className="text-white text-lg font-semibold">TO TRY ON</p>
                
                {/* Animated arrow indicators */}
                <div className="flex space-x-16 mt-6">
                  <div className="w-8 h-8 relative animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>
                  <div className="w-8 h-8 relative animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* GARMENT SECTION */}
              <div className="flex-1">
                <div className="text-center mb-4">
                  <h2 className="text-white text-2xl font-bold">GARMENT</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] mx-auto mt-1"></div>
                </div>
                
                <div className="rounded-2xl p-0.5 bg-gradient-to-r from-[#6021E3] to-[#AE0FF1] shadow-lg">
                  <div className="bg-[#3c2e58] rounded-2xl overflow-hidden">
                    <img 
                      src={localStorage.getItem('garment')} 
                      className="w-full h-[50vh] object-cover" 
                      alt="Garment"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Make a thumbs up gesture to try on this garment
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  )
}