import Header from "../components/header";
import {useContext, useEffect, useState} from "react"
import Loader from "../components/loader";
import { paths } from "../constants/consts";
import { Broadcast , Loading} from "../components/broadcaster";
import { useNavigate } from "react-router-dom";
export default function Categories()
{
    const [index, setIndex] = useState(0)
    const { gesture, setGesture} = useContext(Broadcast)
    const { loading, setLoading } = useContext(Loading)
    const nav=useNavigate()
    function changePic(gesture)
    {
        console.log(gesture)
        let len = paths.length
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
            if (gesture.gesture == "thumbs_up")
            {
                console.log('thumbs up')
                setGesture(gesture=>({...gesture,gesture:null,direction:null}))
                nav('/clothes')
            }
        }
    }
    useEffect(()=>{changePic(gesture)},[gesture])
    return (
        <div>
        <Header heading={"Categories"}/>
        {loading?
            <Loader /> :
                <div className="bg-white/40 w-[40vw] p-8 m-auto rounded-4xl">
                <div className="flex justify-between">
                    <button onClick={() => { changePic("left") }}><img src="/icons/left.svg" className="h-20" /></button>
                        <img src={paths[index]} className="rounded-xl h-[60vh] w-auto m-auto p-2" />          
                    <button onClick={()=>{changePic("right")}}><img src="/icons/right.svg" className="h-20"/></button>
                    </div>
                    <h1 className="text-center text-3xl text-white font-bold">SHIRTS</h1>
        </div>}
        </div>
    )
}