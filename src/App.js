import React from "react";
import Register from './register.js'
import { io } from "socket.io-client";
export const socket = io("ws://localhost:5000");




const App = () =>{
    return <Register/>
}

export default App
