import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import InstaLogin from "./component/InstaLogin";
import Profile from "./component/Profile"; // <-- Add this import
import Media from "./component/Media";
import Policy from "./component/Policy"; // <-- Add this import
import Msg from "./component/Msg"; // <-- Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Msg />
              <InstaLogin />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Msg />
              <InstaLogin />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              <Media />
            </>
          }
        />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </Router>
  );
}

export default App;
