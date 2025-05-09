import { Link, useNavigate } from "react-router-dom"
import './index.css'
import Header from "./components/header"
import { useContext, useEffect, useState } from "react"
import { Broadcast } from "./components/broadcaster"
export default function App()
{
  const[counter,setCounter]=useState(0)
  const nav=useNavigate()
  const{gesture,setGesture}=useContext(Broadcast)
  useEffect(()=>{
    if (gesture.hands === true)
    {
      localStorage.clear('cart')
      nav('/gender')
    }
  },[gesture])
  return (
    <div>
      <Header heading={"Hello World"}/>
      <img src="./images/homeBg.png" className="h-[80vh] align-center m-auto" />
    </div> 
  )
}