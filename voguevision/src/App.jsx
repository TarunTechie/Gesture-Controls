import { Link, useNavigate } from "react-router-dom"
import './index.css'
import Header from "./components/header"
import { useContext, useEffect, useState } from "react"
import { Broadcast } from "./components/broadcaster"

export default function App() {
  const [counter, setCounter] = useState(0)
  const nav = useNavigate()
  const { gesture, setGesture } = useContext(Broadcast)
  
  useEffect(() => {
    if (gesture.length>0) {
      localStorage.clear('cart')
      setCounter(1)
    }
    if (counter > 0)
    {
      nav('/gender')
    }
  }, [gesture])

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#210632] flex flex-col">
      {/* Header Component */}
      <Header heading="Wave you hand" />
      
      {/* Main content - centered box design */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl relative">
          {/* Content Box with border and gradient background */}
          <div className="relative rounded-2xl overflow-hidden border border-blue-600/30">
            {/* Gradient background inside box */}
            <div className="absolute inset-0 z-0">
              {/* Top-right gradient blob */}
              <div className="absolute top-0 right-0 w-full h-1/2 opacity-80 blur-sm"
                style={{ 
                  background: 'linear-gradient(135deg, #4A08D7 0%, transparent 70%)',
                }}
              ></div>
              
              {/* Bottom-left gradient blob */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-80 blur-sm"
                style={{ 
                  background: 'linear-gradient(315deg, #B805DF 0%, transparent 70%)',
                }}
              ></div>
              
              {/* Bottom-right accent blob */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-50 blur-sm"
                style={{ 
                  background: 'linear-gradient(225deg, #5D4CBB 0%, transparent 80%)',
                }}
              ></div>
            </div>
            
            {/* Content inside the box */}
            <div className="relative z-10 py-16 px-8 flex flex-col items-center">
              {/* Logo */}
              <div className="text-center mb-16">
                <h1 className="text-white text-7xl font-bold tracking-wider">VOGUE</h1>
                <div className="h-2"></div>
                <h2 className="text-transparent text-6xl font-light tracking-widest" 
                  style={{ 
                    WebkitTextStroke: '1px white'
                  }}>
                  VISION
                </h2>
              </div>
              
              {/* Instruction text */}
              <div className="text-center mt-16 mb-12">
                <p className="text-white/90 text-xl font-light">
                  Wave your hand to start the application
                </p>
              </div>
              
              {/* Wave hand gesture icon and text */}
              <div className="mt-8 mb-6 relative">
                <div className="bg-[#3c2e58]/50 w-40 h-40 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">
                    <img 
                      src="./gesture_icon/wave.svg" 
                      alt="Wave gesture" 
                      className="w-24 h-24 mb-1"

                    />
                  </div>
                </div>
                
                <div className="absolute w-full text-center -bottom-14">
                  <p className="text-white text-xl font-medium tracking-wider">Start</p>
                  <p className="text-white text-xl font-medium tracking-wider">Vouge Vision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}