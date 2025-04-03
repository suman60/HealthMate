import React from "react";
import "./ChatbotName.css";

function ChatbotName() {
  return (
    <div className="chatbot-name">
      {"HealthMate".split("").map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  );
}

export default ChatbotName;
