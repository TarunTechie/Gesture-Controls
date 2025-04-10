import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as model from "@tensorflow-models/handpose"
import { useContext, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

import { Broadcast } from "./broadcaster";
import { Pose } from "../constants/pose";
import Loader from "../components/loader"
export default function GestureDetect()
{
    const{gesture,setGesture}=useContext(Broadcast)
    const [loading, setLoading] = useState(true)
    const nav=useNavigate()
    const webcamRef = useRef(null)
    const runModel = async () => {
        const net = await model.load()
        setLoading(false)
        setInterval(()=>{detect(net)},5000)
    }

    async function detect (net)  {
        if (webcamRef.current !== null && webcamRef.current.video.readyState === 4)
        {
            const video = webcamRef.current.video
            const width = webcamRef.current.video.videoWidth
            const height = webcamRef.current.video.videHeight
            
            webcamRef.current.video.width = width
            webcamRef.current.video.height = height
            
            try{const hands = await net.estimateHands(video)
            console.log(hands.length)
            if(hands.length!=0)
            {
                console.log("hello")
                const fingers = new Pose(hands[0].landmarks)
                const detectedGesture = fingers.getGesture()
                setGesture(detectedGesture)
                }
            }
            catch (error)
            {
                console.error(error)
            }
        }
    }
    useEffect(()=>{runModel()},[])
    return (
        <div className="m-auto w-fit shadow shadow-fuchsia-300 rounded-2xl">
            {loading?<Loader/>:(
                <Webcam className="m-auto rounded-2xl" ref={webcamRef} mirrored={"user"} />
            )}
        </div>
    )
}