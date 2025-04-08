import Header from "../components/header";
import {useState} from "react"
import Loader from "../components/loader";
import { paths } from "../constants/consts";
export default function Clothes()
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
                <Header heading={"T-Shirts"}/>
                <div className="bg-white/40 w-[40vw] p-8 m-auto rounded-4xl">
                <div className="flex justify-between">
                    <button onClick={() => { changePic("left") }}><img src="/icons/left.svg" className="h-20" /></button>
                    <div className="w-[30vw]">
                        <img src={paths[index]} className="rounded-xl h-[50vh] w-auto m-auto p-2" />
                            <div id="dressDetails" className="bg-[#7E8ABA]/80 border-1 border-white backdrop-blur-3xl p-4 rounded-2xl">
                                <div className="flex justify-between font-bold text-white">
                                    <h1>Basic T-Shirt</h1>
                                    <h1>₹ 450</h1>
                                </div>
                                <div className="flex justify-around text-white font-bold bg-white/30 p-1 m-1 rounded-full w-full">
                                    <span className="flex"><h2 className="font-light">Size:</h2><h1>{"M"}</h1></span>
                                    <span className="flex"><h2 className="font-light">Color:</h2><h1>{"White"}</h1></span>
                                </div>
                                <button className="flex text-white font-semibold border-2 border-white p-2 rounded-full items-center m-auto">
                                    <img src="/icons/thumbsUp.svg" className="h-6" />ADD TO CART
                                </button>
                            </div>            
                    </div>
                    <button onClick={()=>{changePic("right")}}><img src="/icons/right.svg" className="h-20"/></button>
                </div>
                </div>
        </div>
    )
}