import { useLocation } from "react-router-dom";
import { tryonApi } from "../constants/api";
import { useEffect, useState } from "react";
import Header from "../components/header";
export default function Output()
{
    const [image, setImage] = useState(null)
    const location = useLocation()
    const id=location.state.id
    async function getImage()
    {
        try {
            const result = await tryonApi.get(`/status/${id}`)
            if (result.data.status === 'completed')
            {
                setImage(result.data.output[0])
            }
            else
            {
                getImage()    
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.log(id)
        getImage()
    },[])
    return (
    <div className="min-h-screen flex flex-col">
  {/* Top header */}
  <Header heading={'Your Image'} />

   <div className="grid justify-center items-center ">
        <img src={image} className="m-auto rounded-2xl"/>
    </div>
</div>
    )
}