import Header from "../components/header"
export default function Gender()
{
    const Item = ({text,image,color}) => (
        <div style={{backgroundColor:color}} className="my-auto rounded-3xl justify-center text-2xl font-bold text-center text-white py-20 w-56 content-center">
            <img src={image} className="bg-white/25 h-40 m-auto rounded-full p-2 border-1 "/>
            <h1>{text.toUpperCase()}</h1>
        </div>
    )
    return (
        <div className="h-screen ">
            <Header heading={"GENDER"} />
            <div className="flex gap-10 justify-center my-auto">
                <Item text={"Male"} image={"./icons/male.svg"} color={"#6A36E1"}/>
                <Item text={"Female"} image={"./icons/female.svg"} color={"#BD04E5"}/>
            </div>
        </div>
    )
}