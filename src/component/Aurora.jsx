import React from "react";

const AuroraEffect = () => {
  return (
    <>
      <style>
        {`
          @keyframes float1 {
            0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
            25%  { transform: translate(-20px, 15px) rotate(5deg) scale(1.05); }
            50%  { transform: translate(10px, -25px) rotate(-5deg) scale(1); }
            75%  { transform: translate(-15px, 20px) rotate(10deg) scale(1.1); }
            100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          }

          @keyframes float2 {
            0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
            30%  { transform: translate(20px, -10px) rotate(-10deg) scale(1.1); }
            60%  { transform: translate(-10px, 20px) rotate(5deg) scale(0.95); }
            100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          }

          @keyframes float3 {
            0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
            40%  { transform: translate(15px, 15px) rotate(8deg) scale(1.05); }
            70%  { transform: translate(-25px, -10px) rotate(-6deg) scale(1); }
            100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          }
        `}
      </style>

      <div className="fixed w-full h-screen bg-black overflow-hidden">
        {/* Aurora Blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #833ab4, #c13584)",
            animation: "float1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[50vw] h-[50vh] rounded-full opacity-40 blur-2xl"
          style={{
            background: "radial-gradient(circle at center, #5851db, #405de6)",
            animation: "float2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-[50vw] h-[50vh] rounded-full opacity-30 blur-2xl"
          style={{
            background: "radial-gradient(circle at center, #e1306c, #fd1d1d)",
            animation: "float3 14s ease-in-out infinite",
          }}
        />

        {/* Content */}
        <div className="fixed z-10 flex items-center justify-center h-full w-full text-white text-4xl font-bold"></div>
      </div>
    </>
  );
};

export default AuroraEffect;
