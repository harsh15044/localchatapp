import React, { useEffect, useRef } from "react";
// import {io} from "socket.io-client";

// const socket = io("http://localhost:5500");

function ChatWindow({messages, username}){
    useEffect(() =>{
        console.log("update messages in chatwindow :", messages);
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">Local Chat</div>
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="no-messages">No messages yet, Drop some tea!</div>
                ) : (
                    messages.map((msg,index) => (
                        <div
                        key={index}
                        className={`chat-message ${msg.username === username ? "sent" : "received"}`}
                        >
                            <div className="message-content">
                                <span className="message-username">
                                    {msg.username}
                                </span>
                                <span className="message-text">{msg.message}</span>
                            </div>
                            <div ref={endOfMessagesRef} /> 
                        </div> //displaying the message
                    ))
                )}
            </div>
        </div>
    )
}

export default ChatWindow;