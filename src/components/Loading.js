import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex:1000
        
      }}
    >
      <i
        className="fas fa-spinner fa-spin fa-6x"
        style={{ color: "#EF7B84", position:'relative', top:'calc(50% - 49px)', left:'calc(50% - 49px)' }}
      ></i>
    </div>
  );
}
