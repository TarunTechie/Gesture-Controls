import { createContext, useState } from "react"
export const Broadcast = createContext()

export function Broadcaster({children})
{
    const [gesture, setGesture] = useState("")
    return (
        <Broadcast.Provider value={{ gesture, setGesture }}>
            {children}
        </Broadcast.Provider>
    )
}