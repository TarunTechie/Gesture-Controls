import { Link } from "react-router-dom"
import './index.css'
export default function App()
{
  return (
    <div>
      <img src="./images/homeBg.png" className="h-screen align-center m-auto" />
      <Link to={'/camera'} className="bg-white mx-2 p-2">GO TO CAMERA</Link>
      <Link to={'/gender'} className="bg-white mx-2 p-2">GO TO GENDER</Link>
    </div> 
  )
}