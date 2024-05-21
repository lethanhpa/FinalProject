// components/MessengerButton.js
import React from "react";

const MessengerButton = () => {
  const handleClick = () => {
    window.open("https://m.me/271506132704343", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "#0084ff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        zIndex: 1000,
      }}
    >
      Message us on Messenger
    </button>
  );
};

export default MessengerButton;
