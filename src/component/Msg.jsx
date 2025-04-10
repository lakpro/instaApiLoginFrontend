import React from "react";
// import Box from "@mui/material/Box";

function Msg() {
  return (
    <div className="fixed top-0 left-0 w-full bg-black/75 text-white flex items-center justify-center z-50">
      <marquee gap="0" duplicate="true">
        This app uses a FREE server. Due to inactivity, it might take 30 seconds
        for the server to start. We are extremly sorry for the inconvenience.
        Thank You for your cooperation.
      </marquee>
    </div>
  );
}

export default Msg;
