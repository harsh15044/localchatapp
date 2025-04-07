import React, {useState} from "react";



function MessageInput({sendMessage}){ //accepting sendMessage as a prop
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() !== "") { //preventing empty messages being sent
            sendMessage(message);
            setMessage("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return(
        <div className ="chat-input">
            
            <input 
                type="text"
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default MessageInput;