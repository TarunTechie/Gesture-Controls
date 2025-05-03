import { Link } from "react-router-dom"
import './index.css'
export default function App()
{
  return (
    <div>
      <img src="./images/homeBg.png" className="h-screen align-center m-auto" />
      <Link to={'/camera'} > <button className="button"> CAMERA   </button> </Link>
      <Link to={'/gender'} > <button className="button"> GENDER   </button> </Link>
      <Link to={'/clothes'}><button className="button"> CLOTHES </button>   </Link>
      <Link to={'/categories'}><button className="button"> CATEGORIES </button>   </Link>
    </div> 
  )
}