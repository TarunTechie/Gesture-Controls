import { useEffect } from "react";
import Header from "../components/header";
import { tryonApi } from "../constants/api";
import { useContext } from "react";
import { Broadcast,Loading } from "../components/broadcaster";
import Loader from "../components/loader";
export default function TryOn()
{
  const { gesture, setGesture } = useContext(Broadcast)
  const { loading, setLoading } = useContext(Loading)
  
  async function getOverlay()
  {
    const tosend = {
        model_image: localStorage.getItem('photo'),
        garment_image: localStorage.getItem('garment'),
        category: localStorage.getItem('category'),
        mode: 'quality',
        return_base64:true
    }
    try {
      const result = await tryonApi.post('/run', JSON.stringify(tosend))
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    console.log(gesture.gesture)
    if (gesture.gesture === 'thumbs_up')
    {
      getOverlay()
    }
  },[gesture])
  return (
    <div>
      <Header heading={"TRY ON"} />
      {loading?<Loader/>:<div className="w-screen flex justify-around p-4 text-2xl text-white font-extrabold underline underline-offset-2 items-center">
        <span>
        <h1>MODEL</h1>
        <img src={localStorage.getItem('photo')} className="rounded-xl w-[40vw] h-[60vh]"/>
        </span>
        <span className="grid items-center justify-center">
          <img src="public\icons\thumbsUp.svg" className="w-10 h-10 m-auto"/>TO TRY ON
        </span>
        <span>
        <h1>GARMENT</h1>
        <img src={localStorage.getItem('garment')} className="rounded-xl w-[40vw] h-[60vh]"/>
        </span>
      </div>}
    </div>
  )
}