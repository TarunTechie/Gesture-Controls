import React, { useEffect, useState } from "react";
import io from "socket.io-client";
function App() {
    const [message, setMessage] = useState("Waiting for gestures...");
    const socket = io("http://localhost:5000")
    socket.on('connect', () => {
        socket.emit('start')
        setMessage("connected")
    })
    async function getData()
    {
        socket.on('gesture', (data) => {
            console.log(data)
        })
    }
    useEffect(()=>{getData()}, [socket]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default App;
