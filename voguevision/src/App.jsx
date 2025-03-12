import { Link } from "react-router-dom"
import './index.css'
export default function App()
{
  return (
    <div>
      <img src="./images/homeBg.png" className="h-screen align-center m-auto" />
      <Link to={'/camera'}  className="button">GO TO CAMERA</Link>
      <Link to={'/gender'}  className="button">GO TO GENDER</Link>
      <Link to={'/clothes'}  className="button">GO TO SELECTION</Link>
    </div> 
  )
}