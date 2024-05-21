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
        left: "10px",
        top: "90%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "16px",
        zIndex: 1000,
      }}
    >
      <div
        style={{ position: "relative" }}
        onMouseEnter={(e) => {
          const span = e.currentTarget.querySelector("span");
          span.style.opacity = 1;
        }}
        onMouseLeave={(e) => {
          const span = e.currentTarget.querySelector("span");
          span.style.opacity = 0;
        }}
      >
        <img
          style={{ width: "50px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png"
          alt="Messenger"
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "100%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "5px",
            marginLeft: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            opacity: 0,
            whiteSpace: "nowrap",
            transition: "opacity 0.3s ease",
          }}
        >
          Liên hệ với chúng tôi
        </span>
      </div>
    </button>
  );
};

export default MessengerButton;
