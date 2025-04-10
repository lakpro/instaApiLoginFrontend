import React from "react";
// import Box from "@mui/material/Box";

function Msg() {
  return (
    <div
      style={{
        backgroundColor: "black",
        opacity: "0.8",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <marquee gap="0" duplicate="true">
        This app uses a FREE server. Due to inactivity, it might take 30 seconds
        for the server to start. We are extremly sorry for the inconvenience.
        Thank You for your cooperation.
      </marquee>
    </div>
  );
}

export default Msg;
