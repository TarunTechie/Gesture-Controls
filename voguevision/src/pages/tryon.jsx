import Header from "../components/header";

export default function TryOn()
{
  return (
    <div>
      <Header heading={"TRY ON"} />
      <div className="w-screen flex justify-around p-4 text-2xl text-white font-extrabold underline underline-offset-2 items-center">
        <span>
        <h1>MODEL</h1>
        <img src={localStorage.getItem('photo')} className="rounded-xl"/>
        </span>
        <span className="grid items-center justify-center">
          <img src="public\icons\thumbsUp.svg" className="w-10 h-10 m-auto"/>TO TRY ON
        </span>
        <span>
        <h1>GARMENT</h1>
        <img src={localStorage.getItem('photo')} className="rounded-xl"/>
        </span>
      </div>
    </div>
  )
}