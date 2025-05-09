import Header from "../components/header";
import {useContext, useEffect, useState} from "react"
import Loader from "../components/loader";
import { MenCollections,WomenCollection } from "../constants/collections";
import { Broadcast, Loading } from "../components/broadcaster";
import { useNavigate } from "react-router-dom";

export default function Clothes()
{
    const [index, setIndex] = useState(0)
    const [imgLoad,setImgLoad]=useState(true)
    const[collections,setCollections]=useState([])
    const { gesture, setGesture} = useContext(Broadcast)
    const { loading, setLoading } = useContext(Loading)
    const nav=useNavigate()
    function changePic(gesture)
    {
        console.log(gesture)
        let len = collections.length
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
            if (gesture.gesture === "thumbs_up")
            {
                console.log('thumbs up')
                const path=collections[index].path
                setGesture(gesture => ({ ...gesture, gesture: null, direction: null }))
                const fetchImage = async (path) => {
                    try {
                        const image = await fetch(path)
                        const blob = await image.blob()
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            const base64img = reader.result
                            console.log(base64img)
                            localStorage.setItem('garment', base64img)
                            localStorage.setItem('category',collections[index].type)
                        }
                        reader.readAsDataURL(blob)
                    } catch (error) {
                        console.error("Path not found",error)
                    }
                }
                fetchImage(path)
                nav('/capture')
            }
            if (gesture.gesture === 'super')
            {
                if (localStorage.getItem('cart') == undefined)
                {
                    localStorage.setItem('cart',collections[index].id+',')
                }
                else
                {
                    let toCart=localStorage.getItem('cart')+collections[index].id+','
                    localStorage.setItem('cart',toCart)    
                }
            }
        }
    }
    useEffect(() => { changePic(gesture) }, [gesture])
    
    useEffect(() => {
        const gender = localStorage.getItem('gender')
        const category = localStorage.getItem('category')
        if (gender === 'm')
        {
            setCollections(MenCollections.filter((value,index,MenCollections) => (
                value.category==category
            )))
        }
        if (gender === 'f')
        {
            setCollections(WomenCollection.filter((value,index,WomenCollection) => (
                value.category==category
            )))
        }
        setImgLoad(false)
    },[])
    return (
            <div>
                <Header heading={localStorage.getItem('category')}/>
                {loading?<Loader/>:(<div className="bg-white/40 w-[40vw] p-8 m-auto rounded-4xl">
                <div className="flex justify-between">
                    <button onClick={() => { changePic("left") }}><img src="/icons/left.svg" className="h-20" /></button>
                    {imgLoad?null:<div className="w-[30vw]">
                        <img src={collections[index].path} className="rounded-xl h-[50vh] w-auto m-auto p-2" />
                            <div id="dressDetails" className="bg-[#7E8ABA]/80 border-1 border-white backdrop-blur-3xl p-4 rounded-2xl">
                                <div className="flex justify-between font-bold text-white">
                                <h1>{collections[index].displayName }</h1>
                                    <h1>₹ {collections[index].price }/-</h1>
                                </div>
                                <div className="flex justify-around text-white font-bold bg-white/30 p-1 m-1 rounded-full w-full items-center">
                                    <span className="flex"><h2 className="font-light">Color:</h2><h1>{collections[index].color }</h1></span>
                                <button className="flex text-white font-semibold border-2 border-white p-2 rounded-full items-center ">
                                    <img src="/icons/thumbsUp.svg" className="h-6" />ADD TO CART
                                </button>
                                </div>
                            </div>            
                    </div>}
                    <button onClick={()=>{changePic("right")}}><img src="/icons/right.svg" className="h-20"/></button>
                </div>
                </div>)}
        </div>
    )
}