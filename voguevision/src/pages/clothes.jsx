import Header from "../components/header";
import {useState} from "react"
import Loader from "../components/loader";
export default function Clothes()
{
    const[loading,setLoading]=useState(false)
    return (
        loading?
            <Loader />:
        <div>
            <Header/>
        </div>
    )
}