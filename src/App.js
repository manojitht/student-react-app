import React from "react";
import MyRouter from "./router/index.js";
import Navbar from "./components/navbar.js";

function App() {
  return (
    <div>
      <Navbar />
      <MyRouter />
    </div>
  );
}

export default App;
