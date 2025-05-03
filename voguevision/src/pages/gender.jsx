import { useNavigate } from "react-router-dom"
import { Broadcast } from "../components/broadcaster"
import Header from "../components/header"
import { useContext, useEffect } from "react"
export default function Gender()
{
    const{gesture,setGesture}=useContext(Broadcast)
    const nav=useNavigate()
    const Item = ({text,image,color}) => (
        <div style={{backgroundColor:color}} className="my-auto rounded-3xl justify-center text-2xl font-bold text-center text-white py-20 w-56 content-center">
            <img src={image} className="bg-white/25 h-40 m-auto rounded-full p-2 border-1 "/>
            <h1>{text.toUpperCase()}</h1>
        </div>
    )
    useEffect(()=>{
        if(gesture.gesture=='left')
        {
            console.log("Set female")
            localStorage.setItem('gender','f')
        }
        if(gesture.gesture=='right')
        {
            console.log("Set male")
            localStorage.setItem('gender','m')
        }
        nav('/categories')
    },[gesture])
    return (
        <div className="h-screen ">
            <Header heading={"GENDER"} />
            <div className="flex gap-10 justify-center my-auto">
                <Item text={"Female"} image={"./icons/female.svg"} color={"#BD04E5"}/>
                <Item text={"Male"} image={"./icons/male.svg"} color={"#6A36E1"}/>
            </div>
        </div>
    )
}