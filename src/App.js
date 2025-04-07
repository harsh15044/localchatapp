import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";
import {io} from "socket.io-client";

const socket = io("localhost:5500"); //connecting to backend


function App() {
  const [username, setUsername] = useState("");
  const [tempusername, setTempUsername] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(()=>{
    //listening for messages from the server
    socket.on("receiveMessage", (message) =>{
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    //cleanup the listener when the component unmounts
    return () => socket.off("receiveMessage");
  }, []);
  
  const sendMessage = (message) => {
    socket.emit("sendMessage", {username, message}); //emitting message to server
  }

  return(
    
    <div>
      {username === "" ? ( //login screen if username is empty
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter your Username"
            onChange = {(e) => setTempUsername(e.target.value)}
          />

          <button onClick={()=> tempusername.trim() !== "" && setUsername(tempusername)}>
            Join Chat
          </button>
        </div>
      ): (
        <div className="app-container">
        <h1>Local Chat App</h1>
        <ChatWindow messages={messages} username={username}/>
        <MessageInput sendMessage={sendMessage}/>
    </div>
      )}
    </div>
  );
}

export default App;
