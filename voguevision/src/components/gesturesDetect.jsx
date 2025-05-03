import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as model from "@tensorflow-models/handpose"
import { useContext, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

import {Broadcast,Loading} from "./broadcaster";
import { Pose } from "../constants/pose";
export default function GestureDetect()
{
    const { gesture, setGesture } = useContext(Broadcast)
    const {loading,setLoading}=useContext(Loading)
    const nav=useNavigate()
    const webcamRef = useRef(null)
    const runModel = async () => {
        const net = await model.load()
        setLoading(false)
        setInterval(()=>{detect(net)},3000)
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
                setGesture({ gesture: detectedGesture, change:!gesture.change,hands:true})
                }
            }
            catch (error)
            {
                console.error(error)
            }
        }
    }
    useEffect(() => {runModel()},[])
    return (
        <div className="m-auto w-fit shadow shadow-fuchsia-300 rounded-2xl">
                <Webcam className={`m-auto rounded-2xl ${loading?"hidden":""}`} ref={webcamRef} mirrored={"user"} />
        </div>
    )
}