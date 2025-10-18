import React  from "react";

export const Chat: React.FC = () => {

  return (
    <>
      {/* Sticky Button */}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          borderRadius: "50%",
          width: 56,
          height: 56,
          background: "#007bff",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        aria-label="Open chat"
      >
        💬
      </button>
      {/* Popup */}

    </>
  );
};
