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
    if(gesture.hands==true)
      nav('/gender')
  },[gesture])
  return (
    <div>
      <Header heading={"Hello World"}/>
      <img src="./images/homeBg.png" className="h-screen align-center m-auto" />
      <Link to={'/capture'} > <button className="button"> CAMERA   </button> </Link>
      <Link to={'/gender'} > <button className="button"> GENDER   </button> </Link>
      <Link to={'/clothes'}><button className="button"> CLOTHES </button>   </Link>
      <Link to={'/categories'}><button className="button"> CATEGORIES </button>   </Link>
      <Link to={'/output'}><button className="button"> OUTPUT </button>   </Link>
    </div> 
  )
}