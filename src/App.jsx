import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InstaLogin from "./component/InstaLogin";
import Profile from "./component/Profile"; // <-- Add this import
import Media from "./component/Media";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstaLogin />} />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              <Media />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
