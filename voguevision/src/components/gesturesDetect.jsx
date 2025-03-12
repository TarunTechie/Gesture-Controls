import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as fp from "fingerpose"
import * as model from "@tensorflow-models/handpose"
import { useRef, useEffect } from "react";
import { leftTwoFinger } from "./pose";
export default function GestureDetect()
{
    const webcamRef = useRef(null)
    const runModel = async () => {
        const net = await model.load()
        console.log("loaded")
        setInterval(()=>{detect(net)},3000)
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
                const gestureEstimator = new fp.GestureEstimator([leftTwoFinger])
                const gesture = await gestureEstimator.estimate(hands[0].landmarks, 3)
                if (gesture.gestures !== undefined && gesture.gestures.length>0)
                {
                    console.log(gesture)
                }
            }
        }
    }
    runModel()
    return (
        <div className="m-auto w-fit content-center p-10 bg-white/25 rounded-2xl backdrop-blur-2xl">
            <Webcam className="m-auto rounded-2xl w-96" ref={webcamRef} />
        </div>
    )
}