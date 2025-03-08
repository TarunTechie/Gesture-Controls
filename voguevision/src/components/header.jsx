import { Link } from "react-router-dom"
export default function Header()
{
    return (
        <header className="w-screen p-5 h-fit">
            <div className="justify-between flex">
                <Link to={'/'}>
                <img src="./logo.svg"/>
                </Link>
                <img src="./icons/login.svg" className="bg-white/50 border-2 border-white rounded-full w-12 h-12 p-2"/>
        </div>
        </header>
    )
}