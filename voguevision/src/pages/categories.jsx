import Header from "../components/header";
import {useState} from "react"
import Loader from "../components/loader";
import { paths } from "../constants/consts";
export default function Categories()
{
    const [loading, setLoading] = useState(false)
    const [index,setIndex]=useState(0)
    function changePic(direction)
    {
        let len = paths.length
        if (direction === "left")
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
        if (direction === "right")
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
    return (
        loading?
            <Loader /> :

            <div>
                <Header heading={"Categories"}/>
                <div className="bg-white/40 w-[40vw] p-8 m-auto rounded-4xl">
                <div className="flex justify-between">
                    <button onClick={() => { changePic("left") }}><img src="/icons/left.svg" className="h-20" /></button>
                        <img src={paths[index]} className="rounded-xl h-[60vh] w-auto m-auto p-2" />          
                    <button onClick={()=>{changePic("right")}}><img src="/icons/right.svg" className="h-20"/></button>
                    </div>
                    <h1 className="text-center text-3xl text-white font-bold">T-SHIRTS</h1>
                </div>
        </div>
    )
}