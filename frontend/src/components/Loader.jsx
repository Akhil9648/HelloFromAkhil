import React, { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20); // speed of animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #190933, #0c1226, #1a0033)",
        color: "white",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Animated Circle Logo */}
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background:
            "conic-gradient(#6a00ff, #b700ff, #6a00ff, #b700ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "spin 4s linear infinite",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#0d0d21",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          AP
        </div>
      </div>

      {/* Portfolio Name */}
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          letterSpacing: "4px",
          marginBottom: "1rem",
          background: "linear-gradient(90deg, #b06fff, #67e8f9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        AKHIL
      </h1>

      <p style={{ opacity: 0.7, marginBottom: "2rem", fontSize: "1.1rem" }}>
        Portfolio Loading...
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: "70%",
          maxWidth: "600px",
          height: "12px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #b06fff, #6a00ff, #9333ea, #67e8f9)",
            transition: "width 0.1s ease",
          }}
        />
      </div>

      {/* Percentage */}
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#b06fff",
          marginBottom: "1rem",
        }}
      >
        {progress}%
      </div>

      {/* Loading text */}
      <div style={{ opacity: 0.7, fontSize: "1.1rem" }}>
        Loading Awesomeness...
      </div>

      {/* Keyframes */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
}
