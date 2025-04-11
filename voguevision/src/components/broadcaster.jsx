import { createContext, useState } from "react"
export const Broadcast = createContext()
export const Loading=createContext()
export function Broadcaster({children})
{
    const [gesture, setGesture] = useState({ gesture: "", change: false })
    const [loading,setLoading]=useState(true)
    return (
        <Broadcast.Provider value={{ gesture, setGesture }}>
            <Loading.Provider value={{ loading, setLoading }}>
                {children}
            </Loading.Provider>
        </Broadcast.Provider>
    )
}