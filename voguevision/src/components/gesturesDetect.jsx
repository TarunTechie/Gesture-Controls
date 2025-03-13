import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as model from "@tensorflow-models/handpose"
import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

import { Pose } from "../constants/pose";
import Loader from "../components/loader"
export default function GestureDetect()
{
    const [loading,setLoading]=useState(true)
    const nav=useNavigate()
    const webcamRef = useRef(null)
    const runModel = async () => {
        const net = await model.load()
        setLoading(false)
        setInterval(()=>{detect(net)},1000)
    }

    const detect = async (net) => {
        if (webcamRef.current !== null && webcamRef.current.video.readyState === 4)
        {
            const video = webcamRef.current.video
            const width = webcamRef.current.video.videoWidth
            const height = webcamRef.current.video.videHeight
            
            webcamRef.current.video.width = width
            webcamRef.current.video.height = height
            
            const hands = await net.estimateHands(video)
            if(hands.length>0)
            {
                const fingers = new Pose(hands[0].landmarks)
                const gesture = fingers.getGesture()
                console.log(gesture)
            }
        }
    }
    runModel()
    return (
        <div className="m-auto w-fit content-center p-8 rounded-2xl backdrop-blur-2xl">
            {loading?<Loader/>:(
                <Webcam className="m-auto rounded-2xl w-96" ref={webcamRef} mirrored={"user"}/>
            )}
        </div>
    )
}