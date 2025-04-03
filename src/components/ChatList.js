import React, { useState } from "react";
import "./ChatList.css"
function ChatList() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Handle sending the message to the backend
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add the user's message to the message list
    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);

    // Clear input field
    setUserInput("");

    try {
      // Send the message to the backend and get the response
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Add the bot's response to the message list
      const botResponse = { text: data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <div>
      {/* Chat messages display */}
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="input-box">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatList;
